
$('#criar-conta').click(function () {

    var erro = 0;
    if ($('#nome').val().length < 10 || $('#nome').val().length > 100) {
        erro++;
        $('#nome').addClass('is-invalid');
    } else {
        $('#nome').removeClass('is-valid');
    }

    if ($('#email').val().search("@") == -1 &&
        $('#email').val().search(".") < 1 &&
        $('#email').val().search(" ") == -1) {
        erro++;
        $('#email').addClass('is-invalid');
    } else {
        $('#email').removeClass('is-valid');
    }

    // var filed = $('#email').val();
    // usuario = field.value.substring(0, field.value.indexOf("@"));
    // dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);
    // if ((usuario.length >= 1) && (dominio.length >= 3) &&
    //     (usuario.search("@") == -1) && (dominio.search("@") == -1) &&
    //     (usuario.search(" ") == -1) && (dominio.search(" ") == -1) &&
    //     (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) &&
    //     (dominio.lastIndexOf(".") < dominio.length - 1)) {
    //     erro++;
    //     $('#email').addClass('is-invalid');
    // }
    // else {
    //     $('#email').removeClass('is-invalid');
    // }

    if ($('#senha').val().length < 6) {
        erro++;
        $('#senha').addClass('is-invalid');
    } else {
        $('#senha').removeClass('is-valid');
    }

    if ($('#conf').val() != $('#senha').val() || $('#senha').val().length < 6) {
        erro++;
        $('#conf').addClass('is-invalid');
    } else {
        $('#conf').removeClass('is-valid');
    }

    if ($('#termo').click()){
        $('#termo').removeClass('is-valid');
    } else {
        erro++
        $('#termo').addClass('is-valid');
    }
    if (erro > 0) return false;
});

$('#entrar').click(function () {
    var erro = 0;
    if ($('#email').val().search("@") == -1 &&
        $('#email').val().search(".") < 1 &&
        $('#email').val().search(" ") == -1) {//colocar validação de email cadastrado
        erro++;
        $('#email').addClass('is-invalid');
    } else {
        $('#email').removeClass('is-valid');
    }

    if ($('#senha').val().length < 6) {//colocar validação de senha pelo
        erro++;
        $('#senha').addClass('is-invalid');
    } else {
        $('#senha').removeClass('is-valid');
    }

    if ($('#termo').click()){
        // deve salvar o login e sanha digitados de algum modo
    }

    if (erro > 0) return false;
});