module.exports = {
    name: 'serverinfo',
    aliases: ['si'],
    description: 'Servers information',


        async execute(message, args, cmd, client, Discord) {
            const {pagination} = require('../../functions/pagination');
            const button1 = new Discord.MessageButton()
                    .setCustomId('previousbtn')
                    .setEmoji('<:neox_leftarrow:877767124544782368>')
                    .setStyle('DANGER');

    const button2 = new Discord.MessageButton()
                    .setCustomId('nextbtn')
                    .setEmoji('<:neox_rightarrow:877765155230994482>')
                    .setStyle('SUCCESS');

            const moment = require('moment');

            const filterLevels = {
                DISABLED: 'Off',
                MEMBERS_WITHOUT_ROLES: 'No Role',
                ALL_MEMBERS: 'Everyone'
            };

            const verificationLevels = {
                NONE: 'None',
                LOW: 'Low',
                MEDIUM: 'Medium',
                HIGH: 'High',
                VERY_HIGH: 'Extreme'
            };

            const featuresList = {
                ANIMATED_ICON: "Animated Icon",
                BANNER: "Banner Image",
                COMMERCE: "Commerce",
                COMMUNITY: "Community",
                DISCOVERABLE: "Server Discovery",
                FEATURABLE: "Featurable",
                INVITE_SPLASH: "Splash Invite",
                MEMBER_VERIFICATION_GATE_ENABLED: "Membership Screening enabled",
                NEWS: "News Channels",
                PARTNERED: "Partnered",
                PREVIEW_ENABLED: "Preview enabled",
                VANITY_URL: "Vanity URL",
                VERIFIED: "Verified",
                VIP_REGIONS: "VIP Voice Servers",
                WELCOME_SCREEN_ENABLED: "Welcome Screen enabled",
                TICKETED_EVENTS_ENABLED: `Ticketed Events`,
                MONETIZATION_ENABLED: `Server monetization`,
                MORE_STICKERS: `More stickers`,
                THREE_DAY_THREAD_ARCHIVE: `3 day thread archive`,
                SEVEN_DAY_THREAD_ARCHIVE: `7 day thread archive`,
                PRIVATE_THREADS: `Private threads`,
            }

            const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const members = message.guild.members.cache;
            const channels = message.guild.channels.cache;
            const emojis = message.guild.emojis.cache;
            let features = message.guild.features;
    var featuresOfServer = Object.keys(featuresList).map((e, i, a) => {
        if(i == a.length-1){
    return `<:neox_reply:877267802145296445> ${featuresList[e]} ${features.indexOf(e)>-1 ? `<a:neo_greentick:876391533920813086>` : `<a:neo_error:875622698192109580>`}`
    }else {
        return `<:neox_replycont:877267875390455878> ${featuresList[e]} ${features.indexOf(e)>-1 ? `<a:neo_greentick:876391533920813086>` : `<a:neo_error:875622698192109580>`}`
    }})
    featuresOfServer = featuresOfServer.join(`\n`)

            const embed1 = new Discord.MessageEmbed()
                .setDescription(`**Guild information for __${message.guild.name}__**`)
                .setColor('#00e3b9')
                .setThumbnail(message.guild.iconURL({
                    dynamic: true
                }))
                .addFields({
                        name: '<:neox_rightarrow:877765155230994482> MEMBERS',
                        value: `**<:neox_replycont:877267875390455878> Member Count:** \`${message.guild.memberCount}\`\n**<:neox_replycont:877267875390455878> Humans:** \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`\n**<:neox_replycont:877267875390455878> Bots:** \`${members.filter(member => member.user.bot).size}\`\n**<:neox_replycont:877267875390455878> Users online:** \`${message.guild.members.cache.filter(m => m.presence ?.status === 'online' || m.presence ?.status === 'dnd' || m.presence ?.status === 'idle').size}/${message.guild.members.cache.size}\`\n**<:neox_replycont:877267875390455878><:neox_online:882565743370174545> Online:** \`${message.guild.members.cache.filter(m => m.presence ?.status === 'online').size}\`\n**<:neox_replycont:877267875390455878><:neox_idle:882565630425972777> Idle:** \`${message.guild.members.cache.filter(m => m.presence ?.status === 'idle').size}\`\n**<:neox_replycont:877267875390455878><:neox_dnd:882565562583113768> DND:** \`${message.guild.members.cache.filter(m => m.presence ?.status === 'dnd').size}\`\n**<:neox_reply:877267802145296445><:neox_offline:882565693277601813> Offline:** \`${message.guild.members.cache.size - message.guild.members.cache.filter(m => m.presence ?.status === 'online' || m.presence ?.status === 'dnd' || m.presence ?.status === 'idle').size}\``
                    }, {
                        name: '<:neox_rightarrow:877765155230994482> GENERAL',
                        value: `**<:neox_replycont:877267875390455878> Name: [${message.guild.name}](https://youtube.com)**\n**<:neox_replycont:877267875390455878> Server ID:** \`${message.guild.id}\`\n**<:neox_replycont:877267875390455878> Owner:** <@${message.guild.ownerId}>\`(${message.guild.ownerId})\`\n**<:neox_replycont:877267875390455878> Boost Tier:** \`Tier ${message.guild.premiumTier.charAt(5)}\`\n<:neox_replycont:877267875390455878> **Boost Count:** \`${message.guild.premiumSubscriptionCount || '0'}\`\n**<:neox_replycont:877267875390455878> Explicit Filter:** \`${filterLevels[message.guild.explicitContentFilter]}\`\n**<:neox_replycont:877267875390455878> Verification Level:** \`${verificationLevels[message.guild.verificationLevel]}\`\n**<:neox_reply:877267802145296445> Time Created:** \`${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})\``
                    }, {
                        name: '<:neox_rightarrow:877765155230994482> STATISTICS',
                        value: `**<:neox_replycont:877267875390455878> Role Count:** \`${roles.length}\`\n**<:neox_replycont:877267875390455878> Emoji Count:** \`${emojis.size}\`\n**<:neox_replycont:877267875390455878> Regular Emojis:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n**<:neox_replycont:877267875390455878> Animated Emojis:** \`${emojis.filter(emoji => emoji.animated).size}\`\n**<:neox_replycont:877267875390455878> Text Channels:** \`${message.guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').size}\`\n**<:neox_reply:877267802145296445> Voice Channels:** \`${message.guild.channels.cache.filter(c => c.type == 'GUILD_VOICE').size}\``
                    }

                )
                // <:neox_dnd:882565562583113768> <:neox_online:882565743370174545> <:neox_idle:882565630425972777> <:neox_offline:882565693277601813>
                .setTimestamp()
                if(message.guild.features.indexOf('BANNER')>-1) embed1.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}.png?size=2048`)
            
    const embed2 = new Discord.MessageEmbed()
    .setTitle(`**Guild information for __${message.guild.name}__**`)        
    .setColor('#00e3b9')
    .setThumbnail(message.guild.iconURL({
        dynamic: true
    }))
    .setDescription(`<:neox_rightarrow:877765155230994482> FEATURES\n${featuresOfServer}`)
    .setTimestamp()
    if(message.guild.features.indexOf('INVITE_SPLASH')>-1) embed2.setImage(`https://cdn.discordapp.com/splashes/${message.guild.id}/${message.guild.splash}.png?size=2048`)

    pagination({
        channel: message.channel,
        author: message.author,
        message: message,
        embeds: [embed1, embed2],
        fastSkip: true,
        button: [
            { name: "first", emoji: "<:dlarrow:926431786089734214>", style: "PRIMARY" },
            { name: "previous", emoji: "<:larrow:926431699573817354>", style: "PRIMARY" },
            { name: "next", emoji: "<:rarrow:926431866733608990>", style: "PRIMARY" },
            { name: "last", emoji: "<:drarrow:926431932869378139>", style: "PRIMARY" },
        ],
        time: 300000,
    })
        }

}