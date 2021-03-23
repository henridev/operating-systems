import { Fork, Philosopher, Sides, States } from '../typings/data'
import { Action } from '../typings/logger'

export function degreesToRadians(degrees: number) {
    var pi = Math.PI
    return degrees * (pi / 180)
}

export const inCircle = (x1: number, y1: number, x2: number, y2: number, radius: number) =>
    Math.abs(x1 - x2) < radius && Math.abs(y1 - y2) < radius

export function getRandomColor() {
    function c() {
        var hex = Math.floor(Math.random() * 256).toString(16)
        return ('0' + String(hex)).substr(-2) // pad with zero
    }
    return '#' + c() + c() + c()
}

export const logger = (Tag: Action, philosopher: Philosopher, side?: Sides, fork?: Fork) => {
    let message: String = Tag
    if ((Tag === Action.PICKUP_FORK_ATTEMPT, Tag === Action.PICKUP_FREE)) {
        message = `${side} side ${philosopher.name}`
    } else if (fork && Tag === Action.PICKUP_FROM) {
        message = `${side} side ${philosopher.name} took from ${fork.heldBy ? fork.heldBy.name : ''}`
    } else if (fork && Tag === Action.FORK_HELD) {
        message = `${side} side held by ${fork.heldBy ? fork.heldBy.name : ''}`
    } else {
        message = `${philosopher.name}`
    }
    console.log(Tag, message)
}

export const getBorderColor = (p: Philosopher): string => {
    let color = 'white'
    if (p.isSelected) {
        return 'yellow'
    }
    switch (p.state) {
        case States.EATING:
            color = 'purple'
            break
        case States.HOLDING_BOTH_FORKS:
            color = 'green'
            break
        case States.HOLDING_LEFT_FORK:
            color = 'pink'
            break
        case States.HOLDING_RIGHT_FORK:
            color = 'pink'
            break
    }
    return color
}
