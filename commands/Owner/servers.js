module.exports = {
    name: 'servers',
    description: 'Show all bots severs',
   async execute(message, args, cmd, client, Discord) {
const {MessageEmbed} = require('discord.js')
if (member.id !== ('543031298130837510') && member.id !== ('654639494481313792')) {
    message.reply('Youre not my owner!')
    return;
}
client.guilds.cache.forEach((guild) => {message.channel.send(guild.id)})
}}