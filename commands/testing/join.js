const Commando = require('discord.js-commando')

module.exports = class SimJoinCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'testjoin',
      group: 'testing',
      memberName: 'testjoin',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Simulates a join',
    })
  }

  run = (message) => {
    message.delete({ timeout: 500 });
    this.client.emit('guildMemberAdd', message.member)
  }
}