package;

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