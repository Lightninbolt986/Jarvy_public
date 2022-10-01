const fetch = require('node-fetch');
const {
    MessageEmbed
} = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name: 'fact',
    description: 'Get fact about a animal ',
        type: 'CHAT_INPUT',
    options: [{
        name: 'topic',
        description: 'Choose the topic you want the facts for',
        type: 'STRING',
        required: true,
        choices: [{
                name: 'bird',
                value: 'https://some-random-api.ml/facts/bird|||bird'
            },
            {
                name: 'cat',
                value: 'https://some-random-api.ml/facts/cat|||cat'
            },
            {
                name: 'dog',
                value: 'https://some-random-api.ml/facts/dog|||dog'
            },
            {
                name: 'fox',
                value: 'https://some-random-api.ml/facts/fox|||fox'
            },
            {
                name: 'koala',
                value: 'https://some-random-api.ml/facts/koala|||koala'
            },
            {
                name: 'panda',
                value: 'https://some-random-api.ml/facts/panda|||panda'
            },
            {
                name: 'random',
                value: 'https://useless-facts.sameerkumar.website/api|||useless'
            }
        ]
    }],
    async execute(interaction) {
        const t = interaction.options.getString('topic')
        const url = t.split('|||')[0]
        const name = t.split('|||')[1]
        async function embed() {
            let embed1 = null
            await fetch(url).then(res => res.json().then(fact => {
                embed1 = new MessageEmbed()
                    .setTitle('Random ' + name + ' fact')
                    .setDescription(fact.fact || fact.data)
                    .setColor("BLUE")
                    .setFooter('This was probably useless but you\'re welcome');

            }))
            return embed1
        }
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId('reload')
                .setLabel('Reload fact')
                .setStyle('SECONDARY'),
            )
        const disabled = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId('reload')
                .setLabel('Reload fact')
                .setStyle('SECONDARY')
                .setDisabled(true)

            )
        let m = await interaction.fetchReply();
console.log(interaction.replied)
       await interaction.editReply({
            embeds: [await embed()],
            components: [row]
        })
        const collector = m.createMessageComponentCollector({
			componentType: 'BUTTON',
			time: 120000,
		});
		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) {
				i.deferUpdate()
				await update(m)
				collector.stop()
			} else {
				i.reply({
					content: `These buttons aren't for you!`,
					ephemeral: true
				});
			}
		})
        collector.on('end', (mes, r) => {
			if (r == 'time') {
				interaction.editReply({
					components: [disabled],
				})
			}
		})
        async function update(m) {
			interaction.editReply({
				embeds: [await embed()]
			})

			const collector = m.createMessageComponentCollector({
				componentType: 'BUTTON',
				time: 120000,
			});
			collector.on('collect', async i => {
				if (i.user.id === interaction.user.id) {

					i.deferUpdate()
					await update(m)
					collector.stop()
				} else {
					i.reply({
						content: `These buttons aren't for you!`,
						ephemeral: true
					});
				}
			})
			collector.on('end', (mes, r) => {
				if (r == 'time') {
					m.edit({
						components: [disabled],
					})
				}
			})
		}
    }
};