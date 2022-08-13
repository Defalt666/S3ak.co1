const { Client, Location, List, Buttons, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { db } = require("../src/models/banco");
const { step } = require("../src/models/stages");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});


    client.on('message', async message => {
        let resp = step[getStage(message.from)].obj.execute(
            message.from,
            message.body,
        );
        for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            client.sendMessage(message.from, element);
        }
    });

function getStage(user) {
    if (db[user]) {
        //Se existir esse numero no banco de dados
        return db[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        db[user] = {
            stage: 0,
            itens: [],
        };
        return db[user].stage;
    }
}