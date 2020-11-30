require('dotenv').config();
const { MessageAttachment } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

class RemoveStockCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'removestock',
      group: 'instock',
      memberName: 'removestock',
      description: 'Remove a url',
      aliases: ['removeurl', 'removestock'],
    })
  }

  run = async (message, args) => {
    try {
      message.delete({ timeout: 500 });
      const channel = message.member.guild.channels.cache.find(ch => ch.name === 'in-stock');
      if (!channel) return;
      if(channel !== message.channel) return message.reply('Please type in the instock/in-stock channel');
      if(!args) return message.reply('Please specify a product url');

      if(args.includes("bestbuy"))
        await axios.delete(process.env.API_URL, { params: args })
          .then(res => {
            //Added
            console.log(res.data);
          });
    } catch(err) {
      //Not Added
      console.log(err.response.data);
    }
  }
}

module.exports = RemoveStockCommand;