const Commando = require('discord.js-commando');

class MoshiCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'moshmosh',
			group: 'misc',
			memberName: 'moshmosh',
			description: 'moshi moshi!',
			aliases: ['moshi', 'moshimoshi'],
		});
	}

	async run(message) {
    message.reply('moshi moshi!');
	}
}

module.exports = MoshiCommand;