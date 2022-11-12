module.exports = {
  name: "unokick",
  aliases: ["ukick"],
  description: "Kick someone from the game",
  async execute(message, args, cmd, client) {
    await client.discordUNO.kickUser(message);
  }
};