const Commando = require('discord.js-commando')

class SimLeaveCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'testleave',
      group: 'testing',
      memberName: 'testleave',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Simulates a leave',
    })
  }

  run = async (message) => {
    message.delete({ timeout: 500 });
    this.client.emit('guildMemberLeave', message.member)
  }
}

module.exports = SimLeaveCommand;