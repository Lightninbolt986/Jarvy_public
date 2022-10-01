module.exports = {
  name: "afk",
  description: "Set yourself as AFK",
  options: [
    {
      name: "reason",
      description: "AFK reason",
      type: "STRING",
      required: false,
    },
  ],
  async execute(interaction, client, Discord, profileData) {
    const afkreason =
      interaction.options.getString("reason") || "User is currently afk";
    if (afkreason.length > 1000) {
      return interaction.reply({
        content: "Keep afk reason under 1000 characters.",
        ephemeral: true,
      });
    }
    /* interaction.deferReply({ephemeral:false}) */
    profileData.is_afk = true;
    profileData.afkreason = afkreason;
    profileData.afkPings = [];
    await profileData.save();

    await interaction.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            "I have set your afk! Sending a message will bring you back."
          )
          .setColor("BLURPLE"),
      ],
      allowedMentions: {
        repliedUser: false,
      },
    });

    interaction.member
      .setNickname(
        `[AFK] ${interaction.member.nickname || interaction.user.username}`
      )
      .catch((e) => {
        interaction.followUp({
          content: "Couldn't update your nickname.",
          ephemeral: true,
        });
      });
  },
};
