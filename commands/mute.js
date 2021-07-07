const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const ms = require("ms");
const logHandler = require("../handlers/serverLogger.js");

class Mute extends Command {
  constructor (client) {
    super(client, {
      name: "mute",
      description: "Mutes the mentioned user.",
      category: "Moderation",
      usage: "<user> <duration> [reason]",
      enabled: true,
      guildOnly: true,
      aliases: ["curse", "tape"],
      permLevel: "Moderator",
      cooldown: 5,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const tomute = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!tomute) return reply("<a:aRedTick:584866618039861249> You haven't specified any user.");
    if (message.author.id === tomute.id) return reply("<a:aRedTick:584866618039861249> I cannot allow any self-harm.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return reply("<a:aRedTick:584866618039861249> Oops, looks like who you're trying to mute is a Moderator!");
    const mutetime = args[1];
    let reason = args.slice(2).join(" ");
    if (!reason) reason = "Not specified.";

    const muterole = message.guild.roles.find(c => c.name === "Muted");

    if (!muterole) return reply("<a:aRedTick:584866618039861249> The `Muted` role couldn't be found. Pleaae run `" + message.guild.settings.prefix + "setup mutedrole` to to fix that!");

    if (tomute.roles.has(muterole.id)) return reply("<a:aRedTick:584866618039861249> Oops! It looks like this user is already muted.");

    try {
      ms(ms(mutetime));
    } catch (err) {
      return reply("<a:aRedTick:584866618039861249> Please specify a valid mute duration.");
    }
    try {
      await(tomute.roles.add(muterole.id));
    } catch (e) {
      return reply(`<a:aRedTick:584866618039861249> , couldn't mute **${tomute.user.tag}** because ${e}.`);
    }
    if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
      const Logger = new logHandler({ client: this.client, case: "muteAdd", guild: message.guild.id, member: tomute.user, moderator: message.author, reason: reason, duration: ms(ms(mutetime)) });
      Logger.send().then(t => Logger.kill());
    }

    if (message.guild.settings.moderationLogChannel !== "") {
      const Logger3 = new logHandler({ client: this.client, case: "muteAdd", guild: message.guild.id, member: tomute.user, moderator: message.author, reason: reason, duration: ms(ms(mutetime)), modOption: true });
      Logger3.send().then(t => Logger3.kill());
    }

    reply(`<a:aGreenTick:584866617780076576> Muted **${tomute.user.tag}** for \`${ms(ms(mutetime))}\`.`);

    setTimeout(async () => {
      await tomute.roles.remove(muterole.id);
      if (message.guild.settings.moderationLogs.toLowerCase() === "on") {
        const Logger2 = new logHandler({ client: this.client, case: "muteRemove", guild: message.guild.id, member: tomute.user, moderator: message.author, reason: "Temporary Mute is complete." });
        Logger2.send().then(t => Logger2.kill());

        if (message.guild.settings.moderationLogChannel !== "") {
          const Logger4 = new logHandler({ client: this.client, case: "muteRemove", guild: message.guild.id, member: tomute.user, moderator: message.author, reason: "Temporary Mute is complete.", modOption: true });
          Logger4.send().then(t => Logger4.kill());
        }
        
      }
    }, ms(mutetime));

  }
}

module.exports = Mute;
