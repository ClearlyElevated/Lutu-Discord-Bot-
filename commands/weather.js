const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Weather extends Command {
  constructor (client) {
    super(client, {
      name: "weather",
      description: "gets the weather of somewhere!",
      category: "Tools",
      usage: "",
      enabled: false,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false,
      rank: "Upvoter"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars

    const apiKey = "7df80b2b7e1081c0951cf69c4fcd8fde";
    const fetch = require("node-fetch");
    const arg = message.content.split(" ").join(" ").slice(9);
    if (!arg) {
      return message.channel.send("**Please provide a city**");
    }
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + args + "&APPID=" + apiKey + "&units=imperial")
      .then(res => {
        return res.json();
      }).then(json => {
        if (json.main === undefined) {
          return message.channel.send(`Sorry, \`${args}\` was not found.\n**please check your input and try again**`);
        }
        const rise = json.sys.sunrise;
        const date = new Date(rise * 1000);
        const timestr = date.toLocaleTimeString();
        const set = json.sys.sunset;
        const setdate = new Date(set * 1000);
        const timesstr = setdate.toLocaleTimeString();
        const embed = new Discord.MessageEmbed()
          .setColor(RANDOM)
          .setTitle(`This is the weather for **${json.name}**`)
          .addField("Information:", `:thermometer:  **Temp:** \`${json.main.temp}C\`\n:cloud_tornado:  **Wind speed:** \`${json.wind.speed}m/s\`\n:fog:  **Humidity:** \`${json.main.humidity}%\`\n:sunny:  **Sunrise:** \`${timestr}\`\n:full_moon:  **Sunset:** \`${timesstr}\``);
        message.channel.send({embed})
          .catch(console.error);
      }).catch(err => {
        if (err) {
          message.channel.send("Sorry, something went wrong while checking the query!\nPlease try again.");
        }
      });
  
  
  }
}

module.exports = Weather;
