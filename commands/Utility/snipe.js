module.exports = {
  name: "snipes",
  description: "Sends the last messages deleted in the channel",

  async execute(message, args, cmd, client, Discord) {
    const snipes = client.snipes
      .filter((e) => e.channel.id === message.channel.id)
      .reverse();

    if (args[0] == "group") {
      nonPageEmbedSnipe(snipes, message);
    } else if (args[0] == "bulk") {
      if (snipes.length < 6) {
        nonPageEmbedSnipe(snipes, message);
      } else {
        const msgArr = [];
        snipes.forEach((msg) => {
          const endDate = new Date();
          const time = (endDate.getTime() - msg.date.getTime()) / 1000;
          msgArr.push(
            `\n━━━━━━━━━━━━━\\━\\━\\━━\\━\n<:bp_srarrow:909689391994253313>**${
              msg.author
            }** \u2500 *${secondsToDhms(time)} ago*\nContent: ${msg.content}`
          );
        });
        const desc = {};
        let k,
          j,
          temporary,
          p = 1;
        const chunk = 5;

        for (k = 0, j = msgArr.length; k < j; k += chunk) {
          temporary = msgArr.slice(k, k + chunk);
          desc[`${p}`] = new Discord.MessageEmbed()
            .setDescription(temporary.join(""))
            .setTitle(
              `**Last ${temporary.length} messages deleted in __${message.channel.name}__**`
            )
            .setFooter(`Bulk sniped by ${message.member.user.tag}`);
          p++;
        }

        const embeds = [];
        for (let i = 0; i < Object.keys(desc).length; i++) {
          embeds.push(desc[i + 1]);
        }
        require("../../functions/pagination").pagination({
          channel: message.channel,
          author: message.author,
          message: message,
          embeds: embeds,
          fastSkip: true,
          button: [
            {
              name: "first",
              emoji: "<:first:926437951385239563>",
              style: "PRIMARY",
            },
            {
              name: "previous",
              emoji: "<:previous:926443075302227998>",
              style: "PRIMARY",
            },
            {
              name: "next",
              emoji: "<:next:926442830480703548>",
              style: "PRIMARY",
            },
            {
              name: "last",
              emoji: "<:last:926437800436465664>",
              style: "PRIMARY",
            },
          ],
          time: 300000,
        });
      }
    } else {
      const embed = new Discord.MessageEmbed().setColor("BLURPLE");
      embed.setTimestamp();

      const msg = snipes[0];
      if (!snipes[0]) {
        embed.setTitle("There is nothing to snipe!");
        embed.setDescription("");
        return message.channel.send({ embeds: [embed] });
      }
      const endDate = new Date();
      const time = (endDate.getTime() - msg.date.getTime()) / 1000;
      const desc = `\n━━━━━━━━━━━━━━━━━━\n<:bp_srarrow:909689391994253313>**${
        msg.author
      }** \u2500 *${secondsToDhms(time)} ago*\nContent: ${msg.content}`;
      embed.setTitle(`**Message deleted in __${message.channel.name}__**`);
      embed.setFooter(
        `Sniped by ${message.member.user.tag} | BTW you can add 'bulk' or 'group' for more snipes messages (if any)`
      );
      embed.setDescription(desc);
      message.channel.send({ embeds: [embed] });
    }
  },
};

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function nonPageEmbedSnipe(snipes, message) {
  const Discord = require("discord.js");
  let i = 0;
  let desc = "";

  const embed = new Discord.MessageEmbed().setColor("BLURPLE");

  snipes.forEach((msg) => {
    if (i >= 5) return;
    const endDate = new Date();
    const time = (endDate.getTime() - msg.date.getTime()) / 1000;
    desc =
      desc +
      `\n━━━━━━━━━━━━━━━━━━\n<:bp_srarrow:909689391994253313>**${
        msg.author
      }** \u2500 *${secondsToDhms(time)} ago*\nContent: ${msg.content}`;
    i++;
  });

  if (i == 0) {
    embed.setTitle("There is nothing to snipe!");
  } else {
    if (i == 1) {
      embed.setTitle(`**Message deleted in __${message.channel.name}__**`);
      embed.setFooter(`Sniped by ${message.member.user.tag}`);
    } else {
      embed.setTitle(
        `**Last ${i} messages deleted in __${message.channel.name}__**`
      );
      embed.setFooter(`Bulk sniped by ${message.member.user.tag}`);
    }
    embed.setDescription(desc);
  }
  embed.setTimestamp();

  return message.channel.send({
    embeds: [embed],
  });
}
