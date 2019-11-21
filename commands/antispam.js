const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class AntiSpam extends Command {
  constructor (client) {
    super(client, {
      name: "antispam",
      description: "Enable/Disable anti-spam filter.",
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
        if (settings.antiSpam === "on") return reply("<a:aRedTick:556121032507916290> Seems like anti-spam filter its already active.");

        settings.antiSpam = "on";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:556121203136528388> Anti-spam filter has been activated. You can ype \`${settings.prefix}antispam off\` to deactivate it.`);
      } else if (args[0].toLowerCase() === "off") {
        if (settings.antiSpam === "off") return reply("<a:aRedTick:556121032507916290> Seems like anti-spam filter its already deactiveactivated.");

        settings.antiSpam = "off";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:556121203136528388> Anti-spam filter has been deactivated. You can ype \`${settings.prefix}antispam on\` to activate it.`);
      } else if (args[0].toLowerCase() === "status") {
        var state;

        if (settings.antiSpam === "on") state = "activated";
        if (settings.antiSpam === "off") state = "deactivated";

        return reply(`Anti-spam filter its currently **${state}**.`);
      } else {
        return reply("<a:aRedTick:556121032507916290> Options available for this command are `on`, `off`, `status`.");
      }
    });
  }
}

module.exports = AntiSpam;