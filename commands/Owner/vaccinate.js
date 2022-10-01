module.exports = {
    name: 'vaccinate',
    aliases: ['covid'],
    description: 'Play game',
    cooldown: 1000,
    permissions: {
        bot: ['SEND_MESSAGES'],
        user: ['SEND_MESSAGES']
    },
    async execute(message, args, cmd, client) {
        const {
            Message,
            Client
        } = require('discord.js')
        const Discord = require('discord.js')
        /**
         *@param {Message} message 
         *@param {Client} client
         */
        const msg = await message.channel.send({
            components: getRows(),
            content: 'score is 0'
        })

        let score = 0
        let time = 5000
        move(msg, score, time)

        async function move(msg, score, time) {
            const collector = msg.createMessageComponentCollector({
                time: time
            })
            collector.on("collect", async i => {
                if (i.user.id !== message.author.id) {
                    return i.reply({
                        content: 'This game isn\'t meant for you',
                        ephemeral: true
                    })
                }
                await i.deferUpdate()
                score++
                await msg.edit({
                    components: getRows(),
                    content: 'score is ' + score
                })
                collector.stop('not time')

                time = time - 100
                move(msg, score, time)

            })
            collector.on('end', async (i, r) => {
                if (r == 'time') {
                    await msg.edit({
                        components: [],
                        content: 'score was ' + score + '. game up'
                    })
                }
            })

        }

    }
}

function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function getRows() {
    const Discord = require('discord.js')
    let butts = [],
        rows = []
    for (let i = 0; i < 24; i++) {
        butts.push(
            new Discord.MessageButton()
            .setLabel('\u200b')
            .setStyle('PRIMARY')
            .setDisabled()
            .setCustomId(`${i}`),
        );
    }
    butts.push(
        new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setEmoji(`<:mr_covid:927251671367680020>`)
        .setCustomId('VIRUS'),
    );
    shuffleArray(butts);
    for (let i = 0; i < 5; i++) {
        rows.push(new Discord.MessageActionRow());
    }

    rows.forEach((row, i) => {
        row.addComponents(butts.slice(0 + i * 5, 5 + i * 5));
    });
    return rows
}