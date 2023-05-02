package;

import urals.web.AbstractRenderer;
import widgets.TodoFormWidget.TodoFormAdv;
import widgets.TodoPageWidget.TodoPageAdv;
import widgets.TodoElemWidget.TodoElemAdv;
import urals.storage.BasicStorageInterface;
import widgets.TodoFormWidget.TodoFormModel;
import widgets.TodoPageWidget.TodoPageModel;
import widgets.TodoElemWidget.TodoElemModel;

private typedef TemplateFunc<M, Id> = (m: M, id: Id) -> String;

typedef RenderBundle<M, Id> = {
    template: TemplateFunc<M, Id>,
    renderId: (id: Id) -> String
};

typedef Widget<M, Id, Adv> = {
    renderBundle: RenderBundle<M, Id>,
    css: String,
    className: String,
    adv: Adv
}

typedef ModelBundle<M, Id, Adv> = {
    widget: Widget<M, Id, Adv>,
    storage: BasicStorageInterface<M, Id>,
    render: AbstractRenderer<M, Id>
}