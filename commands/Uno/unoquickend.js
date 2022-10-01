module.exports = {
  name: 'unoquickend',
  aliases: ['uquickend', 'uqe'],
  description: 'Ends the game as it is. The person with lowest cards wins',
  async execute(message, args, cmd, client, Discord) {
  await client.discordUNO.endGame(message);}}