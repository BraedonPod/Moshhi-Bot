const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const ytdl = require("ytdl-core");
const yts = require("yt-search");

class PlayCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Listen to music',
      aliases: ['p'],
    });
  }

  async run(message, args) {
    const { voice } = message.member;
    const channel = message.member.voice.channel;
    message.delete({ timeout: 2000 });
    if (!voice.channelID) {
      return message.reply('You must be in a voice channel');
    }

    if (!args) { return message.reply('you did not provide a song to play'); }

    let serverQueue = message.client.queue.get(message.guild.id);
    var searched = await yts.search(args);
    if (searched.videos.length === 0) { return message.reply("Looks like I was unable to find the song on YouTube"); }
    var songInfo = searched.videos[0]

    const song = {
      id: songInfo.videoId,
      title: songInfo.title,
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setThumbnail(song.img)
        .setColor("YELLOW")
        .addField("Name", song.title, true)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter(`Views: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true,
    };

    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        message.channel.send("There are no songs in the queue");
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        //Option fixed error 406 issue wtih current ytdl build
        .play(ytdl(song.url, {
          quality: 'highestaudio',
          highWaterMark: 1 << 25
        }))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
        .setAuthor("Started Playing Music!")
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Name", song.title, true)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return console.log('I could not join the voice channel');
    }
  }
}

module.exports = PlayCommand;