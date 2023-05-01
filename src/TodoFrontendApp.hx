package;

import js.Browser;
import urals.web.BrowserHtmlInjector;
import urals.web.BrowserRenderer.browserRender;
import urals.storage.IdGenFunctions.genIntId;
import urals.IntIdRenderer;
import widgets.TodoPageWidget.todoPageWidgetFactory;
import widgets.TodoElemWidget.todoElemWidgetFactory;
import widgets.TodoElemWidget.TodoElemModel;
import urals.storage.BasicReactiveStorage;

class TodoFrontendApp 
{
    static var todoElemsStor: BasicReactiveStorage<TodoElemModel, Int>;
    static var pageModels = [
        {id: 1, val: {}}
    ];

    public static function main() {
        var todoElemsIdRenderer = new IntIdRenderer("todo_el_");

        var todoElemWidget = todoElemWidgetFactory("todo-el", todoElemsIdRenderer.renderId);
        var todoPageWidget = todoPageWidgetFactory("todo-page");

        todoElemsStor = new BasicReactiveStorage(
            genIntId,
            (data) -> browserRender(
                data,
                (el) -> "." + todoPageWidget.adv.containerClass,
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
        });
        var allStyles = [
            todoElemWidget.css,
            todoPageWidget.css
        ].join('\n\n');
        var htmlInjector = new BrowserHtmlInjector(Browser.document.querySelector("html"));
        htmlInjector.append("head", "<style>\n" + allStyles + "\n</style>");
    }
}