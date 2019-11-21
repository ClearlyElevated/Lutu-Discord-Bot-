const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class AdminRole extends Command {
  constructor (client) {
    super(client, {
      name: "adminrole",
      description: "Sets admnistrator role for your server.",
      category: "Settings",
      usage: "<@role/reset>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Server Owner",
      cooldown: 5,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    Settings.findOne({
      guildID: message.guild.id
    }, async (err, settings) => {
      if (err) this.client.logger.log(err, "error");

      if (args[0].toLowerCase() === "reset") {
        settings.adminRole = "";
        await settings.save().catch(e => this.client.logger.log(e));
        return reply("<a:aGreenTick:584866617780076576> Administrator role has been reset on this server.");
      }

      const role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
      if (!role) return reply("<a:aRedTick:584866618039861249>You must specify a role to be marked as admnistrator role.");

      const confirmation = await this.client.awaitReply(message, `Are you sure you want to set the administrator role as ${role}? Type \`yes\` to porceed or \`no\` to abort.`);
      if (confirmation === false) return reply("<a:aRedTick:584866618039861249> Confirmation prompt timed out. ");
      if (confirmation.toLowerCase() !== "yes") return reply("<a:aRedTick:584866618039861249> Aborted.");

      settings.adminRole = role.id;
      await settings.save().catch(e => this.client.logger.log(e));
      return reply(`<a:aGreenTick:584866617780076576> Set ${role} as the administrator role for this server.`);
    });
  }
}

module.exports = AdminRole;
