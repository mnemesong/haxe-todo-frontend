package;

import widgets.TodoFormWidget.TodoFormModel;
import Types.Widget;
import js.html.InputElement;
import widgets.TodoFormWidget.todoFormWidgetFactory;
import js.Browser;
import urals.web.BrowserHtmlInjector;
import urals.web.BrowserRenderer.browserRender;
import urals.storage.IdGenFunctions.genIntId;
import urals.IntIdRenderer;
import widgets.TodoPageWidget.todoPageWidgetFactory;
import widgets.TodoElemWidget.todoElemWidgetFactory;
import widgets.TodoElemWidget.TodoElemModel;
import urals.storage.BasicReactiveStorage;
import widgets.TodoFormWidget.TodoFormAdv;
import widgets.TodoPageWidget.TodoPageAdv;
import widgets.TodoPageWidget.TodoPageModel;

using Lambda;

class TodoFrontendApp 
{
    static var todoElemsStor: BasicReactiveStorage<TodoElemModel, Int>;
    static var pageModels = [
        {id: 1, val: {}}
    ];
    static var formModels = [
        {id: 1, val:{header: ""}}
    ];

    private static function rerenderForm(
        todoFormWidget: Widget<TodoFormModel, Int, TodoFormAdv>,
        todoPageWidget: Widget<TodoPageModel, Int, TodoPageAdv>
    ): Void {
        browserRender(
            formModels, 
            (el) -> "." + todoPageWidget.adv.formContainerClass, 
            todoFormWidget.renderBundle,
            (elHtml2, el2) -> {
                trace("#" + todoFormWidget.adv.headerInputId);
                elHtml2.querySelector("#" + todoFormWidget.adv.headerInputId)
                    .onchange = (event) -> {
                        var input: InputElement = cast Browser.document
                            .querySelector("#" + todoFormWidget.adv.headerInputId);
                        var val =input.value;
                        var elems = todoElemsStor.readAll();
                        var newElemVals = elems.map(el -> el.val)
                            .concat([{header: val, isChecked: false}]);
                        todoElemsStor.reInit(newElemVals);
                        rerenderForm(todoFormWidget, todoPageWidget);
                    };
            }
        );
    }

    public static function main() {
        var todoElemsIdRenderer = new IntIdRenderer("todo_el_");

        var todoElemWidget = todoElemWidgetFactory("todo-el", todoElemsIdRenderer.renderId);
        var todoPageWidget = todoPageWidgetFactory("todo-page");
        var todoFormWidget = todoFormWidgetFactory("todo-form");

        todoElemsStor = new BasicReactiveStorage(
            genIntId,
            (data) -> browserRender(
                data,
                (el) -> "." + todoPageWidget.adv.elsContainerClass,
                todoElemWidget.renderBundle,
                (elHtml, el) -> {
                    todoElemWidget.adv.setOnChangeFunction(elHtml, el, todoElemsStor);
                }
            )
        );
        browserRender(pageModels, (el) -> "body", todoPageWidget.renderBundle, (elHtml, el)->{
            todoElemsStor.reInit([
                {header: "Почистить зубы", isChecked: false},
                {header: "Помыть кота", isChecked: true},
            ]);
            rerenderForm(todoFormWidget, todoPageWidget);
        });
        var allStyles = [
            todoElemWidget.css,
            todoPageWidget.css
        ].join('\n\n');
        var htmlInjector = new BrowserHtmlInjector(Browser.document.querySelector("html"));
        htmlInjector.append("head", "<style>\n" + allStyles + "\n</style>");
    }
}