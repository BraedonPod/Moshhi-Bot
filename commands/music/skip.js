const Commando = require('discord.js-commando');

class SkipCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			group: 'music',
			memberName: 'skip',
      description: 'Skip the current song playing',
      aliases: ['n'],
		});
	}

	async run(message) {
    const channel = message.member.voice.channel;
    if (!channel)return message.reply("You need to be in a voice channel to play music!");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.reply("There is nothing playing!");
    serverQueue.connection.dispatcher.end("Skipped the music");
	}
}

module.exports = SkipCommand;