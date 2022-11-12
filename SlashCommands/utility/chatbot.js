const fetch = require("node-fetch");

module.exports = {
  name: "chatbot",
  description: "Talk to an AI chatbot",
  options: [
    {
      name: "message",
      description: "The message to send to the chatbot",
      type: "STRING",
      required: true,
    },
  ],
  async execute(interaction) {
    const mesg = interaction.options.getString("message");
    await interaction.deferReply();
    try {
      fetch(
        `http://api.brainshop.ai/get?bid=156722&key=${
          process.env.brainshop
        }&uid=${interaction.user.id}&msg=${encodeURIComponent(mesg)}`
      ).then((res) =>
        res.json().then((data) => {
          interaction.editReply({
            content: data.cnt,
            allowedMentions: {
              parse: [],
            },
          });
        })
      );
    } catch (e) {
      interaction.editReply(
        "The chatbot has crashed, avoid doing this cmd too much, try later tho"
      );
    }
  },
};
