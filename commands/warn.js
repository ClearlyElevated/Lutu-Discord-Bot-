const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const Infractions = require("../models/infractions.js");
const databaseUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const logHandler = require("../handlers/serverLogger.js");
const warnReceiver = require("../handlers/warnings.js");

mongoose.connect(databaseUrl, {
  useNewUrlParser: true
});

class Warn extends Command {
  constructor (client) {
    super(client, {
      name: "warn",
      description: "Is any member misbehaving? Don't be shy! Shoot him a warn!",
      category: "Moderation",
      usage: "[amount of warnings] <user> [reason]",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "Moderator",
      cooldown: 5,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(args[1]);
    if (!user) return reply("<a:aRedTick:584866618039861249> You haven't specified a user!");
    // if (user.id === message.author.id) return reply("<a:aRedTick:556121032507916290> I can not allow self-harm. I mean why would you like to warn yourself..");
    let warnings = parseInt(args[0]);
    if (isNaN(warnings)) warnings = 1;
    const reason = args.slice(2).join(" ") || "[none specified]";

    Infractions.findOne({
      guildID: message.guild.id,
      userID: user.id
    }, async (err, u) => {
      if (err) this.client.logger.log("inf" + err, "error");
      if (!u) {
        const newUser = new Infractions({
          guildID: message.guild.id,
          userID: user.id,
          infractions: warnings
        });
        await newUser.save().catch(e => this.client.logger.log(e, "error"));
        if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
          const Logger = new logHandler({ client: this.client, case: "warnAdd", guild: message.guild.id, member: user.user, reason: reason, moderator: message.author, amount: warnings });
          Logger.send().then(t => Logger.kill());
        }

        if (message.guild.settings.moderationLogChannel !== "") {
          const Logger2 = new logHandler({ client: this.client, case: "warnAdd", guild: message.guild.id, member: user.user, reason: reason, moderator: message.author, amount: warnings, modOption: true });
          Logger2.send().then(t => Logger2.kill());
        }

        await warnReceiver.emit(this.client, user, message.member, message.guild);
        reply(`<a:aGreenTick:584866617780076576> Gave \`${warnings}\` infractions to **${user.user.tag}**.`);
        return undefined;
      }
      u.infractions = u.infractions + warnings;
      await u.save().catch(e => console.log(e));
      if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
        const Logger = new logHandler({ client: this.client, case: "warnAdd", guild: message.guild.id, member: user.user, reason: reason, moderator: message.author, amount: warnings });
        Logger.send().then(t => Logger.kill());
      }

      if (message.guild.settings.moderationLogChannel !== "") {
        const Logger2 = new logHandler({ client: this.client, case: "warnAdd", guild: message.guild.id, member: user.user, reason: reason, moderator: message.author, amount: warnings, modOption: true });
        Logger2.send().then(t => Logger2.kill());
      }
      await warnReceiver.emit(this.client, user, message.member, message.guild);
      reply(`<a:aGreenTick:584866617780076576> Gave \`${warnings}\` infractions to **${user.user.tag}**.`);
    });
  }
}

module.exports = Warn;
