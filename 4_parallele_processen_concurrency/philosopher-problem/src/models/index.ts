import { Fork, Philosopher, States, Sides } from '../typings/data'
import { Action } from '../typings/logger'
import { Subject } from '../typings/model'
import { Observer } from '../typings/view'
import { centerX, centerY, R } from '../constants'
import { degreesToRadians, getRandomColor, logger } from '../utils'

export namespace Model {
    export class MainModel implements Subject {
        private _currentPhilosopher!: Philosopher
        private observers: Observer[] = []
        philosophers: Philosopher[] = [
            {
                name: 'aristoteles',
                forkLeft: 3,
                forkRight: 2,
                interval: undefined,
                priority: 1,
                coords: { x: 0, y: 0 },
                color: getRandomColor(),
                fullness: 0,
                isSelected: false,
                state: States.HANGRY,
            },
            {
                name: 'seneca',
                forkLeft: 4,
                forkRight: 3,
                interval: undefined,
                priority: 2,
                coords: { x: 0, y: 0 },
                color: getRandomColor(),
                fullness: 0,
                isSelected: false,
                state: States.HANGRY,
            },
            {
                name: 'plato',
                forkLeft: 0,
                forkRight: 4,
                interval: undefined,
                priority: 3,
                coords: { x: 0, y: 0 },
                color: getRandomColor(),
                fullness: 0,
                isSelected: false,
                state: States.HANGRY,
            },
            {
                name: 'derida',
                forkLeft: 1,
                forkRight: 0,
                interval: undefined,
                priority: 4,
                coords: { x: 0, y: 0 },
                color: getRandomColor(),
                fullness: 0,
                isSelected: false,
                state: States.HANGRY,
            },
            {
                name: 'sartre',
                forkLeft: 2,
                forkRight: 1,
                interval: undefined,
                priority: 5,
                coords: { x: 0, y: 0 },
                color: getRandomColor(),
                fullness: 0,
                isSelected: false,
                state: States.HANGRY,
            },
        ]
        forks: Fork[] = [
            { heldBy: null, coords: { x: 0, y: 0 }, i: 0 },
            { heldBy: null, coords: { x: 0, y: 0 }, i: 1 },
            { heldBy: null, coords: { x: 0, y: 0 }, i: 2 },
            { heldBy: null, coords: { x: 0, y: 0 }, i: 3 },
            { heldBy: null, coords: { x: 0, y: 0 }, i: 4 },
        ]

        constructor() {
            this.addPointsToForksAndPhilosophers()
        }

        /**
         * model manipulation
         */
        clearPhilosopherSelection() {
            this.philosophers.forEach((philosopher) => {
                philosopher.isSelected = false
            })
            this.notifyObservers()
        }

        pickUpFork = (side: Sides) => {
            const { forkLeft, forkRight } = this.currentPhilosopher
            const forkIndex = side === Sides.LEFT ? forkLeft : forkRight
            const fork = this.forks[forkIndex]
            logger(Action.PICKUP_FORK_ATTEMPT, this.currentPhilosopher, side)
            if (!fork.heldBy) {
                logger(Action.PICKUP_FREE, this.currentPhilosopher, side)
                fork.heldBy = this.currentPhilosopher
            } else if (
                this.currentPhilosopher.priority &&
                fork.heldBy.priority &&
                this.currentPhilosopher.priority < fork.heldBy.priority
            ) {
                logger(Action.PICKUP_FROM, this.currentPhilosopher, side, fork)
                fork.heldBy = this.currentPhilosopher
            } else if (this.currentPhilosopher.priority === fork.heldBy.priority) {
                fork.heldBy = null
                return
            } else {
                logger(Action.FORK_HELD, this.currentPhilosopher, side, fork)
            }
            this.notifyObservers()
        }

