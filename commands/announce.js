const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Announce extends Command {
  constructor (client) {
    super(client, {
      name: "announce",
      description: "Make a custom embed.",
      category: "Tools",
      usage: "#channel <color>|<title>|<content>|<timestamp>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const channel = message.mentions.channels.first();
    if (!channel) return reply("<a:aRedTick:584866618039861249> You must mention a channel to send embed in!");
    args.shift();
    const [color, title, content, timestamp] = args.join(" ").split("|");

    if (!color) return reply("Invalid color/no color.");
    if (!title) return reply("Invalid title/no title.");
    if (!content) return reply("Invalid content/no content.");

    try {
      let embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(content);
      if (timestamp) embed.setTimestamp();

      channel.send(embed);
    } catch (e) {
      return reply(`An error occured when rendering the embed: \`${e}\``);
    }
  }
}
module.exports = Announce;
