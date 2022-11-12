const { MessageEmbed } = require("discord.js");
const { default: fetch } = require("node-fetch");
const yomama = require("../../data/yo-mama");
module.exports = {
  name: "fun",
  description: "Fun commands",
  type: "CHAT_INPUT",
  options: [
    {
      name: "dare",
      description: "Dare someone!",
      type: 1,
      options: [
        {
          name: "user",
          description: "The user to dare. Defaults to you.",
          type: "USER",
          required: false,
        },
        {
          name: "rating",
          description: "The rating of the dare.",
          type: "STRING",
          choices: [
            { name: "PG", value: "pg" },
            { name: "PG13", value: "pg13" },
            { name: "R", value: "r" },
          ],
          required: false,
        },
        {
          name: "translation",
          description: "Translate the dare into a different language.",
          type: "STRING",
          choices: [
            { name: "Bangla", value: "bangla" },
            { name: "German", value: "german" },
            { name: "Spanish", value: "spanish" },
            { name: "French", value: "french" },
            { name: "Hindi", value: "hindi" },
            { name: "Filipino", value: "filipino" },
          ],
          required: false,
        },
      ],
    },
    {
      name: "truth",
      description: "Ask a truth from someone!",
      type: 1,
      options: [
        {
          name: "user",
          description: "The user to ask. Defaults to you.",
          type: "USER",
          required: false,
        },
        {
          name: "rating",
          description: "The rating of the truth.",
          type: "STRING",
          choices: [
            { name: "PG", value: "pg" },
            { name: "PG13", value: "pg13" },
            { name: "R", value: "r" },
          ],
          required: false,
        },
        {
          name: "translation",
          description: "Translate the truth into a different language.",
          type: "STRING",
          choices: [
            { name: "Bangla", value: "bangla" },
            { name: "German", value: "german" },
            { name: "Spanish", value: "spanish" },
            { name: "French", value: "french" },
            { name: "Hindi", value: "hindi" },
            { name: "Filipino", value: "filipino" },
          ],
          required: false,
        },
      ],
    },
    {
      name: "wouldyourather",
      description: "Get a would you rather question!",
      type: 1,
      options: [
        {
          name: "rating",
          description: "The rating of the truth.",
          type: "STRING",
          choices: [
            { name: "PG", value: "pg" },
            { name: "PG13", value: "pg13" },
            { name: "R", value: "r" },
          ],
          required: false,
        },
        {
          name: "translation",
          description: "Translate the truth into a different language.",
          type: "STRING",
          choices: [
            { name: "Bangla", value: "bangla" },
            { name: "German", value: "german" },
            { name: "Spanish", value: "spanish" },
            { name: "French", value: "french" },
            { name: "Hindi", value: "hindi" },
            { name: "Filipino", value: "filipino" },
          ],
          required: false,
        },
      ],
    },
    {
      name: "ratemachine",
      description: "Use the ratemachine",
      type: 2,
      options: [
        {
          name: "gayrate",
          description: "Get the gayrate for a user",
          type: 1,
          options: [
            {
              name: "user",
              description: "The user to rate. Defaults to you.",
              type: "USER",
              required: false,
            },
          ],
        },
        {
          name: "simprate",
          description: "Get the simprate for a user",
          type: 1,
          options: [
            {
              name: "user",
              description: "The user to rate. Defaults to you.",
              type: "USER",
              required: false,
            },
          ],
        },
        {
          name: "gamerate",
          description: "Get the gamerate for a user",
          type: 1,
          options: [
            {
              name: "user",
              description: "The user to rate. Defaults to you.",
              type: "USER",
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: "yomama",
      description: "Get a yo mama joke",
      type: 1,
    },
  ],
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "dare") {
      const user = interaction.options.getUser("user") || interaction.user;
      const translation = interaction.options.getString("translation");
      let rating = interaction.options.getString("rating");
      if (!rating) rating = Math.random() < 0.5 ? "pg" : "pg13";
      const langs = {
        bangla: "bn",
        german: "de",
        spanish: "es",
        french: "fr",
        hindi: "hi",
        filipino: "tl",
      };

      const res = await fetch(
        `https://api.truthordarebot.xyz/api/dare?rating=${rating}`
      );
      const body = await res.json();
      let dare;
      if (translation) dare = body.translations[langs[translation]];
      else dare = body.question;
      if (res.error) {
        throw new Error(res.error);
      }
      const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username} dares ${user.username}!`)
        .setDescription(dare);
      interaction.reply({ embeds: [embed], content: `<@${user.id}>` });
    } else if (interaction.options.getSubcommand() === "truth") {
      const user = interaction.options.getUser("user") || interaction.user;
      const translation = interaction.options.getString("translation");
      let rating = interaction.options.getString("rating");
      if (!rating) rating = Math.random() < 0.5 ? "pg" : "pg13";
      const langs = {
        bangla: "bn",
        german: "de",
        spanish: "es",
        french: "fr",
        hindi: "hi",
        filipino: "tl",
      };

      const res = await fetch(
        `https://api.truthordarebot.xyz/api/truth?rating=${rating}`
      );
      const body = await res.json();
      let truth;
      if (translation) truth = body.translations[langs[translation]];
      else truth = body.question;
      if (res.error) {
        throw new Error(res.error);
      }
      const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username} asks ${user.username}!`)
        .setDescription(truth);
      interaction.reply({ embeds: [embed], content: `<@${user.id}>` });
    } else if (interaction.options.getSubcommand() === "wouldyourather") {
      const translation = interaction.options.getString("translation");
      let rating = interaction.options.getString("rating");
      if (!rating) rating = Math.random() < 0.5 ? "pg" : "pg13";
      const langs = {
        bangla: "bn",
        german: "de",
        spanish: "es",
        french: "fr",
        hindi: "hi",
        filipino: "tl",
      };

      const res = await fetch(
        `https://api.truthordarebot.xyz/api/wyr?rating=${rating}`
      );
      const body = await res.json();
      let wouldyourather;
      if (translation) wouldyourather = body.translations[langs[translation]];
      else wouldyourather = body.question;
      if (res.error) {
        throw new Error(res.error);
      }
      const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username} asked a would you rather!`)
        .setDescription(wouldyourather);
      const msg = await interaction.reply({
        embeds: [embed],
        fetchReply: true,
      });
      msg.react("1️⃣");
      msg.react("2️⃣");
    } else if (
      interaction.options.getSubcommand() === "gayrate" &&
      interaction.options.getSubcommandGroup() === "ratemachine"
    ) {
      const user = interaction.options.getUser("user") || interaction.user;
      const gayrate = Math.floor(Math.random() * 101);
      const argsEmbed = new MessageEmbed()
        .setTitle("Gayrate Machine")
        .setColor("#000000")
        .setDescription(`${user.username} is \`${gayrate}%\` gay! 🏳️‍🌈`)
        .setFooter(
          interaction.client.user.username,
          interaction.client.user.avatarURL()
        );
      interaction.reply({ embeds: [argsEmbed] }).catch((e) => {
        console.log(e);
      });
    } else if (
      interaction.options.getSubcommand() === "simprate" &&
      interaction.options.getSubcommandGroup() === "ratemachine"
    ) {
      const user = interaction.options.getUser("user") || interaction.user;
      const gayrate = Math.floor(Math.random() * 101);
      const argsEmbed = new MessageEmbed()
        .setTitle("Simprate Machine")
        .setColor("#000000")
        .setDescription(`${user.username} is \`${gayrate}%\` simp! 🏳️‍🌈`)
        .setFooter(
          interaction.client.user.username,
          interaction.client.user.avatarURL()
        );
      interaction.reply({ embeds: [argsEmbed] }).catch((e) => {
        console.log(e);
      });
    } else if (
      interaction.options.getSubcommand() === "gamerrate" &&
      interaction.options.getSubcommandGroup() === "ratemachine"
    ) {
      const user = interaction.options.getUser("user") || interaction.user;
      const gayrate = Math.floor(Math.random() * 101);
      const argsEmbed = new MessageEmbed()
        .setTitle("Gamerrate Machine")
        .setColor("#000000")
        .setDescription(`${user.username} is \`${gayrate}%\` gamer! 🏳️‍🌈`)
        .setFooter(
          interaction.client.user.username,
          interaction.client.user.avatarURL()
        );
      interaction.reply({ embeds: [argsEmbed] }).catch((e) => {
        console.log(e);
      });
    } else if (interaction.options.getSubcommand() === "yomama") {
      await interaction.reply(
        yomama[Math.floor(Math.random() * yomama.length)]
      );
    }
  },
};
