
$('#enviar').click(function () {
    var erro = 0;
    if ($('#nome').val().length < 3 || $('#nome').val().length > 100) {
        erro++;
        $('#nome').addClass('is-invalid');
    } else {
        $('#nome').removeClass('is-valid');
    }

    var filed = $('#email').val();
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);
    if ((usuario.length >= 1) && (dominio.length >= 3) &&
        (usuario.search("@") == -1) && (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) && (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        $('#email').removeClass('is-valid');
    }
    else {
        erro++;
        $('#email').addClass('is-invalid');
    }

    if ($('#nome').val().length < 10 || $('#nome').val().length > 100) {
        erro++;
        $('#nome').addClass('is-invalid');
    } else {
        $('#nome').removeClass('is-valid');
    }
    console.log('botao');
    if (erro > 0) return false;
});