var gui = require('nw.gui');
var win = gui.Window.get();
// win.showDevTools();

var nameText = $("#project-name .content");
var pathText = $("#project-path .content");
var project;

storedb('projects').find({ "name": global.openProject }, function(err, result) {
    if(!err) {
        project = result[0];
    } else {
        error('there was an error');
    }
});

document.title = project.name;

nameText.text(project.name);

pathText.text(' ~ ' + project.location);

var img = document.createElement('img');
img.setAttribute('src', project.icon);
$("#project-icon").prepend(img);

$("#delete-project").on('click', function() {
    var sure = confirm('are you sure you want to delete this project?');
    if(sure == true) {
        storedb('projects').remove({ "name": project.name }, function(err) {
            if(!err){
                win.close();
            } else {
                error('there was an error');
            }
        });
    }
});

function toggleEditBtn() {
    $("#project-name .fa")
        .toggleClass('fa-pencil')
        .toggleClass('fa-check');
}

$("#project-name .fa").on('click', function() {
    if(nameText.attr('contenteditable') == 'true') {
        var name = nameText.text().trim();
        if(!name) {
            error('Project name not must be empty');
        }
        else if(project.name == name) {
            nameText.text(name);
            nameText.attr('contenteditable', false);
            toggleEditBtn();
        }
        else {
            var exists;
            storedb('projects').find({ "name": name }, function(err, result) {
                if(!err) {
                    exists = result[0];
                } else {
                    error('there was an error');
                }
            });
            if(exists) {
                error('A project with that name already exists');
            }
            else {
                storedb('projects').update(
                        {'name': project.name},
                        {'$set': {'name': name}},
                        function(err){
                            if(!err){
                                project.name = name;
                                nameText.text(name);
                                nameText.attr('contenteditable', false);
                                toggleEditBtn();
                                success('Project name changed');
                            }
                            else {
                                error('there was an error');
                            }
                        }
                );
            }
        }
    }
    else {
        nameText.attr('contenteditable', true);
        nameText.focus();
        toggleEditBtn();
    }
});

$("#project-path .fa").on('click', function() {
    $("#location").click();
});

$("#location").on('change', function() {
    var location = $(this).val();
    if(location) {
        storedb('projects').update(
                {'name': project.name},
                {'$set': {'location': location}},
                function(err){
                    if(!err){
                        project.location = location;
                        pathText.text(location);
                        success('Project location changed');
                    }
                    else {
                        error('there was an error');
                    }
                }
        );
    }
});

$("#project-icon img").on('click', function() {
    $("#icon").click();
});

$("#icon").on('change', function() {
    var icon = $(this).val();
    if(icon) {
        storedb('projects').update(
                {'name': project.name},
                {'$set': {'icon': icon}},
                function(err){
                    if(!err){
                        project.icon = icon;
                        $("#project-icon img").attr('src', icon);
                        success('Project icon changed');
                    }
                    else {
                        error('there was an error');
                    }
                }
        );
    }
});
