var xlsx = require('xlsx')
var fs = require('fs')

var workbook = xlsx.readFile('cards.xlsx')
var out = {
	title: 'DevOps<br />Against<br />Humanity',
	abbreviation: 'DAH',
	black: xlsx.utils.sheet_to_row_object_array(workbook.Sheets['Black Cards']),
	white: xlsx.utils.sheet_to_row_object_array(workbook.Sheets['White Cards'])
}

fs.writeFileSync('cards.json', JSON.stringify(out, null, 2), { encoding: 'utf-8' })
