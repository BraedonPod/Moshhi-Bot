require('dotenv').config();
const { MessageAttachment } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

class AddStockCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'addstock',
      group: 'instock',
      memberName: 'addstock',
      description: 'Add a url to check stock levels',
      aliases: ['addurl', 'urlstock'],
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
        var obj = { link: args, name: args.split('.')[1] }
        const status = await axios.post(process.env.API_URL, obj);
        //Added
        console.log(status.data);
    } catch(err) {
      //Not Added
      console.log(err.response);
    }
  }
}

module.exports = AddStockCommand;