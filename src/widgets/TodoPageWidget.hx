package widgets;

import Types.Widget;

typedef TodoPageModel = {};

typedef TodoPageAdv = {
    elsContainerClass: String,
    formContainerClass: String
}

function todoPageWidgetFactory(
    className: String
): Widget<TodoPageModel, Int, TodoPageAdv> {
    var elsContainerClass = '${className}-els';
    var formContainerClass = '${className}-form';
    return {
        renderBundle: {
            template: (m: TodoPageModel, id: Int) -> '
            <div class="${className}" id="todoPage">
                <h1>Todo app</h1>
                <div class="${elsContainerClass}">
                </div>
                <hr>
                <div class="${formContainerClass}"></div>
            </div>',
            renderId: (id: Int) -> "todoPage"
        },
        css: '
        .${className} > h1 {padding: 0; margin: 0;}
        .${className} {display: grid; grid-gap: 20px; max-width: 400px;}
        .${className}-container {display: grid; grid-gap: 10px;}',
        className: className,
        adv:{
            elsContainerClass:elsContainerClass,
            formContainerClass: formContainerClass
        }
    };
}