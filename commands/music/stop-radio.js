const Commando = require('discord.js-commando');

class StopRadioCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'stopradio',
			group: 'music',
			memberName: 'stopradio',
			description: 'Stop listening to the radio',
		});
	}

	async run(message) {
    const { voice } = message.member

    if(!voice.channelID) return message.reply('You must be in a voice channel');
    if(voice.channelID !== message.guild.me.voice.channelID) {
			message.delete({ timeout: 1000 });
     return message.reply('You must be in the same voice channel as Moshhi!');
    } else {
			message.delete({ timeout: 1000 });
      message.guild.me.voice.channel.leave();
    }    
	}
}

module.exports = StopRadioCommand;