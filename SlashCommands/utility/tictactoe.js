module.exports = {
  name: "tictactoe",
  description: "Play tictactoe with a bot/another user",
  type: "CHAT_INPUT",
  options: [{
    type: "USER",
    name: "user",
    description: "Mention a user to challenge",
    required: false
  }],
  async execute(interaction) {
    const TicTacToe = require("discord-tictactoe");
    const game = new TicTacToe({
      language: "en",
      commandOptionName: "user"
    });
    game.handleInteraction(interaction);
  }
};