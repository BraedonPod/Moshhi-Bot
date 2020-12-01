const Commando = require('discord.js-commando');

class StopCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'music',
			memberName: 'stop',
      description: 'Stop the music',
      aliases: ['s'],
		});
	}

	run = async (message) => {
		const channel = message.member.voice.channel
		message.delete({ timeout: 1000 });
    if (!channel)return message.reply("I'm sorry but you need to be in a voice channel to play music!");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.reply("There is nothing playing that I could stop for you.");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop the music");
	}
}

module.exports = StopCommand;