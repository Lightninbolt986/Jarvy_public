module.exports = {
  name: 'unoviewsettings',
  aliases: ['uuno!'],
  description: 'Call UNO! when you have just one card left',
  async execute(message, args, cmd, client, Discord) {
        await client.discordUNO.viewSettings(message);}}