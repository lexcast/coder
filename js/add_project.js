var gui = require('nw.gui');
var win = gui.Window.get();
// win.showDevTools();

$("#add").on('click', function() {
    if($("#form")[0].checkValidity()) {
        storedb('projects').find({"name":$("#name").val()}, function(err, result) {
            if((err == 'collection not exist') || (!err && result.length == 0)) {
                storedb('projects').insert(
                    {"name":$("#name").val(),"location":$("#location").val(),"icon":$("#icon").val()},
                    function(err,result){
                        if(!err) {
                            win.hide();
                            win.emit('add');
                        } else alert('there was an error');
                });
            }
            else if(!err && result.length > 0) {
                alert('a project with that name already exists');
            } else alert('there was an error');
        });
    }
});

$("#cancel").on('click', function() {
    win.hide();
});
