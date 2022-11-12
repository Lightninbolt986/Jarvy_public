const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "You need a description for this?",
  type: "CHAT_INPUT",
  async execute(interaction) {

    const messagePing = Date.now();
    await interaction.reply("Loading...");
    const endMessagePing = Date.now() - messagePing;

    const embed = new MessageEmbed()
      .setDescription(
        `
                     Message ping: \`${endMessagePing}ms\`
                   `
      )
      .setColor("GREEN")
      .setTimestamp();

    interaction.editReply({
      content: null,
      embeds: [embed],
    });

  }
};