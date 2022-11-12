module.exports = {
  name: "unocallout",
  aliases: ["ucallout"],
  description: "Callout someone for not saying UNO! when they had just one card left",
  async execute(message, args, cmd, client) {
    await client.discordUNO.UNO(message);
  } };