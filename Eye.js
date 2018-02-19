const GameObject = require('./GameObject')
const _ = require('lodash')

module.exports = class FadingParticle extends GameObject {
  constructor(args) {
    super(args)
    this.size = args.size
    this.irisSize = args.irisSize
    this.rotation = Math.random() * Math.PI
  }
  render() {
    // Render eye white
    ctx.save()
    ctx.translate(this.location.x, this.location.y)
    ctx.rotate(this.rotation)

    ctx.fillStyle = '#FDC2BC'

    // Render grey eyelids
    ctx.beginPath()
    ctx.shadowBlur = 0
    ctx.strokeStyle = '#71484B'
    ctx.arc(0, this.size * -0.54, this.size * 1.7, 0.1 * Math.PI, 0.9 * Math.PI)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = '#71484B'
    ctx.arc(0, this.size * 0.54, this.size * 1.7, 1.1 * Math.PI, 1.9 * Math.PI)

    ctx.fill()
    ctx.stroke()

    const diffVec = Vector2(mouseLocation.x - this.location.x, mouseLocation.y - this.location.y)
    const angle = diffVec.angle() - (0.25 * Math.PI)//45 deg
    
    let irisVector = Vector2(this.size * 0.22, this.size * 0.22)
    irisVector = irisVector.rotate(angle)

    let useThisVec = irisVector

    if (diffVec.lengthSq() < irisVector.lengthSq()) {
      useThisVec = diffVec
    }

    ctx.restore()
    ctx.save()
    ctx.translate(this.location.x, this.location.y)

    // Render iris background
    ctx.beginPath()
    ctx.fillStyle = '#FC0500'
    ctx.strokeStyle = '#FC0500'
    ctx.arc(useThisVec.x, useThisVec.y, this.size * 0.8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()


    // Render iris
    ctx.beginPath()
    ctx.fillStyle = '#0F0000'
    ctx.arc(useThisVec.x, useThisVec.y, this.size * 0.6 * this.irisSize, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    // Render iris outline
    ctx.beginPath()
    ctx.lineWidth = this.size * 0.02
    ctx.strokeStyle = '#0F0000'
    ctx.arc(useThisVec.x, useThisVec.y, this.size * 0.82, 0, 2 * Math.PI)
    ctx.shadowBlur = 30
    ctx.shadowColor = '#0F0000'

    ctx.stroke()
    ctx.restore()

  }
}