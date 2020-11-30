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
    const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/554363703156277277/777632536092082176/flip.gif');
    message.channel.send(attachment)
      .then(msg => {
        msg.delete({ timeout: 9000 });
      });
  }
}

module.exports = Flip;