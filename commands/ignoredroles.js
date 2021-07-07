const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Settings = require("../models/settings.js");

class ignoredRoles extends Command {
  constructor (client) {
    super(client, {
      name: "ignoredroles",
      description: "Add or remove roles from ignore role list.",
      category: "Settings",
      usage: "<add/remove> <@role/id>",
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
        const role = message.mentions.roles.first() || message.guild.roles.get(args[1]);
        if (!role) return reply("<a:aRedTick:556121032507916290> You must specify a role to add.");
        settings.ignoredRoles.push(role.id);
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply(`<a:aGreenTick:556121203136528388> Added ${role} to automod ignored roles.`);
      } else if (option === "remove") {
        const role = message.mentions.roles.first() || message.guild.roles.get(args[1]) || args[1];
        if (!role) return reply("<a:aRedTick:556121032507916290> You must specify a role to remove.");

        const index = settings.ignoredRoles.findIndex(i => i === role.id);
        if (index < 0) return reply("<a:aRedTick:556121032507916290> Role not found on ignored role list.");
        
        settings.ignoredRoles.splice(index, 1);
        await settings.save().catch(e => this.client.logger.log(e, "error"));
        return reply("<a:aGreenTick:556121203136528388> Role has been removed from the ignored list.");
      } else {
        return reply("<a:aRedTick:556121032507916290> Valid options are `add` or `remove`.");
      }
    });
  }
}

module.exports = ignoredRoles;
