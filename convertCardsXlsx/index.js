'use strict'

const xlsx = require('xlsx')
const fs = require('fs')

const workbook = xlsx.readFile('cards.xlsx')
const out = {
	title: 'DevOps<br />Against<br />Humanity',
	black: xlsx.utils.sheet_to_row_object_array(workbook.Sheets['Black Cards']),
	white: xlsx.utils.sheet_to_row_object_array(workbook.Sheets['White Cards'])
}

fs.writeFileSync('cards.json', JSON.stringify(out, null, 2), { encoding: 'utf-8' })
