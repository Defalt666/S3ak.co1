const { apex } = require("../menu/apex");
const { db } = require("../models/banco");

function execute(user, msg) {
    if (msg === "*") {
        db[user].stage = 0;
        return ["Pedido cancelado com sucesso"];
    }

    if (msg === "#") {
        db[user].stage = 11;
        return ["Estamos fechando seu pedido, ok?"];
    }

    if (!apex[msg]) {
        return [
            "Código inválido, digite corretamente",
            "```Digite # para finalizar ou * para cancelar```",
        ];
    }

    db[user].itens.push(apex[msg]);

    return [
        `Você selecionou a opção *${apex[msg].description}*!`,
    ];
}

exports.execute = execute;