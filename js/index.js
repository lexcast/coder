var os = require("os");
var gui = require('nw.gui');
var win = gui.Window.get();
// win.showDevTools();
var win_projects;

$("#main-header").text(os.hostname());

$("#show-projects").on('click', function() {
    if(!win_projects) {
        win_projects = gui.Window.open('./resources/projects.html',
        {
            toolbar: false,
            frame: false,
            transparent: true,
            resizable: true,
            x: win.x + win.width + 20,
            y: win.y,
            show: false
        });
    }
    else {
        win_projects.close();
        win_projects = null;
    }
    $(this).toggleClass("selected");
});
