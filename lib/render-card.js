'use strict'

const dot = require('dot')
const fs = require('fs')
const path = require('path')

const processUnderlines = require('./process-underlines')

const cardTpl = dot.template(
	fs.readFileSync(path.join(__dirname, './card.dotjs.html'), {
		encoding: 'utf8',
	}),
)

module.exports = (fontFamily, title) => card => {
	const processedName =
		!(card.processUnderlines === false) &&
		!card.back &&
		card.black &&
		processUnderlines(card.name)

	const cardData = {
		fontFamily,
		title,
		black: card.black,
		name: processedName ? processedName.text : card.name,
		description: card.description,
		pick:
			card.pick !== undefined
				? card.pick
				: processedName && processedName.count > 1
				? processedName.count
				: undefined,
		draw:
			card.draw !== undefined
				? card.draw
				: processedName && processedName.count > 2
				? processedName.count - 1
				: undefined,
		back: card.back,
	}

	return cardTpl(cardData)
}
