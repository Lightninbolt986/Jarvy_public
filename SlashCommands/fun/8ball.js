const unirest = require("unirest");
module.exports = {
  name: "8ball",
  description: "Asks a question and let the bot determine your fate",
  type: "CHAT_INPUT",
  options: [
    {
      name: "question",
      description: "The question to ask the 8ball",
      type: "STRING",
      required: true,
    },
  ],
  async execute(interaction) {
    const query = interaction.options.getString("question");

    const req = unirest("get", "https://8ball.delegator.com/magic/JSON/" + query);

    req.end((res) => {
      interaction.reply({
        content:
          "```" +
          "Question: " +
          res.body.magic.question +
          "\n" +
          "Answer: " +
          res.body.magic.answer +
          "```",
      });
    });
  },
};
