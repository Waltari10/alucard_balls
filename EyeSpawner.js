const GameObject = require('./GameObject')
const _ = require('lodash')
const Eye = require('./Eye')

const EYE_MAX_SIZE = 20
const EYE_MIN_SIZE = 10

module.exports = class FadingParticle extends GameObject {
  constructor(args) {
    super(args)
    this.eyes = []
    this.click = this.click.bind(this)
    this.spawnEyes = this.spawnEyes.bind(this)
    canvas.addEventListener("click", this.click)
    this.spawnEyes()
  }
  click() {
    this.destroyEyes()
    this.spawnEyes()
  }
  destroyEyes() {
    const eyeLength = this.eyes.length
    for (let i = 0; i < eyeLength; i++) {
      destroy(this.eyes[i])
    }
  }
  spawnEyes() {
    let eyeCount = 150

    while (eyeCount--) {
      const eye = instantiate(Eye, {
        location: Vector2(
          _.random(canvas.width),
          _.random(canvas.height)
        ),
        size: _.random(EYE_MAX_SIZE) + EYE_MIN_SIZE,
        irisSize: (Math.random() + 1 / 2) - 0.4 // Squeeze number between 0.3 and 0.6
      })

      this.eyes.push(eye)
    }
  }
}