const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class ignoredChannels extends Command {
  constructor (client) {
    super(client, {
      name: "ignoredchannels",
      description: "Add or remove channels from ignore channel list.",
      category: "Settings",
      usage: "<add/remove> <#channel/id>",
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
      if (err) this.client.logger.log(err);
      const option = args[0].toLowerCase();

      if (option === "add") {
        const channel = message.mentions.channels.first() || message.guild.channels.get(args[1]);
        if (!channel) return reply("<a:aRedTick:556121032507916290> You must specify a channel to add.");
        settings.ignoredChannels.push(channel.id);
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:556121203136528388> Added ${channel} to automod ignored channels.`);
      } else if (option === "remove") {
        const channel = message.mentions.channels.first() || message.guild.channels.get(args[1]) || args[1];
        if (!channel) return reply("<a:aRedTick:556121032507916290> You must specify a channel to remove.");

        const index = settings.ignoredChannels.findIndex(i => i === channel.id);
        if (index < 0) return reply("<a:aRedTick:556121032507916290> Channel not found on ignored channel list.");
        
        settings.ignoredChannels.splice(index, 1);
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply("<a:aGreenTick:556121203136528388> Channel has been removed from the ignored list.");
      } else {
        return reply("<a:aRedTick:556121032507916290> Valid options are `add` or `remove`.");
      }
    });
  }
}

module.exports = ignoredChannels;
