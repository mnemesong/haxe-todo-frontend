package;

import urals.web.AbstractRenderer;
import urals.storage.IdGenFunctions.genIntId;
import urals.storage.BasicStorageInterface;
import urals.storage.BasicReactiveStorage;
import urals.IntIdRenderer;
import widgets.TodoPageWidget;
import widgets.TodoFormWidget;
import widgets.TodoElemWidget;
import Types.Widget;

class TodoAppRunner 
{
    public var elemsStor(default, null): BasicStorageInterface<TodoElemModel, Int>;
    public var formsStor(default, null): BasicStorageInterface<TodoFormModel, Int>;
    public var pagesStor(default, null): BasicStorageInterface<TodoPageModel, Int>;

    public var elemRenderer(default, null): AbstractRenderer<TodoElemModel, Int>;
    public var formRenderer(default, null): AbstractRenderer<TodoFormModel, Int>;
    public var pageRenderer(default, null): AbstractRenderer<TodoPageModel, Int>;

    public var elemWidget(default, null): Widget<TodoElemModel, Int, TodoElemAdv<Int>>;
    public var formWidget(default, null): Widget<TodoFormModel, Int, TodoFormAdv>;
    public var pageWidget(default, null): Widget<TodoPageModel, Int, TodoPageAdv>;

    public function new(
        elemRenderer: AbstractRenderer<TodoElemModel, Int>,
        formRenderer: AbstractRenderer<TodoFormModel, Int>,
        pageRenderer: AbstractRenderer<TodoPageModel, Int>
    ) {
        this.elemRenderer = elemRenderer;
        this.formRenderer = formRenderer;
        this.pageRenderer = pageRenderer;

        var todoElemsIdRenderer = new IntIdRenderer("todo_el_");

        elemWidget = todoElemWidgetFactory("todo-el", todoElemsIdRenderer.renderId);
        pageWidget = todoPageWidgetFactory("todo-page");
        formWidget = todoFormWidgetFactory("todo-form");
    }


    public function run() {
        elemsStor = new BasicReactiveStorage(
            genIntId,
            (data) -> elemRenderer.render(
                data,
                (el) -> "." + pageWidget.adv.elsContainerClass,
                elemWidget.renderBundle
            )
        );
        pagesStor = new BasicReactiveStorage(
            genIntId,
            (data) -> pageRenderer.render(
                data, 
                (el) -> "body", 
                pageWidget.renderBundle
            )
        );
        formsStor = new BasicReactiveStorage(
            genIntId,
            (data) -> formRenderer.render(
                data,
                (el) -> '.' + pageWidget.adv.formContainerClass,
                formWidget.renderBundle
            )
        );

        pagesStor.reInit([
            {}
        ]);
        formsStor.reInit([
            {header: ""}
        ]);
        elemsStor.reInit([
            {header: "Почистить зубы", isChecked: false},
            {header: "Помыть кота", isChecked: true},
        ]);
    }
}