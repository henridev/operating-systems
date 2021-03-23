import { Controller } from './controller'
import { Model } from './models'
import { View } from './views'

function init() {
    const model = new Model.MainModel()
    const view = new View.MainView()
    const controller = new Controller.MainController(model, view)

    model.registerObserver(view.canvas)
    model.registerObserver(view.table)
    model.registerObserver(view.eatButton)

    view.canvas.addClickEventListener(controller.canvasClickListener)
    view.eatButton.addClickEventListener(controller.eatButtonClickListener)
}

init()
