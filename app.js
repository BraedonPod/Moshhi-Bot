require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Commando = require('discord.js-commando');
// const { PREFIX, TOKEN } = require('./config.json');
const loadFeatures = require('./features/load-features');

const client = new Commando.CommandoClient({
    owner: process.env.OWNER,
    commandPrefix: process.env.PREFIX
});

client.on('warn', console.warn)
    .on('error', console.error)
    .on('ready', () => { 
        console.log('███    ███  ██████  ███████ ██   ██ ██   ██ ██ ');
        console.log('████  ████ ██    ██ ██      ██   ██ ██   ██ ██ ');
        console.log('██ ████ ██ ██    ██ ███████ ███████ ███████ ██ ');
        console.log('██  ██  ██ ██    ██      ██ ██   ██ ██   ██ ██ ');
        console.log('██      ██  ██████  ███████ ██   ██ ██   ██ ██');
        console.log('Moshhi online!') 
    })
    .on('disconnect', () => console.log('I disconnected!'))
    .on('reconnecting', () => console.log('I am disconnecting!'));

client.registry
    .registerGroups([
        ['misc', 'misc commands'],
        ['music', 'music commands'],
        ['moderation', 'moderation commands']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

loadFeatures(client);

client.login(process.env.TOKEN);