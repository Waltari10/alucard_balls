const {
  getVelocity,
  getForce,
  getDrag,
} = require('./Physics')

module.exports = class GameObject {
  constructor({
    id,
    location = Vector2(0, 0),
    velocity = Vector2(0, 0),
    name = '',
    mass = 1,
    drag = 1,
    isGravity = false,
    rotation = 0,
  } = {}) {
    this.name = name
    this.location = location
    this.velocity = velocity
    this.mass = mass
    this.drag = drag
    this.isGravity = isGravity
    this.id = id
    this.rotation = rotation
  }
  render() {}
  update() {}
}