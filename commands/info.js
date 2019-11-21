const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Info extends Command {
  constructor (client) {
    super(client, {
      name: "info",
      description: "See information About Lutu",
      category: "General",
      usage: "?info",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 2,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const infoEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle("`Lutu's Information`")
      .setDescription(`I'm lutu, one of best moderation bots out there, and the only one you need for your server, easy management tons of features and even new ones every week. I have easy to use built-in AutoMod and many more features to enhance security in your server.

- **Get in touch**:
Mention bot or type \`${message.guild ? message.guild.settings.prefix : "?"}help\` to get a list of commands.
Type \`${message.guild ? message.guild.settings.prefix : "?"}invite\` to join support server or invite bot.

- **Features**:
• Lockdown Features
• Automoderator (Anti-NSFW, Anti-Spam, AND MORE!
• Join/Auto Role (Beta)
• Web Dashboard (Coming Soon)
• Prevent Mallicious Users
• Server/User Tools
• Easy Setup!

- **Technologies Used**:
[Discord.Js - Discord Client v12.0.0-master](https://discord.js.org/#/docs/main/master/general/welcome)
[MongoDB - Database (Mongoose v5.4.19)](https://mongodb.com/)
[Express - Dashboard v4.16.4](https://expressjs.com/)
[Sightengine - Image Evaluator v1.3.1](https://sightengine.com/)
[Discord Bot List Api - DBL Webhooks v2.3.0](https://discordbots.org/api/docs)

> **__Staff Team__**:

**__ClearyElevated#5347__ __Bot Maintainer__**

Itz_Someone#1531 - **__Bot Admin__**

DeathHound#4983 - **__Bot Admin__**`);
    
reply(infoEmbed);
  }
}

module.exports = Info;
