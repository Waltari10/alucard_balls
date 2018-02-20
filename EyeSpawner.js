const GameObject = require('./GameObject')
const _ = require('lodash')
const Eye = require('./Eye')

const EYE_MAX_SIZE = 15
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
    this.eyes = []
  }
  checkOverlap(a, b) {
    return (a.start <= b.end && b.start <= a.end)
  }
  isEyeOverlap(x, y, newSize) {
    if (!(x && y && newSize)) return true
    let xOverlap = false
    let yOverlap = false

    newSize = newSize * 1.7 * 2

    this.eyes.forEach(eye => {
      const oldSize = eye.size * 1.7 * 2

      const newXStart = x - (newSize / 2)
      const newXEnd = x + (newSize / 2)
      const oldXStart = eye.location.x - (oldSize / 2)
      const oldXEnd = eye.location.x + (oldSize / 2)

      if (this.checkOverlap({
        start: newXStart,
        end: newXEnd
     }, {
        start: oldXStart,
        end: oldXEnd
      })) {
        xOverlap = true
      }

      const newYStart = y - (newSize / 2)
      const newYEnd = y + (newSize / 2)
      const oldYStart = eye.location.y - (oldSize / 2)
      const oldYEnd = eye.location.y + (oldSize / 2)

      // console.log('beginPath')
      // ctx.beginPath()
      // ctx.fillStyle = 'green'
      // ctx.fill()
      // ctx.fillRect(newXStart, newYStart, newSize, newSize)

      // ctx.stroke()

      // console.log('oldXStart', oldXStart)
      // console.log('oldYStart', oldYStart)
      // console.log('oldSize', oldSize)
      // console.log('oldSize', oldSize)

      // ctx.beginPath()
      // ctx.fillStyle = 'blue'
      // ctx.fill()
      // ctx.fillRect(oldXStart, oldYStart, oldSize, oldSize)

      // ctx.stroke()

      if (this.checkOverlap({
        start: newYStart,
        end: newYEnd
      }, {
          start: oldYStart,
          end: oldYEnd
        })) {
        yOverlap = true
      }


    })
    return xOverlap && yOverlap
  }
  spawnEyes() {
    let eyeCount = 50

    while (eyeCount--) {

      let isOverlap = true
      let i = 0
      let x
      let y
      let size

      while (isOverlap) {

        i++

        // Try x times to fit eye into canvas randomly
        if (i > 100000) break
        

        x = _.random(canvas.width)
        y = _.random(canvas.height)
        size = _.random(EYE_MAX_SIZE) + EYE_MIN_SIZE

        isOverlap = this.isEyeOverlap(x, y, size)
      }

      if (isOverlap) return
      const eye = instantiate(Eye, {
        location: Vector2(x, y),
        size,
        irisSize: (Math.random() + 1 / 2) - 0.4 // Squeeze number between 0.3 and 0.6
      })

      this.eyes.push(eye)
    }
  }
}