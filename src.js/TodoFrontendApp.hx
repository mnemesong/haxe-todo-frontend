package;

import js.html.InputElement;
import urals.web.BrowserRenderer;
import widgets.TodoFormWidget.TodoFormModel;
import widgets.TodoElemWidget.TodoElemModel;
import widgets.TodoPageWidget.TodoPageModel;
import js.html.Element;
import urals.storage.StorageTypes;

using Lambda;

class TodoFrontendApp 
{
    public static var app: TodoAppRunner;

    public static function main() {
        app = new TodoAppRunner(
            new BrowserRenderer((elHtml: Element, el: Entity<TodoElemModel, Int>)
                -> {
                elHtml.querySelector('input').onchange = (event)
                    -> {
                        var elems = app.elemsStor.readAll();
                        var newElemVals = elems
                            .map(e -> (el.id == e.id) 
                                ? {
                                    header: el.val.header, 
                                    isChecked: !el.val.isChecked
                                }
                                : e.val);
                        app.elemsStor.reInit(newElemVals);
                    }
            }),
            new BrowserRenderer((elHtml: Element, el: Entity<TodoFormModel, Int>)
                -> {
                    var input: InputElement = cast elHtml
                        .querySelector('#' + app.formWidget.adv.headerInputId);
                    input.onchange = (event) -> {
                            var elems = app.elemsStor.readAll();
                            var elemVals = elems.map(e -> e.val)
                                .concat([{header: input.value, isChecked: false}]);
                            app.elemsStor.reInit(elemVals);
                        }
            }), 
            new BrowserRenderer((elHtml: Element, el: Entity<TodoPageModel, Int>)
                -> {
                    app.elemsStor.reInit(app.elemsStor.readAll().map(e -> e.val));
            })
        );
        app.run();
    }
}