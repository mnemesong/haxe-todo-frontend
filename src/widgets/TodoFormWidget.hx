package widgets;

import Types.Widget;

typedef TodoFormModel = {
    header: String
}

typedef TodoFormAdv = {
    headerFieldClass: String,
    headerInputId: String
}

function todoFormWidgetFactory(
    className: String
): Widget<TodoFormModel, Int, TodoFormAdv> {
    var headerFieldClass = className + "-header-filed";
    var renderId = (el) -> "todoForm";
    var headerInputId = renderId(1) + "Input"; 
    return {
        renderBundle: {
            template: (el: TodoFormModel, id: Int) -> '
            <div class="${className}" id="${renderId(id)}">
                <div class="${headerFieldClass}">
                    <label for="${headerInputId}">Название задачи</label>
                    <input type="text" id="${headerInputId}" val="">
                </div>
            </div>',
            renderId: renderId
        },
        css: '
        .${headerFieldClass} {display: grid; grid-template-columns: 150px 1fr; grid-gap: 10px;}',
        className: className,
        adv: {
            headerFieldClass: headerFieldClass,
            headerInputId: headerInputId
        }
    }
}