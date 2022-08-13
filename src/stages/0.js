const { menu0 } = require("../menu/menu0");
const { db } = require("../models/banco");

function execute(user, msg) {

    // Obtem a hora atual do PC para definir se vai ser Bom dia, tarde ou noite.
    stamp = new Date();
    hours = stamp.getHours();
    if (hours >= 18 && hours < 24) {
        time = "Boa noite"
    } else if (hours >= 12 && hours < 18) {
        time = "Boa tarde"
    } else if (hours >= 0 && hours < 12) {
        time = "Bom dia"
    }

    let menu = "_*JOGOS*_\n\n";
    
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `${value}${element.description}\n`;
    });

    db[user].stage = db[user].itens.push(menu0[msg]);
   
    return [
        `*Olá, ${time}!* Eu sou o *Fogy*, o assistente virtual da S3ak criado para lhe atender com mais rapidez e fluidez.

_*Para ver mais informações como preços e serviços sobre os jogos com que trabalhamos, digite o número respectivo do jogo na lista abaixo:*_`, menu,
];
}

exports.execute = execute;