var os = require("os");
var gui = require('nw.gui');
var win = gui.Window.get();
// win.showDevTools();
var win_projects, win_project;

var tray = new gui.Tray({ title: 'Coder', icon: './img/code-icon.png' });
var menu = new gui.Menu();
menu.append(new gui.MenuItem({ label: 'Close' }));
menu.items[0].click = function() {
    gui.App.closeAllWindows();
};
tray.menu = menu;

$("#main-header").text(os.hostname());

$("#show-projects").on('click', function() {
    if(!win_projects) {
        if(win_project) {
            win_project.close();
        }
        win_projects = gui.Window.open('./resources/projects.html',
        {
            toolbar: false,
            frame: false,
            transparent: true,
            resizable: true,
            x: win.x + win.width + 20,
            y: win.y,
            show: false,
            show_in_taskbar: false
        });
        win_projects.on('open-project', function() {
            win_projects = null;
            $("#show-projects").toggleClass("selected");
            win_project = gui.Window.open('./resources/project.html',
            {
                toolbar: false,
                frame: false,
                transparent: true,
                resizable: false,
                width: 350,
                height: 250,
                x: win.x + win.width + 20,
                y: win.y,
                show_in_taskbar: false
            });
            win_project.on('close', function() {
                win_project = null;
                this.close(true);
            });
        });
    }
    else {
        win_projects.close();
        win_projects = null;
    }
    $(this).toggleClass("selected");
});

win.on('close', function() {
    this.hide();
    if(win_projects)
        win_projects.close();
    this.close(true);
});
