const Commando = require('discord.js-commando');

class KickCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kick member from the server',
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS']
		});
	}

	async run(message) {
		const target = message.mentions.users.first();
		if (!target) return message.reply('Please specify a User to kick');

		const { guild } = message;
		const member = guild.members.cache.get(target.id);
		if (member.kickable) {
			member
				.kick()
				.then((member) => message.channel.send(`${member} was kicked.`))
				.catch((err) => message.channel.send('I cannot kick that user'));
		} else {
			message.reply('I cannot kick that user!');
		}
	}
}

module.exports = KickCommand;