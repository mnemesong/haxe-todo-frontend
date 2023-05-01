package widgets;

import urals.storage.StorageTypes.Entity;
import urals.storage.BasicStorageInterface;
import js.html.Element;
import js.Browser;
import Types.Widget;

typedef TodoElemModel = {
    isChecked: Bool,
    header: String
}

typedef TodoElemAdv<Id> = {
    setOnChangeFunction: (
        elemHtml: Element, 
        elem: Entity<TodoElemModel, Id>,
        stor: BasicStorageInterface<TodoElemModel, Id>
    ) -> Void,
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
            setOnChangeFunction: (
                    elemHtml: Element, 
                    elem: Entity<TodoElemModel, Id>,
                    stor: BasicStorageInterface<TodoElemModel, Id>
                ) -> {
                    elemHtml.querySelector('input')
                        .onchange = (event) -> {
                            var elems = stor.readAll();
                            elems = elems.map(el -> (el.id == elem.id) 
                                ? { id: elem.id, val: {isChecked: !elem.val.isChecked, header: elem.val.header}}
                                : el);
                            stor.reInit(elems.map(el -> el.val));
                        }
                }
        }
    }
}