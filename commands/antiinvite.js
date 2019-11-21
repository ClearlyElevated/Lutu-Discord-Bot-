const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class AntiInvite extends Command {
  constructor (client) {
    super(client, {
      name: "antiinvite",
      description: "Enable/Disable antiinvte filter.",
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
        if (settings.antiInvite === "on") return reply("<a:aRedTick:584866618039861249> Seems like anti-invte filter its already active.");

        settings.antiInvite = "on";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576> Anti-invte filter has been activated. You can ype \`${settings.prefix}antiinvite off\` to deactivate it.`);
      } else if (args[0].toLowerCase() === "off") {
        if (settings.antiInvite === "off") return reply("<a:aRedTick:584866618039861249> Seems like antiinvte filter its already deactiveactivated.");

        settings.antiInvite = "off";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576> Anti-invte filter has been deactivated. You can ype \`${settings.prefix}antiinvite on\` to activate it.`);
      } else if (args[0].toLowerCase() === "status") {
        var state;

        if (settings.antiInvite === "on") state = "activated";
        if (settings.antiInvite === "off") state = "deactivated";

        return reply(`Anti-invte filter its currently **${state}**.`);
      } else {
        return reply("<a:aRedTick:584866618039861249> Options available for this command are `on`, `off`, `status`.");
      }
    });
  }
}

module.exports = AntiInvite;