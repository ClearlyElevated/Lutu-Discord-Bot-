const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const fs = require("fs");

class BotBan extends Command {
  constructor (client) {
    super(client, {
      name: "botban",
      description: "Bans a user from bot.",
      category: "Bot Admin",
      usage: "<user id>",
      enabled: true,
      guildOnly: false,
      aliases: ["bb"],
      permLevel: "Bot Admin",
      cooldown: 240,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const id = args[0];
    var currentBans = await fs.readFileSync("botbans.json", "utf8");
    currentBans = JSON.parse(currentBans);
    currentBans.push(id);
    fs.writeFileSync("botbans.json", JSON.stringify(currentBans, null, 2));
    reply("**__Success!__ User has been __globally banned__ from using lutu**");
  }
}

module.exports = BotBan;
