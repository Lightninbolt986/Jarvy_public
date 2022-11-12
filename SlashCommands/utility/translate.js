const {
  MessageEmbed
} = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "Translate",
  type: "MESSAGE",
  async execute(interaction) {
    const msg = await interaction.channel.messages.fetch(
      interaction.targetId
    );

    const translated = await translate(msg.content, {
      to: "en"
    });
    const embed = new MessageEmbed()
      .setFooter({ text:`${interaction.user.tag}` })
      .setTimestamp()
      .addField("Text To Translate:", `> [**${msg.content}**](${msg.url})`)
      .addField("Result (English):", `> \`\`\`${translated.text}\`\`\``)
      .setColor("BLUE");

    if (!msg.content) return interaction.reply(
      `<@${interaction.user.id}> Please check that there is content in this message!`
    );
    if (msg.content.length > 1024) return interaction.reply("This message cant be translate because the words is over 1024 characters.");
    else return interaction.reply({
      embeds: [embed]
    });
  },
};