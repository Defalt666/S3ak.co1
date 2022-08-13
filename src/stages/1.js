const { menu0 } = require("../menu/menu0");
const { fifa } = require("../menu/fifa");
const { db } = require("../models/banco");

function execute(user, msg) {
    let menu = "_*JOGOS*_\n\n";

    Object.keys(fifa).forEach((value) => {
        let element = fifa[value];
        menu += `${value}${element.description} ---- R$${element.price}\n`;
    });
    db[user].stage = 8;
    return [
        `Você selecionou o *${menu0[msg].description}*!

_*Abaixo estão as opções de moedas e os valores respectivos para a compra:*_`, menu,
];
}

exports.execute = execute;