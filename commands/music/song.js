const Commando = require('discord.js-commando');
const axios = require('axios');

class SongCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'song',
			group: 'music',
			memberName: 'song',
			description: 'Get the current song playing',
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
        message.delete({ timeout: 1000 });
        message.reply(`The current song playing is:\n ${data.main.np}`);

      } catch(err) {
        message.reply('Song name not available');
      }
    }

	}
}

module.exports = SongCommand;