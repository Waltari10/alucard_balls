const EyeSpawner = require('./EyeSpawner')
const MousePositionListener = require('./MousePositionListener')
const _ = require('lodash')

function createScene () {
  instantiate(EyeSpawner)
  instantiate(MousePositionListener)
}

module.exports = {
  createScene
}