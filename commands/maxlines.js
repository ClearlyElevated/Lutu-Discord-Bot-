const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class MaxLines extends Command {
  constructor (client) {
    super(client, {
      name: "maxlines",
      description: "Enable/Disable maxlines filter.",
      category: "Automod",
      usage: "<max lines/off/status>",
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

      if (!isNaN(parseInt(args[0]))) {
        const amt = parseInt(args[0]);

        if (amt < 3) return reply("<a:aRedTick:556121032507916290> Max-lines amount must be bigger than 3.");

        settings.maxLines = amt;
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:556121203136528388> Amount of max lines in this server has been set to **${amt}**.`);
      } else if (args[0].toLowerCase() === "off") {
        if (settings.maxLines === 0) return reply("<a:aRedTick:556121032507916290> Seems like max-lines filter its already deactivated.");

        settings.maxLines = 0;
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply("<a:aGreenTick:556121203136528388> Max-lines filter has been deactivated for this server.");
      } else if (args[0].toLowerCase() === "status") {
        var state;

        if (settings.maxLines > 0) state = "activated";
        if (settings.maxLines === 0) state = "deactivated";

        if (state === "deactivated") return reply(`Max lines filter its currently **${state}**.`);
        return reply(`Max lines filter its currently **${state}**, amount of max lines is **${settings.maxLines}**.`);
      } else {
        return reply("<a:aRedTick:556121032507916290> Options available for this command are `on`, `off`, `status`.");
      }
    });
  }
}

module.exports = MaxLines;
