module.exports = {
  name: "rolelist",
  aliases: ["getroles", "rl", "gr"],
  description: "Shows the list of emojis in the server",
  async execute(message, args, cmd, client, Discord) {
    const { pagination } = require("../../functions/pagination");
    const Roles = [];
    const embed = {};
    const embedslist = [];
    message.guild.roles.cache.forEach((role) => {
      if (role.name.startsWith("@everyone")) return;
      Roles.push(`\`${role.id}\` - <@&${role.id}> \`[${role.members.size}]\``);
    });
    let i, j, temporary;
    const chunk = 25;
    for (i = 0, j = Roles.length; i < j; i += chunk) {
      temporary = Roles.slice(i, i + chunk);
      embed[`${i / 25}`] = new Discord.MessageEmbed()
        .setAuthor(
          `Roles in ${message.guild.name}`,
          `${message.guild.iconURL({ dynamic: true })}`
        )
        .setDescription(`${temporary.join("\n")}`)
        .setColor("#a8f1ff")
        .setFooter(`Overall roles [${Roles.length}]`);
    }
    for (i = 0; i < Object.keys(embed).length; i++) {
      embedslist.push(embed[i]);
    }
    if (embedslist.length < 1)
      return message.channel.send("no roles in this server lol");
    pagination({
      channel: message.channel,
      author: message.author,
      message: message,
      embeds: embedslist,
      fastSkip: true,
      button: [
        {
          name: "first",
          emoji: "<:bp_dlarrow:918356485065564181>",
          style: "PRIMARY",
        },
        {
          name: "previous",
          emoji: "<:bp_larrow:909009049104814100>",
          style: "PRIMARY",
        },
        {
          name: "next",
          emoji: "<:bp_rarrow:909009732243693619>",
          style: "PRIMARY",
        },
        {
          name: "last",
          emoji: "<:bp_drarrow:918356561804554310>",
          style: "PRIMARY",
        },
      ],
      time: 300000,
    });
  },
};
