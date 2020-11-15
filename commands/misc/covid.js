const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando');
const axios = require('axios');

class CovidCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'covid',
			group: 'misc',
			memberName: 'covid',
			description: 'Displays stats about covid  ex: !covid all or !covid canada',
		});
	}

	async run(message, args) {
    let url;
    let results;

    if(!args) return message.reply('Please specify which stats you want');
    if(args === 'all') {url = 'https://api.covid19api.com/summary';}
    else {url = `https://covid19.mathdro.id/api/countries/${args}`}

    try {
      const { data } = await axios.get(url);
      results = data;
    } catch(err) {
      if(err.response.status === 404) return message.reply(`${args} is not a valid country.`);
    }

    if(args === 'all') {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Global')
        .setDescription('Covid stats worldwide')
        .addFields(
          { name: 'Confirmed', value: results.Global.TotalConfirmed.toLocaleString(), inline: true },
          { name: 'Recovered', value: results.Global.TotalRecovered.toLocaleString(), inline: true },
          { name: 'Deaths', value: results.Global.TotalDeaths.toLocaleString(), inline: true },
        )
        .setFooter(`Last Updated ${results.Countries[0].Date}`);
      message.channel.send(embed);
    } else {
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${args}`)
          .setDescription(`Covid stats for ${args}`)
          .addFields(
            { name: 'Confirmed', value: results.confirmed.value.toLocaleString(), inline: true },
            { name: 'Recovered', value: results.recovered.value.toLocaleString(), inline: true },
            { name: 'Deaths', value: results.deaths.value.toLocaleString(), inline: true },
          )
          .setFooter(`Last Updated ${results.lastUpdate}`);
        message.channel.send(embed);
    }
	}
}

module.exports = CovidCommand;