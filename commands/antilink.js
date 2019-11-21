const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class AntiLink extends Command {
  constructor (client) {
    super(client, {
      name: "antilink",
      description: "Enable/Disable anti-link filter.",
      category: "Automod",
      usage: "<on/off/status>",
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

      if (args[0].toLowerCase() === "on") {
        if (settings.antiLinks === "on") return reply("<a:aRedTick:584866618039861249> Seems like anti-link filter its already active.");

        settings.antiLinks = "on";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576>Anti-link filter has been activated. You can ype \`${settings.prefix}antilink off\` to deactivate it.`);
      } else if (args[0].toLowerCase() === "off") {
        if (settings.antiLinks === "off") return reply("<a:aRedTick:584866618039861249> Seems like anti-link filter its already deactiveactivated.");

        settings.antiLinks = "off";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576> Anti-link filter has been deactivated. You can ype \`${settings.prefix}antilink on\` to activate it.`);
      } else if (args[0].toLowerCase() === "status") {
        var state;

        if (settings.antiLinks === "on") state = "activated";
        if (settings.antiLinks === "off") state = "deactivated";

        return reply(`Anti-link filter its currently **${state}**.`);
      } else {
        return reply("<a:aRedTick:584866618039861249> Options available for this command are `on`, `off`, `status`.");
      }
    });
  }
}

module.exports = AntiLink;