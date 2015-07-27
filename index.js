var webshot = require('webshot')
var fs = require('fs')
var dot = require('dot')
var R = require('ramda')

var width = 2466
var height = 3366

var cardTpl = dot.template(fs.readFileSync('card.dotjs.html', { encoding: 'utf8' }))

var cards = JSON.parse(fs.readFileSync('cards.json', { encoding: 'utf8' }))

var wi = 0

cards.white.forEach(function (card) {
	++wi
	console.log('[' + wi + '/' + cards.white.length + '] ' + (card.name || card))
	webshot(cardTpl({
		name: card.name || card,
		desc: card.desc
	}), 'white' + wi + '.png', {
		siteType: 'html',
		screenSize: {
			width: width,
			height: height
		}
	}, function (err) {
		if (err) {
			throw err
		}
	})
})
