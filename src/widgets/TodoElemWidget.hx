package widgets;

import Types.Widget;

typedef TodoElemModel = {
    isChecked: Bool,
    header: String
}

typedef TodoElemAdv<Id> = {
}

function todoElemWidgetFactory<Id>(
    className: String, 
    renderId: (el: Id) -> String
): Widget<TodoElemModel, Id, TodoElemAdv<Id>> {
    return {
        renderBundle: {
            template: (m: TodoElemModel, id: Id) -> {
                return '
                <div class="${className}" 
                     id="${renderId(id)}">
                    <input id="${renderId(id)}_inp" type="checkbox"${(m.isChecked == true) ? " checked" : ""}>
                    <label${(m.isChecked == true) ? ' style="text-decoration: line-through;"' : ''}
                     for="${renderId(id)}_inp">
                        ${m.header}
                    </label>
                </div>';
            },
            renderId: renderId
        },
        css: '.${className} {display: grid; grid-template-columns: 30px 1fr; grid-gap: 10px;}',
        className: className,
        adv: {
        }
    }
}