        startEating = () => {
            if (this.currentPhilosopher.state === States.HOLDING_BOTH_FORKS) {
                logger(Action.CAN_EAT, this.currentPhilosopher)
                const pRefI = this.philosophers.findIndex((p) => this.currentPhilosopher.name === p.name)
                if (pRefI === -1) return
                const pRef = this.philosophers[pRefI]
                this.currentPhilosopher.state = States.EATING
                this.notifyObservers()
                clearInterval((pRef.interval as unknown) as number)
                pRef.interval = setInterval(() => {
                    if (this.holdingTwoForksCheck(pRef) && pRef.fullness < 3) {
                        pRef.fullness++
                        this.notifyObservers()
                        return
                    }

                    clearInterval((pRef.interval as unknown) as number)
                    this.stoptEating(pRef)
                }, 5000)
            } else {
                logger(Action.NO_EATING, this.currentPhilosopher)
            }
        }

        stoptEating = (p: Philosopher) => {
            p.state = States.HANGRY
            this.forks[p.forkLeft].heldBy = undefined
            this.forks[p.forkRight].heldBy = undefined
            this.updatePhilosopherStates()
            p.interval = setInterval(() => {
                if (p.fullness > 0 && p.state !== States.EATING) {
                    p.fullness--
                    this.notifyObservers()
                    return
                }
                clearInterval((p.interval as unknown) as number)
            }, 5000)
        }

        updatePhilosopherStates() {
            this.philosophers.forEach((p) => {
                const holdingRight = this.holdingRightForkCheck(p)
                const holdingLeft = this.holdingLeftForkCheck(p)
                if ((!holdingRight || !holdingLeft) && p.state === States.EATING) {
                    this.updatePhilosopherPriority(p)
                }

                if (holdingRight && holdingLeft && p.state !== States.EATING) {
                    p.state = States.HOLDING_BOTH_FORKS
                } else if (holdingLeft && !holdingRight) {
                    p.state = States.HOLDING_LEFT_FORK
                } else if (holdingRight && !holdingLeft) {
                    p.state = States.HOLDING_RIGHT_FORK
                } else if (p.state !== States.EATING) {
                    p.state = States.HANGRY
                }
            })

            this.notifyObservers()
        }

        updatePhilosopherPriority(ph: Philosopher) {
            const lowestPriority = this.philosophers.reduce((acc, cur) => Math.max(acc, cur.priority), 0)
            ph.priority = lowestPriority + 1
            this.notifyObservers()
        }

        /**
         * observable implementations
         */
        registerObserver(observer: Observer) {
            this.observers.push(observer)
            this.notifyObservers()
        }

        removeObserver(observer: Observer) {
            this.observers = this.observers.filter((o) => o !== observer)
        }

        notifyObservers() {
            this.observers.forEach((observer) => observer.update(this))
        }

        /**
         * Private methods
         */
        private addPointsToForksAndPhilosophers() {
            let angle: number = 0
            this.philosophers.forEach((philosopher, i) => {
                angle = i * (360 / this.philosophers.length)
                const x1 = centerX + R * Math.cos(degreesToRadians(angle))
                const y1 = centerY + R * Math.sin(degreesToRadians(angle))
                const x2 = centerX - (x1 - centerX)
                const y2 = centerY - (y1 - centerY)
                philosopher.coords.x = x1
                philosopher.coords.y = y1
                this.forks[i].coords.x = x2
                this.forks[i].coords.y = y2
            })
        }

        private holdingTwoForksCheck(p: Philosopher) {
            return this.holdingLeftForkCheck(p) && this.holdingRightForkCheck(p)
        }

        private holdingRightForkCheck(p: Philosopher) {
            return this.forks[p.forkRight].heldBy === p
        }

        private holdingLeftForkCheck(p: Philosopher) {
            return this.forks[p.forkLeft].heldBy === p
        }

        /**
         * GETTERS / SETTERS
         */
        set currentPhilosopher(philosopher: Philosopher) {
            philosopher.isSelected = true
            this._currentPhilosopher = philosopher
            this.notifyObservers()
        }

        get currentPhilosopher() {
            return this._currentPhilosopher
        }
    }
}
