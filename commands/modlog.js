const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class ModLog extends Command {
  constructor (client) {
    super(client, {
      name: "modlog",
      description: "Sets server log channel.",
      category: "Settings",
      usage: "<#channel/reset>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Administrator",
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
        settings.logsChannel = "";
        await settings.save().catch(e => this.client.logger.log(e));
        return reply("<a:aGreenTick:556121203136528388> Moderation log channel has been reset on this server.");
      }

      const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]);
      if (!channel) return reply("<a:aRedTick:556121032507916290> You must specify a channel to send mod logs in.");

      const confirmation = await this.client.awaitReply(message, `Are you sure you want to send moderation logs in ${channel}? Type \`yes\` to porceed or \`no\` to abort.`);
      if (confirmation === false) return reply("<a:aRedTick:556121032507916290> Confirmation prompt timed out. ");
      if (confirmation.toLowerCase() !== "yes") return reply("<a:aRedTick:556121032507916290> Aborted.");

      settings.logsChannel = channel.id;
      await settings.save().catch(e => this.client.logger.log(e));
      return reply(`<a:aGreenTick:556121203136528388> Set ${channel} as the moderation log channel for this server.`);
    });
  }
}

module.exports = ModLog;
