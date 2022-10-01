module.exports = {
  name: "findemoji",
  aliases: ["fe"],
  description: "Find a emoji on [emoji.gg](https://emoji.gg)",
  async execute(message, args, cmd, client, Discord) {
    const {
      MessageActionRow,
      MessageButton,
      MessageEmbed,
    } = require("discord.js");
    const fetch = require("node-fetch");
    const late = new Discord.MessageEmbed()
      .setDescription(
        "<:neo_cross:877535678597050398> You took too long to choose a reaction. ||Loser||"
      )
      .setColor("#f4a1ff");

    let emojis = await fetch("https://emoji.gg/api/").then((res) => res.json());
    const q = args.join(" ").toLowerCase().trim().split(" ").join("_");
    let matches = emojis.filter((s) => s.title == q || s.title.includes(q));

    const noResult = new Discord.MessageEmbed()
      .setDescription(
        `<:neo_cross:877535678597050398> No Results found for ${args.join(" ")}`
      )
      .setColor("#f4a1ff");

    if (!matches.length) return message.channel.send({ embeds: [noResult] });
    let page = 0;

    const findurl = "https://discordemoji.com/emoji/" + matches[page].slug;
    const match = matches[page].title;
    const emo1 = {
      wholething: "<:neox_leftarrow:877767124544782368>",
      name: `neox_leftarrow`,
      id: `877767124544782368`,
    };
    const emo2 = {
      wholething: "<:neox_rightarrow:877765155230994482>",
      name: `neox_rightarrow`,
      id: `877765155230994482`,
    };
    const emo3 = {
      wholething: "<:neox_plus:877767309891084308>",
      name: `neox_plus`,
      id: `877767309891084308`,
    };
    const emo4 = {
      wholething: "<:neox_cross:877767362458304543>",
      name: `neox_cross`,
      id: `877767362458304543`,
    };
    const btn1 = new MessageButton()
      .setEmoji(emo1.id)
      .setCustomId(emo1.name)
      .setDisabled(false)
      .setStyle("SECONDARY");
    const btn2 = new MessageButton()
      .setEmoji(emo2.id)
      .setCustomId(emo2.name)
      .setDisabled(false)
      .setStyle("SECONDARY");
    const btn3 = new MessageButton()
      .setEmoji(emo3.id)
      .setCustomId(emo3.name)
      .setDisabled(false)
      .setStyle("SECONDARY");
    const btn4 = new MessageButton()
      .setEmoji(emo4.id)
      .setCustomId(emo4.name)
      .setDisabled(false)
      .setStyle("SECONDARY");
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `**<a:neo_greentick:876391533920813086> Emoji results for ${args
          .slice(1)
          .join(
            " "
          )}**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${match}\`\n<:neo_replyblue:876339294611050576> Emoji Link: [Click Here](${findurl})`
      )
      .setColor("#a8f1ff")
      .setImage(matches[page].image)
      .setFooter(`Emoji ${page + 1}/${matches.length}`);
    const row = new MessageActionRow().addComponents([btn1, btn2, btn3, btn4]);

    const msg = await message.reply({ embeds: [embed], components: [row] });

    /*  emojis = ['⬅️', '➡️', '✅', '❌'];
            msg.react(emo1.id);
            msg.react(emo2.id);
            msg.react(emo3.id);
            msg.react(emo4.id);*/

    let doing = true;
    const collector = msg.createMessageComponentCollector({
      time: 60000,
    });
    collector.on("collect", async (i) => {
      if (!i.user.id === i.user.id) {
        return i.reply({
          content: `These buttons aren't for you!`,
          ephemeral: true,
        });
      } else if (i.customId == emo1.name) {
        page--;
        if (!matches[page]) {
          page++;
        } else {
          const findurl =
            "https://discordemoji.com/emoji/" + matches[page].slug;
          const match = matches[page].title;
          const newembed = new Discord.MessageEmbed()

            .setDescription(
              `**<a:neo_greentick:876391533920813086> Emoji results for ${args.join(
                " "
              )}**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${match}\`\n<:neo_replyblue:876339294611050576> Emoji Link: [Click Here](${findurl})`
            )
            .setColor("#a8f1ff")
            .setImage(matches[page].image)
            .setFooter(`Emoji ${page + 1}/${matches.length}`);
          i.update({ embeds: [newembed], components: [row] });
        }
      } else if (i.customId == emo2.name) {
        page++;
        if (!matches[page]) {
          page--;
        } else {
          const findurl =
            "https://discordemoji.com/emoji/" + matches[page].slug;
          const match = matches[page].title;
          const newembed = new Discord.MessageEmbed()
            .setDescription(
              `**<a:neo_greentick:876391533920813086> Emoji results for ${args
                .slice(1)
                .join(
                  " "
                )}**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${match}\`\n<:neo_replyblue:876339294611050576> Emoji Link: [Click Here](${findurl})`
            )
            .setColor("#a8f1ff")
            .setImage(matches[page].image)
            .setFooter(`Emoji ${page + 1}/${matches.length}`);

          i.update({ embeds: [newembed], components: [row] });
        }
      } else if (i.customId == emo3.name) {
        const res = matches[page];
        let created;

        try {
          created = await message.guild.emojis.create(res.image, res.title);
        } catch {
          i.reply(
            `<:neo_cross:877535678597050398> Unable to add ${res.title}.`
          );

          return (doing = false);
        }
        const stealembed = new Discord.MessageEmbed()
          .setColor("#a8f1ff")
          .setDescription(
            `<a:neo_greentick:876391533920813086> **Successfully Added!**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${created.name}\`\n<:neo_replycontblue:876339530708426754> Emoji link: [Click here](${created.url})\n<:neo_replyblue:876339294611050576> Emoji ID: \`${created.id}\``
          )
          .setThumbnail(`${created.url}`)
          .setFooter("Emotes by Bunny#1111")
          .setTimestamp();
        i.update({ embeds: [stealembed], components: [] });

        doing = false;
      } else if (i.customId == emo4.name) {
        const cancel = new Discord.MessageEmbed()
          .setDescription(
            "<:neo_cross:877535678597050398> Cancelled importing."
          )
          .setColor("#f4a1ff");
        i.update({ embeds: [cancel], components: [] });
      }
    });

    collector.on("end", () => {
      msg.edit({ embeds: [late], components: [] });
      doing = false;
      return;
    });
  },
};
