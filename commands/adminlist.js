const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Adminlist extends Command {
  constructor (client) {
    super(client, {
      name: "admins",
      description: "List of all users in current guild with Admin Perms",
      category: "Tools",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false,
      rank: "Upvoter"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
	
    const AdminsList = message.guild.members.filter(member => { 
      return member.hasPermission("ADMINISTRATOR") && !member.user.bot;
    }).map(member => {
      return member.user.tag;
    });

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Server Administration Team`)
      .setDescription(`**${AdminsList.join("\n")}**`)
      .setTimestamp()
      .setColor(`RED`);
    message.channel.send(embed);

  
  }
}

module.exports = Adminlist;