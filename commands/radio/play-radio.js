const Commando = require('discord.js-commando');

class PlayRadioCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'playradio',
			group: 'radio',
			memberName: 'playradio',
			description: 'Listen to anime radio',
		});
	}

	run = async (message) => {
    const { voice } = message.member
		if(!voice.channelID) {
			message.delete({ timeout: 1000 });
			return message.reply('You must be in a voice channel');
		}
    voice.channel.join()
      .then((connection) => {
				message.delete({ timeout: 1000 });
        connection.play('https://relay0.r-a-d.io/main.mp3');
      })
	}
}

module.exports = PlayRadioCommand;