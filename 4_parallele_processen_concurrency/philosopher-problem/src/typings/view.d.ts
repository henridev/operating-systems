import { Model } from '../models'

export interface Observer {
    update: (model: Model.MainModel) => void
}

export interface EventListenerView {
    addClickEventListener: (handler: (this: HTMLButtonElement | HTMLCanvasElement, ev: MouseEvent) => any) => void
}
