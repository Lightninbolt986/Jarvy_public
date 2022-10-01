module.exports = {
  name: 'unosettings',
  aliases: ['unosetting', 'usettings', 'usetting'],
  description: 'Call UNO! when you have just one card left',
  async execute(message, args, cmd, client, Discord) {
  await client.discordUNO.updateSettings(message);;}}