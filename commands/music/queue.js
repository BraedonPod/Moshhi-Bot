const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

class QueueCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			group: 'music',
			memberName: 'queue',
      description: 'Get a list of music in the queue',
      aliases: ['q'],
		});
	}

	async run(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    message.delete({ timeout: 1000 });
    if (!serverQueue) return message.channel.send("There is nothing playing in this server.");

    let queue = new MessageEmbed()
    .setAuthor("Server Songs Queue")
    .setColor("BLUE")
    .addField("Now Playing", serverQueue.songs[0].title, true)
    .addField("Text Channel", serverQueue.textChannel, true)
    .addField("Voice Channel", serverQueue.voiceChannel, true)
    .setDescription(serverQueue.songs.map((song) => {
      if(song === serverQueue.songs[0])return
      return `**-** ${song.title}`
    }).join("\n"))
    .setFooter("Currently Server Volume is "+serverQueue.volume)
    if(serverQueue.songs.length === 1)queue.setDescription(`No songs to play next add songs by \`\`${client.config.prefix}play <song_name>\`\``);
    message.channel.send(queue);
	}
}

module.exports = QueueCommand;