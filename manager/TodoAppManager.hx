package;

import sys.io.File;
import haxe.io.Path;
import urals.web.StaticRenderer;
import sys.FileSystem;

class TodoAppManager 
{
    private static function getHtml(): String
    {
        var basicHtml = 
'<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    </body>
    <script src="todo-frontend-app.js"></script>
</html>';
        var staticRenderer = new StaticRenderer(basicHtml);
        var app = (new TodoAppRunner(
            staticRenderer,
            staticRenderer,
            staticRenderer
        ));
        app.run();
        return staticRenderer.getHtml();
    }    

    private static function getJs(): String {
        var pathToJs = Path.join([
            sys.FileSystem.absolutePath(''),
            "/res/todo-frontend-app.js"
        ]);
        return File.getContent(pathToJs);
    }

    private static function getCss(): String {
        var staticRenderer = new StaticRenderer("");
        return (new TodoAppRunner(
            staticRenderer,
            staticRenderer,
            staticRenderer
        )).getCss();
    }

    public static function main(): Void {
        trace({
            html: getHtml(),
            js: getJs(),
            css: getCss()
        });
    }
}