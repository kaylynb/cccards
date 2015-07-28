var webshot = require('webshot')
var fs = require('fs')
var dot = require('dot')
var path = require('path')
var async = require('async')

var width = 2466
var height = 3366

var cardTpl = dot.template(fs.readFileSync('card.dotjs.html', { encoding: 'utf8' }))

var cardsJson = JSON.parse(fs.readFileSync('cards.json', { encoding: 'utf8' }))

function generateCards (cards, black) {
	var cardType = black ? 'black' : 'white'
	var cardPath = path.join('cards/', cardType)
	var webshotOpts = {
		siteType: 'html',
		screenSize: {
			width: width,
			height: height
		}
	}
	var errFn = function (err) {
		if (err) {
			throw err
		}
	}

	console.log('Generating Card Back')
	webshot(cardTpl({
		name: cardsJson.title,
		black: black,
		back: true
	}),
		path.join(cardPath, cardType + '_back.png'),
		webshotOpts,
		errFn
	)

	function generateCard(card, i) {
		var pick = 0
		var name = card.name || card

		console.log('[' + i + '/' + cards.length + '] ' + name)

		if (black) {
			var splits = name.split('_')
			pick = splits.length - 1
			name = splits.join('______')
		}

		webshot(cardTpl({
			name: name,
			abbr: cardsJson.abbreviation,
			desc: card.desc,
			black: black,
			pick: (pick > 0) ? pick : undefined,
			draw: (pick > 2) ? pick - 1 : undefined
		}),
			path.join(cardPath, cardType + i + '.png'),
			webshotOpts,
			errFn
		)
	}

	cards.forEach(generateCard)
}

console.log('Generating White Cards')
generateCards(cardsJson.white)

console.log('Generating Black Cards')
generateCards(cardsJson.black, true)
