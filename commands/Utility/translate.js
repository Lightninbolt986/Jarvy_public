const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate")
module.exports = {
  name: 'translate',
  description: 'Translate',
  async execute(message, args, cmd, client, Discord) {/*
    const msg = await message.channel.messages.fetch(
      interaction.targetId
    );

    const translated = await translate(msg.content, { to: 'en' });
    const embed = new MessageEmbed()
    .setFooter(`${interaction.user.tag}`)
    .setTimestamp()
    .addField("Text To Translate:", `\`\`\`${msg.content}\`\`\``)
    .addField("Translateted Text:", `\`\`\`${translated.text}\`\`\``)
    .setColor('BLUE')

    interaction.followUp({ embeds: [embed] })
*/
  }
}