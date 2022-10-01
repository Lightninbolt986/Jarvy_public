const fetch = require("node-fetch")
module.exports = {
    name: 'dzapps',
    usage: '',
    async execute(message, args, cmd, client, Discord) {
 return
        if (message.guild.id !== '738394656211206234') return
        const apps = require('nuggies').applications.addApplication
        await apps({
            guildID: message.guild.id,
            name: 'Giveaway manager',
            emoji: '🎉',
            channel: '768882191899295754',
            description: 'Apply for giveaway manager',
            label: "test",
            maxApps: 10,
            responseChannelID: '847081128942370826',
            questions: ['How much can you donate daily?', 'What is your balance and bankspace?', 'What is your timezone?','How much time can you devote for being a giveaway manager?','Have you been a giveaway manager before? if so please mention.']
        })
        await apps({
            guildID: message.guild.id,
            name: 'Event manager',
            emoji: '🎉',
            channel: '768882191899295754',
            description: 'Apply for event manager',
            label: "test",
            maxApps: 10,
            responseChannelID: '847081128942370826',
            questions: ['How much can you donate daily?', 'What is your balance and bankspace?', 'What is your timezone?','How much time can you devote for being an event manager?','Have you been an event manager before? if so please mention.']
        })
        await apps({
            guildID: message.guild.id,
            name: 'Partnership manager',
            emoji: '🤝',
            channel: '768882191899295754',
            description: 'Apply for partnership manager',
            label: "test",
            maxApps: 10,
            responseChannelID: '847081128942370826',
            questions: ['How many partners can you get weekly?', 'What is your time zone?', 'How many serves/portal are you in?','How much time can you devote for finding partners?','Have you been a partnership manager before? if so please mention.']
        })
        require('nuggies').applications.create({guildID:message.guild.id,content:'Choose the position you would like to apply for.',client:client})
    }
}