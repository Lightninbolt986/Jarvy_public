module.exports = {
  name: "unoleave",
  aliases: ["uleave"],
  description: "Join the ongoing game of uno",
  async execute(message, args, cmd, client) {
    await client.discordUNO.removeUser(message);
  } };