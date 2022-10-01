module.exports = {
  name: 'unocreate',
  aliases: ['ucreate'],
  description: 'Creates a game of uno',
  async execute(message, args, cmd, client, Discord) {
          if(!message.member.permissions.has("MANAGE_MESSAGES" || 'ADMINISTRATOR') && !message.author.id == 543031298130837510) return message.channel.send('You need manage messages permission.')
  await client.discordUNO.createGame(message)
    }}