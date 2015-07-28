var webshot = require('webshot')
var fs = require('fs')
var dot = require('dot')
var path = require('path')
var async = require('async')

var width = 2466
var height = 3366
var concurrency = 6

var cardTpl = dot.template(fs.readFileSync('card.dotjs.html', { encoding: 'utf8' }))

var cardsJson = JSON.parse(fs.readFileSync('cards.json', { encoding: 'utf8' }))

function generateCards (cards, black, cb) {
	var cardType = black ? 'black' : 'white'
	var cardPath = path.join('cards/', cardType)
	var webshotOpts = {
		siteType: 'html',
		screenSize: {
			width: width,
			height: height
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
		function (err) {
			if (err) {
				throw err
			}
		}
	)

	function generateCard(cardData, cb2) {
		var card = cardData.card
		var i = cardData.i
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
			cb2
		)
	}

	// This code is extra nightmarish. I needed to rate-limit
	// the code and just added callbacks everywhere.
	var q = async.queue(generateCard, concurrency)
	q.drain = cb

	var cardArr = []
	cards.forEach(function (card, i) {
		cardArr.push({
			card: card,
			i: i + 1
		})
	})

	q.push(cardArr, function (err) {
		if (err) {
			throw err
		}
	})
}

console.log('Generating White Cards')
generateCards(cardsJson.white, false, function () {
	console.log('Generating Black Cards')
	generateCards(cardsJson.black, true, function () {
		console.log('Done with cards!')
	})
})

