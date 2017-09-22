'use strict'

const R = require('ramda')

const underlineWordsRegex = /([^\s_]*)(_+)([^\s_]*)/
const underlineSpacer = (count = 1) => `<span class="underline">${'&nbsp;'.repeat(count)}</span>`

module.exports = text => {
	if (!R.is(String, text)) {
		return ''
	}

	const processUnderline = part => {
		const matches = underlineWordsRegex.exec(part)

		if (matches) {
			const underlineLength = matches[2].length

			return `<div class="underline${underlineLength > 1 ? ' manual' : ''}">${matches[1]}${underlineSpacer(underlineLength)}${matches[3]}</div>`
		}

		return part
	}

	const underlinePatternRegex = /([^\s_]*_+[^\s_]*)/g

	return {
		text: text.split(underlinePatternRegex).map(processUnderline).join(''),
		count: R.length(text.match(underlinePatternRegex)) || 0
	}
}
