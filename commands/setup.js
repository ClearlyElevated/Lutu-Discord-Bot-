const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Forget extends Command {
  constructor (client) {
    super(client, {
      name: "setup",
      description: "Sets up the bot.",
      category: "Settings",
      usage: "mutedrole",
      enabled: false,
      guildOnly: true,
      aliases: [],
      permLevel: "Administrator",
      cooldown: 5,
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    if (!args[0]) return reply("Correct usage : `setup mutedrole`.");
    if (args[0].toLowerCase() === "mutedrole") {
      let mutedRole = message.guild.roles.find(r => r.name === "Muted");
      if (mutedRole) {
        const ms = await reply("The 'Muted' role already exists. Do you want to overwrite its permissions and make it Lutu's 'Muted' role?\n\n<a:aGreenTick:584866617780076576> - Yes\n<a:aRedTick:584866618039861249> - No");
        await ms.react("556120813481361408");
        await ms.react("557295354471514163");
        const collected = await ms.awaitReactions((reaction, user) => user.id === message.author.id, {max: 1, time: 60000, errors: ["time"] });
        const res = collected.first().emoji.name;

        if (res === "redTick") {
          ms.delete();
        } else if (res === "greenTick") {
          await ms.edit(`<a:Loader:584866618023084062> Starting setup...
<a:Loader:584866618023084062>Initializing Role
<a:Loader:584866618023084062> Setting Permissions for Categories
<a:Loader:584866618023084062> Setting Permissions for Text Channels
<a:Loader:584866618023084062> Setting Permissions for Voice Channels
          `);

          await ms.edit(`<a:aGreenTick:584866617780076576> Setup started!
<a:Loader:584866618023084062> Initializing Role...
<a:Loader:584866618023084062> Setting Permissions for Categories
<a:Loader:584866618023084062> Setting Permissions for Text Channels
<a:Loader:584866618023084062> Setting Permissions for Voice Channels
          `);

          try {
            await mutedRole.setPermissions(0);
          } catch (e) {
            return ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aRedTick:584866618039861249> Initializing Role Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Categories Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Text Channels Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Voice Channels Failed! Missing permissions!
            `);
          }

          await ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aGreenTick:584866617780076576> Role initialized!
<a:Loader:584866618023084062> Setting Permissions for Categories
<a:Loader:584866618023084062> Setting Permissions for Text Channels
<a:Loader:584866618023084062> Setting Permissions for Voice Channels
          `);

          try {
            message.guild.channels.forEach(async (channel, id) => { // eslint-disable-line
              await channel.overwritePermissions(mutedRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          } catch (e) {
            return ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aRedTick:584866618039861249> Initializing Role Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Categories Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Text Channels Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Voice Channels Failed! Missing permissions!
            `);
          }

          await ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aGreenTick:584866617780076576> Role initialized!
<a:aGreenTick:584866617780076576> Permissions for Categories have been set!
<a:aGreenTick:584866617780076576> Permissions for Text Channels have been set!
<a:aGreenTick:584866617780076576> Permissions for Voice Channels have been set!

<a:aGreenTick:584866617780076576> 'Muted' role is ready!
          `);


        } else {
          return reply("<a:aRedTick:584866618039861249> Invalid choice or prompt, timed out. Aborted.");
        }
      } else {
        try {
          const ms = await reply("Unpacking setup of 'Muted' role.");

          await ms.edit(`<a:Loader:584866618023084062> Initializing setup...
<a:Loader:584866618023084062> Initializing Role
<a:Loader:584866618023084062> Setting Permissions for Categoris
<a:Loader:584866618023084062> Setting Permissions for Text Channels
<a:Loader:584866618023084062> Setting Permissions for Voice Channels
          `);

          await ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:Loader:584866618023084062> Initializing Role...
<a:Loader:584866618023084062> Setting Permissions for Categories
<a:Loader:584866618023084062> Setting Permissions for Text Channels
<a:Loader:584866618023084062> Setting Permissions for Voice Channels
          `);

          try {
            mutedRole = await message.guild.roles.create({
              data: {
                name: "Muted",
                color: "#000001",
                permissions: []
              }

            });
          } catch (e) {
            return ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aRedTick:584866618039861249> Initializing Role Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Categories Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Text Channels Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Voice Channels Failed! Missing permissions!
            `);
          }

          await ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aGreenTick:584866617780076576> Role initialized!
<a:Loader:584866618023084062> Setting Permissions for Categories
<a:Loader:584866618023084062> Setting Permissions for Text Channels
<a:Loader:584866618023084062> Setting Permissions for Voice Channels
          `);

          try {
            message.guild.channels.forEach(async (channel, id) => { // eslint-disable-line
              await channel.overwritePermissions(mutedRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          } catch (e) {
            return ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aRedTick:584866618039861249> Initializing Role Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Categories Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Text Channels Failed! Missing permissions!
<a:aRedTick:584866618039861249> Setting Permissions for Voice Channels Failed! Missing permissions!
            `);
          }

          await ms.edit(`<a:aGreenTick:584866617780076576> Setup initialized!
<a:aGreenTick:584866617780076576> Role initialized!
<a:aGreenTick:584866617780076576> Permissions for Categories have been set!
<a:aGreenTick:584866617780076576> Permissions for Text Channels have been set!
<a:aGreenTick:584866617780076576> Permissions for Voice Channels have been set!

<a:aGreenTick:584866617780076576> The 'Muted' role is now ready!
          `);
        } catch (e) {
          console.log(e.stack);
        }
      }
    } else {
      return reply("Only available options for this commands are: `mutedrole`.");
    }
  }
}

module.exports = Forget;
