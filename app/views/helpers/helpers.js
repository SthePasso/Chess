const showError = function (errors, field) {
    var mensagem;
    if (typeof errors != 'undefined') {
        errors.forEach(function (error) {
            if (error.path == field) {
                mensagem = error.message;
                return;
            }
        });
        return mensagem;
    }
}

const isLogged = function (expreq, options) {
    if (typeof (expreq.session.uid) !== 'undefined') {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}