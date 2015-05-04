var gui = require('nw.gui');
var win = gui.Window.get();
// win.showDevTools();
var win_add;

var projects = storedb('projects').find();
var container = $("#projects-container");
if(projects) {
    win.resizeTo(
        ((projects.length > 3) ? 180*3 : projects.length * 180),
        (200 + Math.floor((projects.length-1)/3) * 160)
    );
    projects.forEach(function(project) {
        container.append('<div class="project-container" id="'+project.name+'">'
        + '<div class="project-info"><img src="'+project.icon+'"><h2>'+project.name+'</h2></div>'
        + '<div class="project-options"></div></div>');
    });
} else {
    win.resizeTo(180, 130);
    container.toggleClass("empty");
    container.append("<p>no projects</p>");
}

container.on('click', '.project-container', function() {
    win.hide();
    global.openProject = this.id;
    win.emit('open-project');
    win.close();
});

win.show();

$("#add-project").on('click', function() {
    if(!win_add) {
        win_add = gui.Window.open('add-project.html',
        {
            toolbar: false,
            frame: false,
            position: "center",
            transparent: true,
            width: 200,
            height: 220,
            focus: true,
            resizable: false,
            show_in_taskbar: false
        });
        win_add.on('add', function() {
            win.reload();
            // refresh projects list
            // success('project created')
        });
    }
    else {
        win_add.show();
    }
});

win.on('close', function() {
    this.hide();
    if(win_add)
        win_add.close();
    this.close(true);
});
