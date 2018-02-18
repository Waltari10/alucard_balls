const GameObject = require('./GameObject')

module.exports = class MousePositionListener extends GameObject {
  constructor(args) {
    super(args)
    global.mouseLocation = Vector2(canvas.width / 2, canvas.height / 2)

    this.mouseDown = this.mouseDown.bind(this)
    this.mouseMove = this.mouseMove.bind(this)

    canvas.addEventListener("mousedown", this.mouseDown)
    canvas.addEventListener("mousemove", this.mouseMove)
  }
  mouseMove(e) {
    mouseLocation.x = e.x
    mouseLocation.y = e.y
  }
  mouseDown(e) {
    // scream! and make background flash
  }
}