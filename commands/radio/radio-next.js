const Commando = require('discord.js-commando');
const axios = require('axios');

class SongCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'radionext',
			group: 'radio',
			memberName: 'radionext',
			description: 'Get the next song in the queue',
		});
	}

	async run(message) {
    const { voice } = message.member

    if(!voice.channelID) return message.reply('You must be in a voice channel');
    if(voice.channelID !== message.guild.me.voice.channelID) {
      return message.reply('You must be in the same voice channel as Moshhi!');
    } else {
      try {
        const { data } = await axios.get('https://r-a-d.io/api');
        message.reply(`The next song in the queue is:\n ${data.main.queue[0].meta}`);
      } catch(err) {
        message.reply('Next song name not available');
      }
    }
	}
}

module.exports = SongCommand;