const giphy = require("giphy-api")(process.env.giphy);

module.exports = {
  name: "gif",
  description: "Search a gif on giphy",
  options: [
    {
      name: "term",
      description: "The term to search on giphy",
      required: true,
      type: "STRING",
    },
  ],
  async execute(interaction) {
    const term = interaction.options.getString("term");
    await interaction.deferReply();
    giphy.search(term).then(function (res) {
      // Res contains gif data!
      const id = res.data[0].id;
      const msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
      const embed = {
        color: 3066993,
        timestamp: new Date(),
        footer: {
          icon_url:
            "https://raw.githubusercontent.com/Giphy/GiphyAPI/f68a8f1663f29dd9e8e4ea728421eb2977e42d83/api_giphy_logo_sparkle_clear.gif",
          text: "Powered by Giphy",
        },
        image: {
          url: msgurl,
        },
        fields: [
          {
            name: "Search Term",
            value: "`" + term + "`",
            inline: true,
          },
          {
            name: "Page URL",
            value: "[Giphy](" + res.data[0].url + ")",
            inline: true,
          },
        ],
      };
      interaction.editReply({ embeds: [embed] });
    });
  },
};
