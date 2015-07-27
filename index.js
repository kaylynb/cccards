var webshot = require('webshot')
var fs = require('fs')
var dot = require('dot')
dot.templateSettings.strip = false

var width = 2466
var height = 3366

var card = fs.readFileSync('card.dotjs.html', { encoding: 'utf8' })
var tpl = dot.template(card)

var result = tpl({
	black: true,
	pick: 1,
	draw: 1,
	content: 'A CORBA service written in Ada which communicates using JSONx'
})

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
