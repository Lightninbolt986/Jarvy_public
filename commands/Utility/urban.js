module.exports = {
  name: "urban",
  description: "Find a word on urban dictionary",
  async execute(message, args) {
    const urban = require("urban");

    const { MessageEmbed } = require("discord.js");

    if (args.length < 1) return message.reply("Please enter something!");
    const XD = args.join(" ");
    urban(XD).first((json) => {
      if (!json) return message.reply("No results found!");

      const urbEmbed = new MessageEmbed()
        .setColor("00ff00")
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by: ${json.author}`);

      message.channel.send({ embeds: [urbEmbed] });
    });
  },
};
