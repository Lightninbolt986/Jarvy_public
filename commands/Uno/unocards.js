module.exports = {
  name: 'unohand',
  aliases: ['unocards', 'uhand', 'ucards'],
  description: 'Call UNO! when you have just one card left',
  async execute(message, args, cmd, client, Discord) {
  await client.discordUNO.viewCards(message);}}