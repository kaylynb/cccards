'use strict'

const fs = require('mz/fs')

module.exports = async (cardsPath, title) => {
	const cards = await JSON.parse(await fs.readFile(cardsPath, { encoding: 'utf8' }))

	if (title) {
		cards.title = title
	}

	return cards
}
