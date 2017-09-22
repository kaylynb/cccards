'use strict'

const thenify = require('thenify')

const eachOfLimit = thenify(require('async/eachOfLimit'))
const fs = require('mz/fs')
const mkdirp = thenify(require('mkdirp'))
const path = require('path')
const ProgressBar = require('progress')
const puppeteer = require('puppeteer')
const R = require('ramda')

const renderCard = require('./render-card')

module.exports = async config => {
	// Apply defaults to config
	config = R.merge({
		generateBack: true,
		png: true,
		html: false,
		width: 750,
		height: 1050,
		fontFamily: "'Helvetica Neue', Helvetica, 'Liberation Sans', sans-serif",
		cli: false
	}, config)

	await mkdirp(config.output)

	const browser = config.png && (await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	}))

	const render = renderCard(config.fontFamily, config.cards.title)
	const blackAsStr = black => (black ? 'black' : 'white')

	if (config.cli) {
		console.log(`Rendering Cards: ${config.cards.title}`)
	}

	const renderPng = async (content, outputPath) => {
		const page = await browser.newPage()
		await page.setViewport({
			width: config.width,
			height: config.height
		})
		await page.setContent(content)
		await page.screenshot({
			path: `${outputPath}.png`
		})
		await page.close()
	}

	const renderCards = async (black, cards) => {
		if (config.generateBack) {
			cards = [{
				back: true,
				name: config.cards.title
			}, ...cards]
		}

		const progress = config.cli && new ProgressBar(
			`Rendering ${blackAsStr(black)} cards [:bar] :current/:total :percent :etas`,
			{
				total: cards.length
			}
		)

		const padding = cards.length.toString().length

		await eachOfLimit(cards, config.async, async (card, index) => {
			const content = render(R.merge(card, { black }))
			const cardPath = path.join(config.output, `${blackAsStr(black)}${(index).toString().padStart(padding, '0')}`)

			if (config.html) {
				await fs.writeFile(`${cardPath}.html`, content)
			}

			if (browser) {
				await renderPng(content, cardPath)
			}

			if (progress) {
				progress.tick()
			}
		})
	}

	await renderCards(true, config.cards.black)
	await renderCards(false, config.cards.white)

	if (browser) {
		await browser.close()
	}
}
