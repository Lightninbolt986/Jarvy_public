module.exports = {
  name: "errors",
  aliases: ["report"],
  description: "View errors",
  async execute(message, args, cmd, client) {
    if (
      message.author.id !== "543031298130837510" &&
      message.author.id !== "654639494481313792"
    ) {
      message.reply("Youre not my owner!");
      return;
    }
    client.handle.report(client, message);
  },
};
