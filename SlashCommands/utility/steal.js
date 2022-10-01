const { MessageEmbed, Util } = require("discord.js");

const { parse } = require("twemoji-parser");
module.exports = {
  name: "steal",
  description: "Steal an emoji from another server",
  options: [
    {
      name: "single",
      description: "Steal a single emoji",
      type: 1,
      options: [
        {
          name: "emoji",
          description: "The emoji to steal. Can be an emoji or a link",
          type: "STRING",
          required: true,
        },
        {
          name: "name",
          description: "The name of the emoji",
          type: "STRING",
          required: false,
        },
      ],
    },
    { name: "bulk", description: "Steal upto 25 emojis", type: 1 },
  ],
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "single") {
      const emoji = interaction.options.getString("emoji");
      const name = interaction.options.getString("name");
      await interaction.deferReply();
      try {
        if (emoji.startsWith("https://cdn.discordapp.com")) {
          await interaction.guild.emojis.create(emoji, name || "give_name");

          const embed = new MessageEmbed()
            .setTitle(`Emoji Added`)
            .setThumbnail(`${emoji}`)
            .setColor("RANDOM")
            .setDescription(
              `Emoji Has Been Added! | Name: ${name || "give_name"} `
            );
          return interaction.editReply({ embeds: [embed] });
        }

        const customEmoji = Util.parseEmoji(emoji);

        if (customEmoji.id) {
          const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
            customEmoji.animated ? "gif" : "png"
          }`;

          await interaction.guild.emojis.create(
            `${link}`,
            `${name || `${customEmoji.name}`}`
          );

          const embed = new MessageEmbed()
            .setTitle(`Emoji Added <:${customEmoji.name}:${customEmoji.id}>`)
            .setColor("RANDOM")
            .setThumbnail(`${link}`)
            .setDescription(
              `Emoji Has Been Added! | Name: ${
                name || `${customEmoji.name}`
              } | Preview: [Click me](${link})`
            );
          return interaction.editReply({ embeds: [embed] });
        } else {
          const foundEmoji = parse(emoji, { assetType: "png" });
          if (!foundEmoji[0]) {
            const embed = new MessageEmbed()
              .setDescription(
                `Please provide a valid emoji. I can't work with this bs`
              )
              .setColor("RANDOM");
            return interaction.editReply({ embeds: [embed] });
          }
          const embed = new MessageEmbed()
            .setDescription(
              `Bruv this is a normal emoji what you can use anywhere`
            )
            .setColor("RANDOM");
          interaction.editReply({ embeds: [embed] });
        }
      } catch (e) {
        if (
          String(e).includes(
            "DiscordAPIError: Maximum number of emojis reached"
          )
        ) {
          const embed = new MessageEmbed()
            .setDescription(`Maximum emoji count reached for this Server!`)
            .setColor("RANDOM");

          return interaction.editReply({ embeds: [embed] });
        } else if (String(e).includes("Invalid Form Body")) {
          const embed = new MessageEmbed()
            .setDescription(`Invalid name, no spaces allowed`)
            .setColor("RANDOM");

          return interaction.editReply({ embeds: [embed] });
        } else {
          console.log(e);
          interaction.editReply({
            content: "An error occoured, try again later",
            embeds: [],
            components: [],
          });
        }
      }
    }
  },
};
