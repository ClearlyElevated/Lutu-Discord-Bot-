const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class ModRole extends Command {
  constructor (client) {
    super(client, {
      name: "modrole",
      description: "Sets moderator role for your server.",
      category: "Settings",
      usage: "<@role/reset>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Administrator",
      cooldown: 10,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    Settings.findOne({
      guildID: message.guild.id
    }, async (err, settings) => {
      if (err) this.client.logger.log(err, "error");

      if (args[0].toLowerCase() === "reset") {
        settings.modRole = "";
        await settings.save().catch(e => this.client.logger.log(e));
        return reply("<a:aGreenTick:556121203136528388> Moderator role has been reset on this server.");
      }

      const role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
      if (!role) return reply("<a:aRedTick:556121032507916290> You must specify a role to be marked as moderator role.");

      const confirmation = await this.client.awaitReply(message, `Are you sure you want to set the moderator role as ${role}? Type \`yes\` to porceed or \`no\` to abort.`);
      if (confirmation === false) return reply("<a:aRedTick:556121032507916290> Confirmation prompt timed out. ");
      if (confirmation.toLowerCase() !== "yes") return reply("<a:aRedTick:556121032507916290> Aborted.");

      settings.modRole = role.id;
      await settings.save().catch(e => this.client.logger.log(e));
      return reply(`<a:aGreenTick:556121203136528388> Set ${role} as the moderator role for this server.`);
    });
  }
}

module.exports = ModRole;
