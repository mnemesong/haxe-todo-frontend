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
import js.html.Element;
import urals.storage.StorageTypes;
import urals.storage.BasicStorageInterface;

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

    private static function setOnChangeFunction<Id>(
        elemHtml: Element, 
        elem: Entity<TodoElemModel, Id>,
        stor: BasicStorageInterface<TodoElemModel, Id>
    ): Void {
        elemHtml.querySelector('input')
            .onchange = (event) -> {
                var elems = stor.readAll();
                elems = elems.map(el -> (el.id == elem.id) 
                    ? { id: elem.id, val: {isChecked: !elem.val.isChecked, header: elem.val.header}}
                    : el);
                stor.reInit(elems.map(el -> el.val));
            }
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
                    setOnChangeFunction(elHtml, el, todoElemsStor);
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