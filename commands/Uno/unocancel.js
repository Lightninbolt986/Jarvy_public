module.exports = {
  name: 'unocancel',
  aliases: ['ucancel'],
  description: 'Cancel the ongoing game of uno. This WONT show current winners, if you want to end and know current game standing, type j!unoquickend',
  async execute(message, args, cmd, client, Discord) {
  await client.discordUNO.closeGame(message);;}}