const { MessageAttachment } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class CatCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'kitty',
      group: 'misc',
      memberName: 'kitty',
      description: 'Displays a random picture of a moshhi kitty',
      aliases: ['gibkitty', 'moarkitty'],
    })
  }

  run = async (message) => {
    try {
      const { data } = await axios.get('https://aws.random.cat/meow');
      const attachment = new MessageAttachment(data.file);
      message.delete({ timeout: 500 });
      message.channel.send(attachment);
    } catch(err) {
      console.log(err.response);
    }
  }
}