import { CANVAS_HEIGHT, CANVAS_WIDTH, centerX, centerY, R } from '../constants'
import { DrawCircleParams, DrawCircleStrokeParams } from '../typings/draw'

export const drawCircleStroke = (ctx: CanvasRenderingContext2D, params: DrawCircleStrokeParams) => {
    const { x, y, radius, border } = params
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    ctx.lineWidth = 5
    ctx.strokeStyle = border
    ctx.stroke()
}

export const drawCircle = (ctx: CanvasRenderingContext2D, params: DrawCircleParams) => {
    const { x, y, radius, color, border, text } = params
    ctx.beginPath()
    ctx.font = '8pt Calibri'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(text, x, y + 3)
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 5
    ctx.strokeStyle = border
    ctx.stroke()
}

export const drawTable = (ctx: CanvasRenderingContext2D, params?: DrawCircleParams) => {
    drawCircle(ctx, {
        x: centerX,
        y: centerY,
        radius: R,
        color: 'blue',
        border: 'black',
        text: 'philosophers table',
        ...params,
    })
}

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clear canvas
}
