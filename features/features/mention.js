module.exports = (client) => {

  client.on('message', message => {
    const target = message.mentions.users.first();
    const args = message.content.toLowerCase().trim().split(' ');

    if(target) {
      if(target.id === message.guild.me.id && args[0] === 'hey' || args[0] === 'hi' || args[0] === 'hola') {
        message.reply('Hola~');
      }
      if(target.id === message.guild.me.id && args.length === 1) {
        message.reply('What chu want want, meow?');
      }
    }
  });

}