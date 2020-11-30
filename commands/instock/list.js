require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

class ListStockCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'liststock',
      group: 'instock',
      memberName: 'liststock',
      description: 'Add a url to check stock levels',
      aliases: ['stockq', 'stockqueue', 'stocklist'],
    })
  }

  run = async (message) => {
    try {
      message.delete({ timeout: 500 });
      const channel = message.member.guild.channels.cache.find(ch => ch.name === 'in-stock');
      if (!channel) return;
      if(channel !== message.channel) return message.reply('Please type in the instock/in-stock channel');

      const status = await axios.get(process.env.API_URL);
      console.log(status.data);
      if(!status.data.length) return message.channel.send("There is nothing added.");

      let list = new MessageEmbed()
        .setAuthor("Instock List")
        .setColor("BLUE")
        .setDescription(status.data.map((item) => {
          return item.link
        }).join("\n"));
      message.channel.send(list);
    } catch(err) {
      console.log(err.response);
    }
  }
}

module.exports = ListStockCommand;