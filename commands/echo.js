const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
class Echo extends Command {
  constructor (client) {
    super(client, {
      name: "echo",
      description: "announce a message on a channel",
      category: "Tools",
      usage: "#channel <message>\nor echo <message>",
      enabled: true,
      guildOnly: true,
      aliases: ["talk","say","announce"],
      permLevel: "Bot Admin",
      args: true,
      rank: "user"
    });
  }

  async run (message) { // eslint-disable-line no-unused-vars
    message.channel.send("```DISCLAIMER, BY USING THIS FEATURE & BOT. YOU COMPLY & AGREE TO THE TOS. ABUSING THIS COMMAND, OR USING IT TO HIDE YOUR IDENTITY TO BREAK ANY OF DISCORD'S TOS WILL LEAD TO A BOTBAN!```");

    const messageArray = message.content.split(" ");
    let args = messageArray.slice(1);

    let channel = message.mentions.channels.first();
    if (!channel) {
      channel = message.channel;
      args = messageArray.slice(0);
    }
    const announcement = args.slice(1).join(" ");

    channel.send(announcement);
    message.delete();
  }
}

module.exports = Echo;
