const GameObject = require('./GameObject')
const _ = require('lodash')

module.exports = class MousePositionListener extends GameObject {
  constructor(args) {
    super(args)
    global.mouseLocation = Vector2(canvas.width / 2, canvas.height / 2) 
    canvas.addEventListener("click", this.click)
    canvas.addEventListener("mousemove", this.mouseMove)
  }
  mouseMove(e) {
    mouseLocation.x = e.x
    mouseLocation.y = e.y
  }
  click() {
    var audios = [new Audio('zombie.ogg'), new Audio('zombie2.wav')]
    // audios[Math.floor(Math.random() * audios.length)].play()

    // render screen white and remake eyes
  }
}