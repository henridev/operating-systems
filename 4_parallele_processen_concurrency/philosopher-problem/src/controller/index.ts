import { RADIUS_FORK, RADIUS_PHILOSOPHER } from '../constants'
import { Model } from '../models'
import { Sides } from '../typings/data'
import { inCircle } from '../utils'
import { View } from '../views'

export namespace Controller {
    export class MainController {
        self = this
        model: Model.MainModel
        view: View.MainView
        constructor(model: Model.MainModel, view: View.MainView) {
            this.model = model
            this.view = view
        }

        canvasClickListener = (event: MouseEvent) => {
            const { offsetX, offsetY } = event
            this.model.philosophers.forEach((philosopher) => {
                const { coords } = philosopher
                if (inCircle(coords.x, coords.y, offsetX, offsetY, RADIUS_PHILOSOPHER)) {
                    this.model.clearPhilosopherSelection()
                    this.model.currentPhilosopher = philosopher
                }
            })

            if (this.model.currentPhilosopher) {
                this.model.forks.forEach((fork, i) => {
                    const { coords } = fork
                    if (inCircle(coords.x, coords.y, offsetX, offsetY, RADIUS_FORK)) {
                        const adjacentForkLeft = this.model.currentPhilosopher.forkLeft === i
                        const adjacentForkRight = this.model.currentPhilosopher.forkRight === i
                        if (adjacentForkLeft) {
                            this.model.pickUpFork(Sides.LEFT)
                        } else if (adjacentForkRight) {
                            this.model.pickUpFork(Sides.RIGHT)
                        }
                        this.model.updatePhilosopherStates()
                    }
                })
            }
        }

        eatButtonClickListener = (event: MouseEvent) => {
            this.model.startEating()
        }
    }
}

// eventListeners: (event) => {
//             const clickCoords = { x: event.offsetX, y: event.offsetY }

//             philosophers.forEach((philosopher, i) => {
//                 const {
//                     coords: { x, y },
//                     state,
//                 } = philosopher
//                 if (state === States.SELECTED) {
//                     selectedPhilosopher = philosopher
//                 }
//                 if (in_circle(x, y, clickCoords.x, clickCoords.y, RADIUS_PHILOSOPHER)) {
//                     philosophers.forEach(
//                         (philosopher) =>
//                             (philosopher.state = philosopher.state === States.SELECTED ? undefined : philosopher.state)
//                     )
//                     philosopher.state = States.SELECTED
//                     selectedPhilosopher = null
//                 }
//             })
//             if (selectedPhilosopher !== null) {
//                 const philosopher = selectedPhilosopher as Philosopher
//                 forks.forEach((fork, i) => {
//                     const {
//                         coords: { x, y },
//                     } = fork
//                     if (in_circle(x, y, clickCoords.x, clickCoords.y, RADIUS_FORK)) {
//                         const adjacentForkLeft = philosopher.forkLeft === i
//                         const adjacentForkRight = philosopher.forkRight === i
//                         if (adjacentForkRight || adjacentForkLeft) {
//                             pickUpFork(selectedPhilosopher as Philosopher, adjacentForkLeft ? 'left' : 'right')
//                         }
//                     }
//                 })
//             }
//         }
//     }
// }
