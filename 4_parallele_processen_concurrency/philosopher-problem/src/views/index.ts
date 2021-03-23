import { Observer, EventListenerView } from '../typings/view'
import { clearCanvas, drawTable } from '../animation'
import { drawFork, drawPhilosopher } from '../animation/implementations'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants'
import { Model } from '../models'
import { Philosopher, States } from '../typings/data'

export namespace View {
    class Canvas implements Observer, EventListenerView {
        element = document.getElementById('myCanvas') as HTMLCanvasElement
        constructor() {
            this.element.style.backgroundColor = 'grey'
            this.element.width = CANVAS_WIDTH
            this.element.height = CANVAS_HEIGHT
        }

        update(model: Model.MainModel) {
            const ctx = this.element.getContext('2d') as CanvasRenderingContext2D
            ctx.globalCompositeOperation = 'destination-over'
            clearCanvas(ctx)
            model.philosophers.forEach((philosopher, i) => {
                drawPhilosopher(ctx, philosopher)
                drawFork(ctx, model.forks[i])
            })
            drawTable(ctx)
        }

        addClickEventListener(handler: (this: HTMLCanvasElement, ev: MouseEvent) => any) {
            this.element.addEventListener('click', handler)
        }
    }

    class EatButton implements EventListenerView, Observer {
        element = document.getElementById('eat') as HTMLButtonElement
        id: string = 'eat'
        disabled: boolean = false
        constructor() {}

        addClickEventListener(handler: (this: HTMLButtonElement, ev: MouseEvent) => any) {
            this.element.addEventListener('click', handler)
        }

        update(model: Model.MainModel) {
            if (model.currentPhilosopher) {
                this.element.innerText = `🍔 eat ${model.currentPhilosopher.name} 🍔`
                this.id = model.currentPhilosopher.name
            }
        }
    }

    class InfoTable implements Observer {
        headers: (keyof Philosopher)[] = ['name', 'forkLeft', 'forkRight', 'fullness', 'priority', 'state']
        element = document.getElementById('info-table') as HTMLButtonElement
        constructor() {}

        update(model: Model.MainModel) {
            this.element.innerHTML = ''
            const header = this.createHeader()
            this.element.appendChild(header)
            model.philosophers.forEach((philosopher) => {
                const row = this.createRow(philosopher)
                this.element.appendChild(row)
            })
        }

        private createHeader() {
            const tr = document.createElement('tr')
            this.headers.forEach((element) => {
                const td = document.createElement('th')
                td.innerText = element
                tr.appendChild(td)
            })
            return tr
        }

        private createRow(p: Philosopher) {
            const tr = document.createElement('tr')
            this.headers.forEach((header) => {
                const td = document.createElement('td')
                this.setBackgroundColor(td, p)
                const property = p[header]
                if (property?.toString()) {
                    console.log(property)
                    td.innerText = property?.toString()
                }
                tr.appendChild(td)
            })
            return tr
        }

        private setBackgroundColor(td: HTMLTableDataCellElement, p: Philosopher) {
            if (p.state === States.EATING) {
                td.style.backgroundColor = 'lightgreen'
            } else if (p.state === States.HANGRY) {
                td.style.backgroundColor = 'lightcoral'
            } else {
                td.style.backgroundColor = 'lightsalmon'
            }
        }
    }

    export class MainView {
        canvas: Canvas
        eatButton: EatButton
        table: InfoTable
        constructor() {
            this.canvas = new Canvas()
            this.eatButton = new EatButton()
            this.table = new InfoTable()
        }
    }
}
