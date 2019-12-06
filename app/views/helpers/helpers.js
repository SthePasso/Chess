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


function createMessage(message, my_id, color) {
    var propria = message.id_user == my_id;
    var align = propria ? 'right' : 'left';
    var cor = propria ? (color == 'b' ? 'black' : 'white') : (color == 'b' ? 'white' : 'black');
    var raw = `
      <li class="${align}-message ${cor}-message">
        <div class="message-data">
            ${propria ? '' : '<span class="message-piece"><i class="fas fa-chess-king"></i></span>'}
            <span class="message-data-time">${new Date(message.now).toLocaleTimeString()}</span>
            ${propria ? '<span class="message-piece"><i class="fas fa-chess-king"></i></span>' : ''}
        </div>
        <div class="message">${message.mensagem}</div>
      </li>
    `;
    return raw;
}

function criarMensagens(mensagensAntigas, my_id, color) {
    console.log('>>>>>>>>>>>')
    let str = '';
    for (const mensagem of mensagensAntigas) {
        str += createMessage(mensagem, my_id, color);
    }
    return str;
}

module.exports = {
    showError,
    isLogged,
    criarMensagens,
}