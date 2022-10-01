const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { paginate } = require("../../functions");
module.exports = {
  name: "miscutil",
  description: "Miscellaneous utility commands",
  options: [
    {
      name: "onlineinfo",
      description: "Displays information about the online status of a user",
      type: 1,
      options: [
        {
          name: "user",
          description:
            "The user to check the online status of. Defaults to you.",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "randomhex",
      description: "Gives a random color",
      type: 1,
    },
    {
      name: "hexinfo",
      description: "Displays information about a hex color",
      type: 1,
      options: [
        {
          name: "hex",
          description: "The hex color to get information about",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "roll",
      description: "Gives a random number",
      type: 1,
      options: [
        {
          name: "number1",
          description: "The first number",
          type: "NUMBER",
          required: true,
        },
        {
          name: "number2",
          description: "The second number",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "sudo",
      description: "Sudo a user",
      type: 1,
      options: [
        {
          name: "user",
          description: "The user to sudo",
          type: "USER",
          required: true,
        },
        {
          name: "text",
          description: "The text to send",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "emotelist",
      description: "Shows the list of emojis in the server",
      type: 1,
    },
    {
      name: "findemoji",
      description: "Finds an emoji on emoji.gg",
      type: 1,
      options: [
        {
          name: "emoji",
          description: "The emoji to find",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "hastebin",
      description: "Posts a set of code in hastebin",
      options: [
        {
          name: "text",
          description: "The code to post",
          type: "STRING",
          required: true,
        },
      ],
      type: 1,
    },
    {
      name: "instagram",
      description: "Find a user in instagram",
      type: 1,
      options: [
        {
          name: "username",
          description: "The username of the user",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "onlineinfo") {
      const member =
        interaction.options.getMember("user") ||
        interaction.guild.members.cache.get(interaction.user.id);
      const user = member.user;
      const devices = member.presence?.clientStatus || {};

      const description = () => {
        if (devices > 1) {
          const entries = Object.entries(devices).map((value) => value[0]);
          return `Device: ${entries}`;
        }
        if (devices == 0) {
          return "Offline/invisible";
        } else {
          const entries = Object.entries(devices)
            .map((value, index) => `${index + 1}) ${value[0]}`)
            .join("\n");
          return `Devices:\n${entries}`;
        }
      };
      const embed = new MessageEmbed()

        .setAuthor({
          name: user.tag,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(description());

      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "randomhex") {
      const randomHexColor = () => {
        return (
          "#" +
          ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(
            -6
          )
        );
      };
      interaction.reply({ content: randomHexColor() });
    } else if (interaction.options.getSubcommand() === "roll") {
      const randomizeNumber = function (start, end) {
        const res = Math.floor(Math.random() * (end - start + 1) + start);
        return res;
      };
      const num1 = interaction.options.getNumber("number1");
      const num2 = interaction.options.getNumber("number2");

      interaction.reply(randomizeNumber(num1, num2));
    } else if (interaction.options.getSubcommand() === "sudo") {
      if (
        !interaction.member.permissions.has("MANAGE_MESSAGES") &&
        !interaction.author.id == "543031298130837510"
      )
        return interaction.reply({
          content: "You need manage messages permission.",
          ephemeral: true,
        });
      const user = interaction.options.getMember("user");
      const content = interaction.options.getString("text");
      if (content.length > 2000)
        return interaction.reply({
          content: "The content can not be above 2000 characters!!",
          ephemeral: true,
        });

      await interaction.channel.createWebhook(interaction.user.username, {
        avatar: user.user.displayAvatarURL({ dynamic: true }),
        reason: `${interaction.user.username} used the sudo command!`,
      });

      let webhooks = await interaction.channel.fetchWebhooks();
      let webhook = webhooks.last();
      interaction.reply({ content: "done!", ephemeral: true });
      await webhook.send({
        content: content,
        username: user.user.username,
        avatarURL: user.user.displayAvatarURL({ dyamic: true }),
      });
    } else if (interaction.options.getSubcommand() === "emotelist") {
      let Emojis = [];
      let EmojisAnimated = [];
      let EmojiCount = 0;
      let Animated = 0;
      let OverallEmojis = 0;
      let embed = {};
      let embedslist = [];

      function Emoji(id) {
        return client.emojis.cache.get(id).toString();
      }
      interaction.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
          Animated++;
          EmojisAnimated.push(
            `${Emoji(emoji.id)}│\`${emoji.id}\` - \`${emoji.name}\``
          );
        } else {
          EmojiCount++;
          Emojis.push(`${Emoji(emoji.id)}│\`${emoji.id}\` - \`${emoji.name}\``);
        }
      });
      if (!OverallEmojis > 1)
        return interaction.reply({ content: "No emos lmao", ephemeral: true });
      Emojis = Emojis.concat(EmojisAnimated);
      var i,
        j,
        temporary,
        chunk = 25;
      for (i = 0, j = Emojis.length; i < j; i += chunk) {
        temporary = Emojis.slice(i, i + chunk);
        embed[`${i / 25}`] = new MessageEmbed()
          .setAuthor({
            name: `Emojis in ${interaction.guild.name}`,
            iconURL: `${interaction.guild.iconURL({ dynamic: true })}`,
          })
          .setDescription(`${temporary.join(`\n`)}`)
          .setColor("BLURPLE");
      }
      for (let i = 0; i < Object.keys(embed).length; i++) {
        embedslist.push(embed[i]);
      }
      const button1 = new MessageButton()
        .setCustomId("previousbtn")
        .setEmoji("<:neox_leftarrow:877767124544782368>")
        .setStyle("SECONDARY");

      const button2 = new MessageButton()
        .setCustomId("nextbtn")
        .setEmoji("<:neox_rightarrow:877765155230994482>")
        .setStyle("SECONDARY");
      buttonList = [button1, button2];

      paginate(embedslist, interaction);
    } else if (interaction.options.getSubcommand() === "findemoji") {
      const fetch = require("node-fetch");
      const late = new MessageEmbed()
        .setDescription(
          "<:neo_cross:877535678597050398> You took too long to choose a reaction. ||Loser||"
        )
        .setColor("#f4a1ff");
      await interaction.deferReply();
      let emojis = await fetch("https://emoji.gg/api/").then((res) =>
        res.json()
      );
      const rt = interaction.options.getString("emoji");
      const q = rt.split(" ").join("_");
      let matches = emojis.filter((s) => s.title == q || s.title.includes(q));

      const noResult = new MessageEmbed()
        .setDescription(
          `<:neo_cross:877535678597050398> No Results found for ${rt}`
        )
        .setColor("#f4a1ff");

      if (!matches.length)
        return interaction.editReply({
          embeds: [noResult],
          ephemeral: true,
        });
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
        wholething: "<:neox_cross:1019553493150879806>",
        name: `neox_cross`,
        id: `1019553493150879806`,
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
      const embed = new MessageEmbed()
        .setDescription(
          `**<a:neo_greentick:876391533920813086> Emoji results for ${rt}**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${match}\`\n<:neo_replyblue:876339294611050576> Emoji Link: [Click Here](${findurl})`
        )
        .setColor("#a8f1ff")
        .setImage(matches[page].image)
        .setFooter({ text: `Emoji ${page + 1}/${matches.length}` });
      const row = new MessageActionRow().addComponents([
        btn1,
        btn2,
        btn3,
        btn4,
      ]);

      const msg = await interaction.editReply({
        embeds: [embed],
        components: [row],
      });

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
            const newembed = new MessageEmbed()

              .setDescription(
                `**<a:neo_greentick:876391533920813086> Emoji results for ${rt}**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${match}\`\n<:neo_replyblue:876339294611050576> Emoji Link: [Click Here](${findurl})`
              )
              .setColor("#a8f1ff")
              .setImage(matches[page].image)
              .setFooter({ text: `Emoji ${page + 1}/${matches.length}` });
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
            const newembed = new MessageEmbed()
              .setDescription(
                `**<a:neo_greentick:876391533920813086> Emoji results for ${rt}**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${match}\`\n<:neo_replyblue:876339294611050576> Emoji Link: [Click Here](${findurl})`
              )
              .setColor("#a8f1ff")
              .setImage(matches[page].image)
              .setFooter({ text: `Emoji ${page + 1}/${matches.length}` });

            i.update({ embeds: [newembed], components: [row] });
          }
        } else if (i.customId == emo3.name) {
          const res = matches[page];
          let created;

          try {
            created = await interaction.guild.emojis.create(
              res.image,
              res.title
            );
          } catch {
            i.reply(
              `<:neo_cross:877535678597050398> Unable to add ${res.title}.`
            );

            return (doing = false);
          }
          const stealembed = new MessageEmbed()
            .setColor("#a8f1ff")
            .setDescription(
              `<a:neo_greentick:876391533920813086> **Successfully Added!**\n<:neo_replycontblue:876339530708426754> Emoji name: \`${created.name}\`\n<:neo_replycontblue:876339530708426754> Emoji link: [Click here](${created.url})\n<:neo_replyblue:876339294611050576> Emoji ID: \`${created.id}\``
            )
            .setThumbnail(`${created.url}`)
            .setFooter({ text: "Emotes by Bunny#1111" })
            .setTimestamp();
          i.update({ embeds: [stealembed], components: [] });

          doing = false;
        } else if (i.customId == emo4.name) {
          const cancel = new MessageEmbed()
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
    } else if (interaction.options.getSubcommand() === "hastebin") {
      const hastebin = require("hastebin-gen");
      let haste = interaction.options.getString("text");
      await interaction.deferReply({ ephemeral: true });
      hastebin(haste)
        .then((r) => {
          interaction.editReply("`Posted to Hastebin at this URL:`  " + r);
        })
        .catch(console.error);
    } else if (interaction.options.getSubcommand() === "hexinfo") {
      const fetch = require("node-fetch");
      let color = interaction.options.getString("hex");
      if (color.includes("#")) {
        color = color.split("#")[1];
      }
      const url = `https://api.popcatdev.repl.co/color/${color}`;
      let json;
      try {
        json = await fetch(url).then((res) => res.json());
      } catch (e) {
        return interaction.reply("An Error Occured, Try Again Later.");
      }
      if (json.error) return interaction.reply("Invalid color!");
      const embed = new MessageEmbed()
        .setTitle("Color Info")
        .addField("Name", json.name, true)
        .addField("Hex", json.hex, true)
        .addField("RGB", json.rgb, true)
        .addField("Brighter Shade", json.brightened, true)
        .setImage(json.color_image)
        .setColor(`${json.hex}`);
      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "instagram") {
      const { instagramUser } = require("popcat-wrapper");
      const username = interaction.options
        .getString("username")
        .replace(" ", "_");
      try {
        await interaction.deferReply();
        console.log(username);
        const account = await instagramUser(username);
        console.log(account);
        const embed = new MessageEmbed()
          .setColor("4169e1")
          .setTitle(account.username)
          .setURL(`https://instagram.com/${username}`)
          .setThumbnail(account.profile_pic)
          .addFields(
            { name: "Username", value: `${account.username}`, inline: true },
            { name: "Full Name", value: `${account.full_name}`, inline: true },
            { name: "Biography", value: `${account.biography}`, inline: true },
            { name: "Posts", value: `${account.posts}`, inline: true },
            { name: "Followers", value: `${account.followers}`, inline: true },
            { name: "Following", value: `${account.following}`, inline: true },
            { name: "Private?", value: `${account.private}`, inline: true },
            { name: "Reels", value: `${account.reels}`, inline: true },
            { name: "Verified", value: `${account.verified}`, inline: true }
          );
        interaction.editReply({ embeds: [embed] });
      } catch (error) {
        interaction.editReply("Not a valid user, or the account is private");
      }
    }
  },
};
