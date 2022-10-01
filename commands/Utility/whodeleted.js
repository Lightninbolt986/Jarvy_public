
module.exports = {
    name:'whodeleted',
    alises: ['wd'],
    description: 'Shows the last 5 logged msg deletes. **It does NOT show messages deleted by bots, or self message deletes',
    async execute(message, args, cmd, client, Discord){
      
    const paginationEmbed = require('discordjs-button-pagination')
        const {MessageButton, MessageEmbed} = require('discord.js')
    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 5,
      type: 'MESSAGE_DELETE',
    });
    if (fetchedLogs.entries.size < 5) {
      message.channel.send({ content: `This command requires at least 5 deleted msgs in the server, without that the cmd won't work` })
    } else {
      const deletionLog1 = Array.from(fetchedLogs.entries)[0][1]
      const deletionLog2 = Array.from(fetchedLogs.entries)[1][1]
      const deletionLog3 = Array.from(fetchedLogs.entries)[2][1]
      const deletionLog4 = Array.from(fetchedLogs.entries)[3][1]
      const deletionLog5 = Array.from(fetchedLogs.entries)[4][1]
      const executor1 = deletionLog1.executor.tag
      const executor2 = deletionLog2.executor.tag
      const executor3 = deletionLog3.executor.tag
      const executor4 = deletionLog4.executor.tag
      const executor5 = deletionLog5.executor.tag
      const target1 = deletionLog1.target.tag
      const target2 = deletionLog2.target.tag
      const target3 = deletionLog3.target.tag
      const target4 = deletionLog4.target.tag
      const target5 = deletionLog5.target.tag
      const embed1 = new Discord.MessageEmbed()
        .setTitle('First deleted message that was logged')
        .setDescription(`Message by ${target1} deleted by ${executor1}`)
      const embed2 = new Discord.MessageEmbed()
        .setTitle('Second deleted message that was logged')
        .setDescription(`Message by ${target2} deleted by ${executor2}`)
      const embed3 = new Discord.MessageEmbed()
        .setTitle('Third deleted message that was logged')
        .setDescription(`Message by ${target3} deleted by ${executor3}`)
      const embed4 = new Discord.MessageEmbed()
        .setTitle('Fourth deleted message that was logged')
        .setDescription(`Message by ${target4} deleted by ${executor4}`)
      const embed5 = new Discord.MessageEmbed()
        .setTitle('Fifth deleted message that was logged')
        .setDescription(`Message by ${target5} deleted by ${executor5}`)

      const button1 = new MessageButton()
        .setCustomId('previousbtn')
        .setLabel('Previous')
        .setStyle('DANGER');

      const button2 = new MessageButton()
        .setCustomId('nextbtn')
        .setLabel('Next')
        .setStyle('SUCCESS');

      buttonList = [
        button1,
        button2
      ]
      pages = [
        embed1,
        embed2,
        embed3,
        embed4,
        embed5
      ];
      paginationEmbed(message, pages, buttonList, 120000);
    }
  
    }
}