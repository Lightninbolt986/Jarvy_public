module.exports = {
  name: 'unostart',
  aliases: ['ustart'],
  description: 'Join the ongoing game of uno',
  async execute(message, args, cmd, client, Discord) {
            await client.discordUNO.startGame(message)
    }}