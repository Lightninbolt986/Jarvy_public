module.exports = {
  name: "unotable",
  aliases: ["utable"],
  description: "Call UNO! when you have just one card left",
  async execute(message, args, cmd, client) {
    await client.discordUNO.viewTable(message);
  } };