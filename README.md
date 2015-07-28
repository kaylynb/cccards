# cccards [![forthebadge](http://forthebadge.com/images/badges/certified-steve-bruhle.svg)](http://forthebadge.com)

## What
This generates 'Cards Against Humanity' style cards. Standard poker card sized at ~900DPI.

This is being used to generate a custom printed deck of [DevOps Against Humanity](https://github.com/bridgetkromhout/devops-against-humanity), so the card data is that, and not CAH.

### Examples
![Card Back](https://raw.githubusercontent.com/kaylynb/cccards/master/cards_example/black_back.png)
![Black Card](https://raw.githubusercontent.com/kaylynb/cccards/master/cards_example/black3.png)
![White Card](https://raw.githubusercontent.com/kaylynb/cccards/master/cards_example/white1.png)
![White Card w/ Desc](https://raw.githubusercontent.com/kaylynb/cccards/master/cards_example/white10.png)

## How
You need `phantomjs` installed (or maybe not; I think `webshot` will install this?). This renders each card as a page in phantom, and saves it as a png.

`cards.json` contains card data. `title` is the title; `abbreviation` is a shortened title for when PICK/DRAW is drawn on black cards. The rest of the data is just arrays for black/white cards. Optionally, instead of a string, you may pass an object with `name` & `desc`. `desc` is text that is drawn underneath the main text in a smaller & less bold font, as seen in examples.

For black cards, a single underscore `_` is used to indicate a card blank. 'Pick X/Draw X' will be generated automatically based on the number of blanks.

## Other Shit
The code is horrifying. PhantomJS is 'fun' to work with because it doesn't seem to work with flexbox or any other things that browsers have had for decades.

In the future, it'd probably make more sense to write this as pure javascript and render cards as canvas or some shit. I dunno, I'll probably never work on this again once I get a card run off.

## Contributing
This code is a shitstorm. I can take pull requests I guess.

## Licensing
Code is MIT License

Generated cards are `Creative Commons BY-NC-SA 2.0` according to CAH:

> "Cards Against Humanity is available under a Creative Commons BY-NC-SA 2.0 license. That means you can use and remix the game for free, but you can’t sell it. Please do not steal our name or we will smash you."
