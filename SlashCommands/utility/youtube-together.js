module.exports = {
  name: "discord-together",
  description: "Start a discord together activity",
  options: [
    {
      name: "activity",
      description: "The activity to start",
      type: "STRING",
      required: true,
      choices: [
        { name: "Youtube", value: "youtube" },
        { name: "Youtube (dev)", value: "youtubedev" },
        { name: "Poker", value: "poker" },
        { name: "Betrayal", value: "betrayal" },
        { name: "Fishing", value: "fishing" },
        { name: "Chess", value: "chess" },
        { name: "Chess (dev)", value: "chessdev" },
        { name: "Lettertile", value: "lettertile" },
        { name: "Wordsnack", value: "wordsnack" },
        { name: "Doodlecrew", value: "doodlecrew" },
        { name: "Awkword", value: "awkword" },
        { name: "Spellcast", value: "spellcast" },
        { name: "Checkers", value: "checkers" },
        { name: "Puttparty", value: "puttparty" },
        { name: "Sketchheads", value: "sketchheads" },
        { name: "Ocho", value: "ocho" },
        { name: "Puttpartyqa", value: "puttpartyqa" },
        { name: "Sketchyartist", value: "sketchyartist" },
        { name: "Land", value: "land" },
        { name: "Meme", value: "meme" },
        { name: "Askaway", value: "askaway" },
        { name: "Bobble", value: "bobble" },
      ],
    },
  ],
  async execute(interaction, client) {
    const game = interaction.options.getString("activity");
    const channel = interaction.member.voice.channel;
    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: "You must join a voice channel before using this command!",
        ephemeral: true,
      });
    if (!channel.permissionsFor(interaction.client.user).has("CONNECT"))
      return interaction.reply({
        content: "I don't have permission to join the voice channel",
        ephemeral: true,
      });

    client.discordTogether
      .createTogetherCode(interaction.member.voice.channel.id, game)
      .then(async (invite) => {
        return interaction.reply(
          `Game started, click [here](${invite.code}) to join.`
        );
      });
  },
};
