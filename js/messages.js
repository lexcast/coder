var msgs = document.createElement('div');
msgs.setAttribute('id', 'message-container');
$(document.body).append(msgs);

function showMessage(message, type, icon) {
    var msg = document.createElement('div');
    msg.setAttribute('class', 'message '+ type);
    var icn = document.createElement('span');
    icn.setAttribute('class', 'fa fa-'+ icon);
    $(msg).append(icn, " " + message);
    $(msgs).append(msg);

    $(msg).delay(4000).fadeOut(1000, function() {
        $(this).remove();
    });

    $(msg).on('click', function() {
        $(this).remove();
    });
}
function error(message) {
    showMessage(message, "error", "exclamation-circle");
}
function success(message) {
    showMessage(message, "success", "check-circle");
}
function info(message) {
    showMessage(message, "info", "info-circle");
}
