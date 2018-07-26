//  定义一个圆
class Circle {
  constructor (x, y, r, moveX, moveY, colors) {
    this.x = x
    this.y = y
    this.r = r
    this.moveX = moveX
    this.moveY = moveY
    this.colors = colors
  }
}
//  画圆
function drawCircle (ctx, x, y, r, colors) {
  ctx.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.15)`
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
}
//  画线条
function drawLine (ctx, x1, y1, x2, y2, o) {
  ctx.beginPath()
  ctx.strokeStyle = `rgba(255, 0, 0, ${o})`
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.closePath()
  ctx.stroke()
}
//  随机数
function num (max,min) {
  return (Math.random() * (max - min) + min) | 0
}
//  初始化
function init ({ POINT, WIDTH, HEIGHT, maxR, minR, circleArr }) {
  for (let i=0; i<POINT; i++) {
    const circle = new Circle(num(WIDTH, 0), num(HEIGHT, 0), num(maxR, minR), num(10, -10)/40, num(10, -10)/40, [255, 0, 0])
    circleArr.push(circle)
  }
}
//  画图
function draw ({ context, canvas, POINT, WIDTH, HEIGHT, circleArr }) {
  context.clearRect(0, 0 , canvas.width, canvas.height)    //  清除整个canvas画布，重绘
  for (let i=0; i<POINT; i++) {
    //  每个圆的圆心坐标变动，超出屏幕就要回到另外一个端点
    circleArr[i].x += circleArr[i].moveX
    circleArr[i].y += circleArr[i].moveY
    if (circleArr[i].x > WIDTH) circleArr[i].x = 0
    else if (circleArr[i].x < 0) circleArr[i].x = WIDTH
    if (circleArr[i].y > HEIGHT) circleArr[i].y = 0
    else if (circleArr[i].y < 0) circleArr[i].y = HEIGHT
    drawCircle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r, circleArr[i].colors)
    for (let j=0; j<POINT-i; j++) {
      const A = Math.abs(circleArr[i+j].x - circleArr[i].x),
        B = Math.abs(circleArr[i+j].y - circleArr[i].y),
        lineLength = Math.sqrt(A*A + B*B),
        C = POINT/lineLength-0.09,
        lineOpacity = C > 0.15 ? 0.15 : C
      if (lineOpacity > 0) drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity)  
    }
  }
}

export {
  init,
  draw
}