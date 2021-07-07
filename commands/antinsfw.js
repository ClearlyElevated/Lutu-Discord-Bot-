const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class AntiNsfw extends Command {
  constructor (client) {
    super(client, {
      name: "antinsfw",
      description: "Enable/Disable anti-nsfw filter.",
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
        if (settings.nsfwDetection === "on") return reply("<a:aRedTick:584866618039861249> Seems like anti-nsfw filter its already active.");

        settings.nsfwDetection = "on";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576>Anti-nsfw filter has been activated. You can ype \`${settings.prefix}antinsfw off\` to deactivate it.`);
      } else if (args[0].toLowerCase() === "off") {
        if (settings.nsfwDetection === "off") return reply("<a:aRedTick:584866618039861249> Seems like anti-nsfw filter its already deactiveactivated.");

        settings.nsfwDetection = "off";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576>Anti-nsfw filter has been deactivated. You can ype \`${settings.prefix}antinsfw on\` to activate it.`);
      } else if (args[0].toLowerCase() === "status") {
        var state;

        if (settings.nsfwDetection === "on") state = "activated";
        if (settings.nsfwDetection === "off") state = "deactivated";

        return reply(`Anti-nsfw filter its currently **${state}**.`);
      } else {
        return reply("<a:aRedTick:584866618039861249> Options available for this command are `on`, `off`, `status`.");
      }
    });
  }
}

module.exports = AntiNsfw;