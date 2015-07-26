var webshot = require('webshot')
var fs = require('fs')
var dot = require('dot')

var width = 2466
var height = 3366

var card = fs.readFileSync('card.dotjs.html', { encoding: 'utf8' })
var tpl = dot.template(card)

var result = tpl({
	content: 'A CORBA service written in Ada which communicates using JSONx'
})

fs.writeFileSync('test.html', result)

webshot(result, 'test.png', {
	siteType: 'html',
	screenSize:
		{
			width: width,
			height: height
		}
	}, function(err) {
	if (err) {
		console.log(err)
	}
})
