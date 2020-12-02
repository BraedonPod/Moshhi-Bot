require('dotenv').config();
const Commando = require('discord.js-commando');
const { MessageAttachment } = require('discord.js');

class Flip extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'flip',
      group: 'misc',
      memberName: 'flip',
      description: 'Does a flip',
      aliases: ['doflip', 'barrelroll'],
    })
  }

  //Fix this up as it's really slow
  run = async (message) => {
    message.delete({ timeout: 1000 });
    const attachment = new MessageAttachment(process.env.FLIP);
    message.channel.send(attachment)
      .then(msg => {
        msg.delete({ timeout: 9000 });
      });
  }
}

module.exports = Flip;