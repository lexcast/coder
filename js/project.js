var gui = require('nw.gui');
var win = gui.Window.get();
win.showDevTools();

var project;
storedb('projects').find({ "name": global.openProject }, function(err, result) {
    if(!err) {
        project = result;
    } else {
        error('there was an error');
    }
});

document.title = project.name;

$("#project-name").prepend(project.name);

$("#project-path").prepend(' ~ ' + project.location);

var img = document.createElement('img');
img.setAttribute('src', project.icon);
$("project-icon").prepend(img);

$("#delete-project").on('click', function() {
    var sure = confirm('are you sure you want to delete this project?');
    if(sure) {
        storebd('projects').remove({ "name": project.name }, function(err) {
            if(!err){
                win.close();
            } else {
                error('there was an error');
            }
        });
    }
});
