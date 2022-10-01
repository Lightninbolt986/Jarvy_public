module.exports={
    name:'timespamp',
    aliases:['ts'],
    usage:'fromnow <time>',
    description:'Get a timestamp for a time in the future',
    async execute(message,args){
        const ms = require('ms')
const Discord = require('discord.js')
        if (args[0] === 'fromnow') {
            let time = ms(args[1])
            if (!time) return message.channel.send("<:nx_cross:914921124670890064> That's not a valid time. \`Format example: 5h, 5m, 5s\`")

            let output = `<t:${(Date.parse(message.createdAt) + (time) + (10000)) / 1000}:R>`

            const embed = new Discord.MessageEmbed()
                .setColor("BLURPLE")
                .setTitle("Timestamp generator — From Now")
                .addFields(
                    {
                        name: '📥 Input',
                        value: `\`\`\`${ms(time, { long: true })} from now\`\`\``
                    },
                    {
                        name: '📤 Output',
                        value: `${output}`
                    },
                )
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('copy')
                        .setLabel("Copy unix")
                        .setStyle('PRIMARY')
                )
            const m = await message.reply({ embeds: [embed], components: [row] })
            const filter = (b) => {
                if (b.user.id === message.author.id) return true; return b.reply({ content: "<:nx_cross:914921124670890064> This is not for you.", ephemeral: true })
            };
            let collector = await m.createMessageComponentCollector({ filter: filter });

            collector.on('collect', async (i) => {
                if (i.customId === 'copy') {
                    i.reply({ content: `\`${output}\``, ephemeral: true })
                }
            })

        }
        else message.channel.send('Invalid args')
    
    }
    
}