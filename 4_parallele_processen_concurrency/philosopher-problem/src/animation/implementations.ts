import { RADIUS_FORK, RADIUS_PHILOSOPHER } from '../constants'
import { getBorderColor } from '../utils'
import { drawCircle, drawCircleStroke } from '.'
import { Fork, Philosopher } from '../typings/data'

export const drawPhilosopherSelection = (ctx: CanvasRenderingContext2D, philosopher: Philosopher, border = 'green') => {
    drawCircleStroke(ctx, {
        x: philosopher.coords.x,
        y: philosopher.coords.y,
        radius: RADIUS_PHILOSOPHER,
        border,
    })
}
export const drawPhilosopher = (ctx: CanvasRenderingContext2D, philosopher: Philosopher) => {
    drawCircle(ctx, {
        x: philosopher.coords.x,
        y: philosopher.coords.y,
        radius: RADIUS_PHILOSOPHER,
        color: philosopher.color,
        border: getBorderColor(philosopher),
        text: philosopher.name + ' ' + philosopher.priority,
    })
}
export const drawFork = (ctx: CanvasRenderingContext2D, fork: Fork, color = 'black') => {
    drawCircle(ctx, {
        x: fork.coords.x,
        y: fork.coords.y,
        radius: RADIUS_FORK,
        color: fork.heldBy?.color ?? color,
        border: 'white',
        text: `fork ${fork.i}`,
    })
}
