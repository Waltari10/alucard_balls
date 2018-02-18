const Eye = require('./Eye')
const MousePositionListener = require('./MousePositionListener')
const _ = require('lodash')

const EYE_MAX_SIZE = 20
const EYE_MIN_SIZE = 10

function createScene () {

  let eyeCount = 200

  while(eyeCount--) {

    instantiate(MousePositionListener)

    instantiate(Eye, {
      location: Vector2(
        _.random(canvas.width),
        _.random(canvas.height)
      ),
      size: _.random(EYE_MAX_SIZE) + EYE_MIN_SIZE,
      irisSize: (Math.random() + 1 / 2) - 0.4 // Squeeze number between 0.3 and 0.6
    })
  }
}

module.exports = {
  createScene
}