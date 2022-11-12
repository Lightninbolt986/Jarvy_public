module.exports = {
  name: "unojoin",
  aliases: ["ujoin"],
  description: "Join the ongoing game of uno",
  async execute(message, args, cmd, client) {
    await client.discordUNO.addUser(message);
  }
};