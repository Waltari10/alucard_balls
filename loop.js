const { TARGET_FPS, TARGET_FRAME_DURATION } = require('./constants')

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,canvas.width, canvas.height)
  for (const key in gameObjects) {
    ctx.moveTo(Math.floor(gameObjects[key].x), Math.floor(gameObjects[key].y))
    gameObjects[key].render()
  }
}

function updateGameObjects() {
  for (const key in gameObjects){
    gameObjects[key].update()
  }
}

function loop() {
  const startTime = Date.now()
  updateGameObjects()
  draw()
  const renderTime = Date.now() - startTime
  timeDelta = renderTime < TARGET_FRAME_DURATION ? TARGET_FRAME_DURATION : renderTime
  this.setTimeout(() => {
    loop()
  }, TARGET_FRAME_DURATION - renderTime)
}

module.exports = { loop }