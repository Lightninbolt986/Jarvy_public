module.exports = {
  name: "unodraw",
  aliases: ["udraw", "unod"],
  description: "Call UNO! when you have just one card left",
  async execute(message, args, cmd, client) {
    await client.discordUNO.draw(message);
  } };