module.exports = {
  name: "botinfo",
  aliases: ["bi"],
  description: "Check info about the bot",
  async execute(message, args, cmd, client) {
    const prettyMilliseconds = require("pretty-ms");
    const { MessageEmbed, version: djsversion } = require("discord.js");
    const { pagination } = require("../../functions/pagination");
    const version = require("../../package.json").version;
    const { utc } = require("moment");
    const os = require("os");
    const ms = require("ms");
    const uptime = prettyMilliseconds(ms(`${process.uptime().toFixed(2)}sec`), {
      verbose: true,
    });
    const core = os.cpus()[0];

    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || client.color)
      .setTitle("Bot Info and stats")
      .setDescription(
        `Jarvy is a multipurpose bot packed with utility, fun, imgen, games and many more commands.\n\n**<:jarvy_rarrowpurple:892715864158261259>Client Name:** ${
          client.user.tag
        } \`[${
          client.user.id
        }]\`\n**<:jarvy_rarrowpurple:892715864158261259>Creation Date**: ${utc(
          client.user.createdTimestamp
        ).format(
          "Do MMMM YYYY HH:mm:ss"
        )}\n<:jarvy_rarrowpurple:892715864158261259>**Developers:**\n[lightninbolt986#3111](https://discordapp.com/users/543031298130837510)\n[Senpai#2473](https://discordapp.com/users/654639494481313792)`
      )
      .setColor(13208319);
    const embed1 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || client.color)
      .setTitle("General")
      .addFields(
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Commands",
          value: `\`\`\`\n${client.commands.size}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Servers",
          value: `\`\`\`\n${client.guilds.cache.size.toLocaleString()}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Users",
          value: `\`\`\`\n${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString()}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Channels",
          value: `\`\`\`\n${client.channels.cache.size.toLocaleString()}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Uptime",
          value: `\`\`\`\n${uptime}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Ping",
          value: `\`\`\`\n${Math.round(message.client.ws.ping)} ms\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Node.js",
          value: `\`\`\`\n${process.version}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Version",
          value: `\`\`\`\n${version}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Discord.js",
          value: `\`\`\`\n${djsversion}\n\`\`\``,
          inline: true,
        }
      )
      .setColor(13208319);
    const embed2 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || client.color)
      .setTitle("System")
      .addFields(
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Platform",
          value: `\`\`\`\n${process.platform}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>Uptime",
          value: `\`\`\`\n${prettyMilliseconds(os.uptime() * 1000, {
            verbose: true,
          })}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>CPU cores",
          value: `\`\`\`\n${os.cpus().length}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>CPU RAM",
          value: `\`\`\`\n${(os.freemem() / 1000000000).toFixed(2)}GB\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>CPU model",
          value: `\`\`\`\n${core.model}\n\`\`\``,
          inline: true,
        },
        {
          name: "<:jarvy_rarrowpurple:892715864158261259>CPU speed",
          value: `\`\`\`\n${core.speed}MHz\n\`\`\``,
          inline: true,
        }
      )
      .setColor(13208319);

    pagination({
      channel: message.channel,
      author: message.author,
      message: message,
      embeds: [embed, embed1, embed2],
      fastSkip: true,
      button: [
        {
          name: "first",
          emoji: "<:dlarrow:926431786089734214>",
          style: "PRIMARY",
        },
        {
          name: "previous",
          emoji: "<:larrow:926431699573817354>",
          style: "PRIMARY",
        },
        {
          name: "next",
          emoji: "<:rarrow:926431866733608990>",
          style: "PRIMARY",
        },
        {
          name: "last",
          emoji: "<:drarrow:926431932869378139>",
          style: "PRIMARY",
        },
      ],
      time: 300000,
    });
  },
};
