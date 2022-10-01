const Discord = require('discord.js')
module.exports = {
  name: "avatar",
  aliases: ["icon", "pfp", "profilepic", "av"],
  description: "Return a user(s) avatar picture!",
  options: [
    {
      name: "user",
      description: "The user to get the avatar of",
      type: "USER",
      required: false,
    },
  ],
  async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    const pngFormat = user.displayAvatarURL({
      format: "png",
    });
    const jpgFormat = user.displayAvatarURL({
      format: "jpg",
    });
    const webpFormat = user.displayAvatarURL();
    const avatar = user.displayAvatarURL({
      dynamic: true,
    });
    const row = new Discord.MessageActionRow().addComponents([
      new Discord.MessageButton()
        .setLabel("PNG")
        .setStyle("LINK")
        .setURL(pngFormat),
      new Discord.MessageButton()
        .setLabel("JPG")
        .setStyle("LINK")
        .setURL(jpgFormat),
      new Discord.MessageButton()
        .setLabel("WEBP")
        .setStyle("LINK")
        .setURL(webpFormat),
    ]);
    interaction.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle(`${user.username}'s avatar`)
          .setImage(avatar),
      ],
      components: [row],
    });
  },
};
