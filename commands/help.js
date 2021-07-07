const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Help extends Command {
  constructor (client) {
    super(client, {
      name: "help",
      description: "Learn how to use Lutu's commands.",
      category: "General",
      usage: "[category/alias]",
      enabled: true,
      guildOnly: false,
      aliases: ["halp"],
      permLevel: "User",
      cooldown: 5,
      args: false
    });
  }
async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
      if (!args[0]) {
        const emb = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setColor("#7289da")
          .addField("Moderation - `" + message.guild.settings.prefix + "help moderation`", `__Commands helping you moderate your server.__`)
          .addField("General - `" + message.guild.settings.prefix + "help general`", `__Commands any bot have.__`)
          .addField("Settings - `" + message.guild.settings.prefix + "help settings`", `__Commands help you set up your server.__`)
          .addField("Tools - `" + message.guild.settings.prefix + "help tools`", `__Useful tools__`)
          .addField("Ban List - `" + message.guild.settings.prefix + "help banlist`", `__Commands regarding ban list.__`)
	  .addField("Automod - `" + message.guild.settings.prefix + "help automod`", `__Automod cmds.__`)
          .addField("Tags - `" + message.guild.settings.prefix + "help tags`", `__Server custom commands__`)
        
        reply(emb);
     } else if (args[0].toLowerCase() === "moderation") {
       var cmds = this.client.commands.filter(c => c.help.category === "Moderation" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${cmds.join("\n")}\n\nInvite Lutu: https://bot.discord.io/lutubot`);
        reply(emb);
     } else if (args[0].toLowerCase() === "automod") {
       var cmds = this.client.commands.filter(c => c.help.category === "Automod" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${cmds.join("\n")}\n\n`);
        reply(emb);
     } else if (args[0].toLowerCase() === "general") {
       var cmds = this.client.commands.filter(c => c.help.category === "General" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${cmds.join("\n")}\n\nInvite Lutu: https://bot.discord.io/lutubot`);
        reply(emb);
     } else if (args[0].toLowerCase() === "settings") {
       var cmds = this.client.commands.filter(c => c.help.category === "Settings" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${cmds.join("\n")}\n\nInvite Lutu: https://bot.discord.io/lutubot`);
        reply(emb);
     } else if (args[0].toLowerCase() === "tools") {
       var cmds = this.client.commands.filter(c => c.help.category === "Tools" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)

       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${cmds.join("\n")}\n\nInvite Lutu: https://bot.discord.io/lutubot`);
        reply(emb);
     } else if (args[0].toLowerCase() === "banlist") {
       var cmds = this.client.commands.filter(c => c.help.category === "Ban List" && c.conf.enabled === true);
       cmds = cmds.map(cmd => `**${cmd.help.name.toProperCase()} - \`${message.guild.settings.prefix}${cmd.help.name}\`**\n${cmd.help.description}`)
       
       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${cmds.join("\n")}\n\nInvite Lutu: https://bot.discord.io/lutubot`);
        reply(emb);
     } else if (args[0].toLowerCase() === "tags") {
       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("RANDOM")
         .setDescription(`${message.guild.settings.tags.map(t => `${t.name}`).join(",") || "Use `" + message.guild.settings.prefix +"tags add` to add custom commands."}\n\n`);
       reply(emb);
     } else {
       const command = this.client.commands.get(args[0].toLowerCase());
       if (!command) return reply(`<a:aRedTick:556121032507916290> Command/Category/Alias not found.`);
       var enab = command.conf.enabled ? "Yes" : "No";
       var cperm = command.conf.permLevel;
       const emb = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL())
         .setColor("ff0000")
         .setDescription(`${command.help.name.toProperCase()} - Info\n**Name**: ${command.help.name}\n**Description**: ${command.help.description}\n**Category**: ${command.help.category}\n**Usage**: \`${message.guild.settings.prefix}${command.help.name} ${command.help.usage}\`\n**Cooldown**: ${command.conf.cooldown} Seconds\n**Minimum Rank**: ${command.conf.rank}\n**Enabled**: ${enab}\n**Permission Level**: ${cperm}\n\n`);
       reply(emb);
     }

  }
}

module.exports = Help;