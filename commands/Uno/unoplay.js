module.exports = {
  name: "unoplay",
  aliases: ["uplay", "unop"],
  description: "Join the ongoing game of uno",
  async execute(message, args, cmd, client) {
    await client.discordUNO.playCard(message);
  } };