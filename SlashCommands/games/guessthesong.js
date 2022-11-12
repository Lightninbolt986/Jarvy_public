module.exports = {
  name: "guessthesong",
  description: "Play a game of guess the song",
  type: "CHAT_INPUT",
  options: [
    {
      name: "rounds",
      description: "The number of rounds to play",
      type: "INTEGER",
      required: false,
      max: 10,
      min: 3,
    },
  ],
  async execute(interaction) {
    const round = interaction.options.getInteger("rounds") || 5;
    await interaction.reply({
      content: `Round of guess the song started by ${
        interaction.user.tag
      }, there will be ${round} rounds. It will start <t:${Math.round(
        (Date.now() + 30 * 1000) / 1000
      )}:R>`,
      fetchReply: true,
    });
    await delay(30000);

    for (let step = 0; step < round; step++) {
      const { guessSongEmoji } = require("../../functions");
      const SongEmoji = guessSongEmoji();
      interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle(
              "<:neo_giveaway:879979277448265738> Guess the song from the emojis and hints-"
            )
            .setDescription(
              `<:neo_replycontblue:876339530708426754> Emojis: ${SongEmoji.emojiImgs}\n <:neo_replyblue:876339294611050576> Hint: ${SongEmoji.year}`
            )
            .setFooter("You have 30 seconds to guess the song and its artist"),
        ],
      });
      await delay(30000);
      interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
            .setTitle("<a:neo_greentick:876391533920813086> Round results -")
            .setFooter("Next round (if any) starts in 10 seconds")
            .setDescription(
              `<:neo_replycontblue:876339530708426754> Song: ${SongEmoji.title}\n<:neo_replyblue:876339294611050576> Artist: ${SongEmoji.artist[0]}`
            ),
        ],
      });

      await delay(10000);
    }
    interaction.followUp({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle("<a:neo_greentick:876391533920813086> Event Ended!")
          .setDescription(
            "Thank you everyone who participated!! <:neo_zerotwoheart:840987136291110913>"
          ),
      ],
    });
  },
};
