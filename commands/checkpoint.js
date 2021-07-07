const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class Checkpoint extends Command {
  constructor (client) {
    super(client, {
      name: "checkpoint",
      description: "Edit checkpoint settings for your server.",
      category: "Settings",
      usage: "<on/off/mode/channel> <warn/ban/#channel>",
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
      const option = args[0].toLowerCase();

      if (option === "on") {
        if (settings.checkpoint === "on") return reply("<a:aRedTick:584866618039861249> Seems like checkpoint is already enabled.");
        settings.checkpoint = "on";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply("<a:aGreenTick:584866617780076576> Enabled checkpoint for this channel.");
      } else if (option === "off") {
        if (settings.checkpoint === "off") return reply("<a:aRedTick:584866618039861249> Seems like checkpoint is already disabled.");
        settings.checkpoint = "off";
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply("<a:aGreenTick:584866617780076576> Enabled checkpoint for this channel.");
      } else if (option === "mode") {
        let mode = args[1];
        if (!mode) return reply("<a:aRedTick:556121032507916290> Valid checkpoint modes are `warn`, `ban` or `reset`.");
        mode = mode.toLowerCase();

        if (mode === "warn") {
          settings.checkpoint_mode = "warn";
        } else  if (mode === "ban") {
          settings.checkpoint_mode = "ban";
        } else if (mode === "reset") {
          settings.checkpoint_mode = "NONE";
        } else {
          return reply("<a:aRedTick:584866618039861249> Valid checkpoint modes are `warn`, `ban` or `reset`.");
        }

        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:584866617780076576> Sucessfully set checkpoint mode to **${mode}**.`);
      } else if (option === "channel") {
        if (args[1] && args[1].toLowerCase() === "reset") {
          settings.checkpoint_logChannel = "none";
          await settings.save().catch(e => this.client.logger.log(e, "error"));
          return message.channel.send("<a:aGreenTick:584866617780076576> Sucessfully reset checkpoint log chnanels.");
        } else {
          const channel = message.mentions.channels.first() || message.guild.channels.get(args[1]);
          if (!channel) return reply("<a:aRedTick:584866618039861249> You must specify a channel.");
          settings.checkpoint_logChannel = channel.id;
          await settings.save().catch(e => this.client.logger.log(e, "error"));
          return message.channel.send(`<a:aGreenTick:584866617780076576> Sucessfully set ${channel} as checkpoint log chnanels.`);
        }
      } else {
        return reply("<a:aRedTick:584866618039861249> The valid options are `on`, `off`, `mode`, `channel`.");
      }
    });
  }
}

module.exports = Checkpoint;
