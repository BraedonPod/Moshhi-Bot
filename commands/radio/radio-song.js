const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

class SongRadioCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'radiosong',
			group: 'radio',
			memberName: 'radiosong',
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
        console.log(data.main.np.trim().split(' - '));
        let songData = data.main.np.trim().split(' - ');
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setAuthor('Current Song')
          .setTitle(`${songData[1]}`)
          .addFields({ name: 'Artist', value: songData[0] },);
        message.reply(embed);
      } catch(err) {
        message.reply('Song name not available');
      }
    }
	}
}

module.exports = SongRadioCommand;