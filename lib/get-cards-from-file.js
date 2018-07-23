'use strict'

const fs = require('mz/fs')
const path = require('path')
const xlsx = require('xlsx')

const loadFromXlsx = async cardsPath => {
	const workbook = xlsx.read(await fs.readFile(cardsPath))

	return {
		black: xlsx.utils.sheet_to_row_object_array(workbook.Sheets['Black Cards']),
		white: xlsx.utils.sheet_to_row_object_array(workbook.Sheets['White Cards']),
	}
}

const loadFromJson = async cardsPath =>
	JSON.parse(await fs.readFile(cardsPath, { encoding: 'utf8' }))

module.exports = async (cardsPath, title) => {
	const cards = await (path.extname(cardsPath) === '.xlsx'
		? loadFromXlsx(cardsPath)
		: loadFromJson(cardsPath))

	if (title) {
		cards.title = title
	}

	return cards
}
