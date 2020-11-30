require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class TestScrapeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'testscrape',
      group: 'testing',
      memberName: 'testscrape',
      description: 'Test scraping data',
    })
  }

  run = async (message) => {
    message.delete({ timeout: 500 });
    try {
      const { data } = await axios.get(process.env.SCRAPE_API);
      console.log(data);
    } catch (error) {
      
    }
    
  }
}