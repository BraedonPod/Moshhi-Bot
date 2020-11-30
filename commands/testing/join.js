const Commando = require('discord.js-commando')

class SimJoinCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'testjoin',
      group: 'testing',
      memberName: 'testjoin',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Simulates a join',
    })
  }

  run = async (message) => {
    message.delete({ timeout: 500 });
    this.client.emit('guildMemberAdd', message.member);
  }
}

module.exports = SimJoinCommand;