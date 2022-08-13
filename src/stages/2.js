const { menu0 } = require("../menu/menu0");
const { apex } = require("../menu/apex");
const { db } = require("../models/banco");

function execute(user, msg) {
    let menu = "_*JOGOS*_\n\n";

    Object.keys(apex).forEach((value) => {
        let element = apex[value];
        menu += `${value}${element.description} ---- R$${element.price}\n`;
    });
    db[user].stage = 8;
    return [
        `Você selecionou o *${menu0[msg].description}*!

_*Abaixo estão as opções de moedas e os valores respectivos para a compra:*_`, menu,
];
}

exports.execute = execute;