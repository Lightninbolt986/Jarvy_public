module.exports = {
	name: 'willyoupressthebutton',
	aliases: ['wyptb'],
	description: 'Will **you** press the button?',
	async execute(message, args, cmd, client, Discord) {
		const {
			decode
		} = require('html-entities');
		const {
			MessageEmbed,
			MessageButton
		} = require('discord.js')
		const fetch = require(`node-fetch`)
		const WillYouPressTheButtonData = function () {
			return fetch('https://api2.willyoupressthebutton.com/api/v2/dilemma ', {
					method: 'POST',
				})
				.then((data) => data.json())
				.then((data) => {
					return data.dilemma;
				});
		}
		const getRandomString = function (length) {
			const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			let result = '';
			for (let i = 0; i < length; i++) {
				result += randomChars.charAt(
					Math.floor(Math.random() * randomChars.length),
				);
			}
			return result;
		}
		const randomHexColor = function () {
			return (
				'#' +
				('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
			);
		}
		const WillYouPressTheButton = async function (options) {
			if (!options.message) {
				throw new Error('message argument was not specified.');
			}
			if (typeof options.message !== 'object') {
				throw new TypeError('Invalid Discord Message was provided.');
			}

			if (!options.embed) options.embed = {};
			if (typeof options.embed !== 'object') {
				throw new TypeError('embed must be an object.');
			}

			if (!options.embed.title) {
				options.embed.title = 'Will you press the button?';
			}
			if (typeof options.embed.title !== 'string') {
				throw new TypeError('embed title must be a string.');
			}

			if (!options.embed.description) {
				options.embed.description =
					'```{{statement1}}```\n**but**\n\n```{{statement2}}```';
			}
			if (typeof options.embed.description !== 'string') {
				throw new TypeError('embed description must be a string.');
			}

			if (!options.embed.color) options.embed.color = randomHexColor();
			if (typeof options.embed.color !== 'string') {
				throw new TypeError('embed color must be a string.');
			}

			if (!options.embed.footer) {
				options.embed.footer = 'Jarvy';
			}
			if (typeof options.embed.footer !== 'string') {
				throw new TypeError('embed footer must be a string.');
			}

			if (!options.embed.timestamp) options.embed.timestamp = true;
			if (typeof options.embed.timestamp !== 'boolean') {
				throw new TypeError('timestamp must be a boolean.');
			}

			if (!options.button) options.button = {};
			if (typeof options.embed !== 'object') {
				throw new TypeError('buttons must be an object.');
			}

			if (!options.button.yes) options.button.yes = 'Yes';
			if (typeof options.button.yes !== 'string') {
				throw new TypeError('yesLabel must be a string.');
			}

			if (!options.button.no) options.button.no = 'No';
			if (typeof options.button.no !== 'string') {
				throw new TypeError('noLabel must be a string.');
			}

			if (!options.thinkMessage) options.thinkMessage = 'I am thinking';
			if (typeof options.thinkMessage !== 'string') {
				throw new TypeError('thinkMessage must be a boolean.');
			}

			if (!options.othersMessage) {
				options.othersMessage = 'Only <@{{author}}> can use the buttons!';
			}
			if (typeof options.othersMessage !== 'string') {
				throw new TypeError('othersMessage must be a string.');
			}

			const id1 =
				getRandomString(20) +
				'-' +
				getRandomString(20) +
				'-' +
				getRandomString(20) +
				'-' +
				getRandomString(20);
			const id2 =
				getRandomString(20) +
				'-' +
				getRandomString(20) +
				'-' +
				getRandomString(20) +
				'-' +
				getRandomString(20);

			const think = await options.message.reply({
				embeds: [
					new MessageEmbed()
					.setTitle(`${options.thinkMessage}.`)
					.setColor(options.embed.color),
				],
			});

			await think.edit({
				embeds: [
					new MessageEmbed()
					.setTitle(`${options.thinkMessage}..`)
					.setColor(options.embed.color),
				],
			});

			const fetchedData = await WillYouPressTheButtonData();

			await think.edit({
				embeds: [
					new MessageEmbed()
					.setTitle(`${options.thinkMessage}...`)
					.setColor(options.embed.color),
				],
			});

			const res = {
				questions: [fetchedData.txt1, fetchedData.txt2],
				percentage: {
					1: fetchedData.yes,
					2: fetchedData.no,
				},
			};

			await think.edit({
				embeds: [
					new MessageEmbed()
					.setTitle(`${options.thinkMessage}..`)
					.setColor(options.embed.color),
				],
			});

			let btn = new MessageButton()
				.setStyle('SUCCESS')
				.setLabel(options.button.yes)
				.setCustomId(id1);
			let btn2 = new MessageButton()
				.setStyle('DANGER')
				.setLabel(options.button.no)
				.setCustomId(id2);

			await think.edit({
				embeds: [
					new MessageEmbed()
					.setTitle(`${options.thinkMessage}.`)
					.setColor(options.embed.color),
				],
			});

			const embed = new MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					`${options.embed.description
					.replace(
						'{{statement1}}',
						decode(
							res.questions[0].charAt(0).toUpperCase() +
								res.questions[0].slice(1),
						),
					)
					.replace(
						'{{statement2}}',
						decode(
							res.questions[1].charAt(0).toUpperCase() +
								res.questions[1].slice(1),
						),
					)}`,
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				embed.setTimestamp();
			}

			await think.edit({
				embeds: [embed],
				components: [{
					type: 1,
					components: [btn, btn2]
				}],
			});

			const gameCollector = think.createMessageComponentCollector((fn) => fn);

			gameCollector.on('collect', async (wyptb) => {
				if (wyptb.user.id !== options.message.author.id) {
					return wyptb.reply({
						content: options.othersMessage.replace(
							'{{author}}',
							options.message.member.id,
						),
						ephemeral: true,
					});
				}

				await wyptb.deferUpdate();

				if (wyptb.customId === id1) {
					btn = new MessageButton()
						.setStyle('SUCCESS')
						.setLabel(`${options.button.yes} (${res.percentage['1']})`)
						.setCustomId(id1)
						.setDisabled();
					btn2 = new MessageButton()
						.setStyle('DANGER')
						.setLabel(`${options.button.no} (${res.percentage['2']})`)
						.setCustomId(id2)
						.setDisabled();
					gameCollector.stop();
					await wyptb.editReply({
						embed: embed,
						components: [{
							type: 1,
							components: [btn, btn2]
						}],
					});
				} else if (wyptb.customId === id2) {
					btn = new MessageButton()
						.setStyle('DANGER')
						.setLabel(`${options.button.yes} (${res.percentage['1']})`)
						.setCustomId(id1)
						.setDisabled();
					btn2 = new MessageButton()
						.setStyle('SUCCESS')
						.setLabel(`${options.button.no} (${res.percentage['2']})`)
						.setCustomId(id2)
						.setDisabled();
					gameCollector.stop();
					await wyptb.editReply({
						embed: embed,
						components: [{
							type: 1,
							components: [btn, btn2]
						}],
					});
				}
			})
		}
		await WillYouPressTheButton({
			message: message,
			embed: {
				title: 'Will you press the button?',
				description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
				color: '#7289da',
				timestamp: true,
			},
			button: {
				yes: 'Yes',
				no: 'No'
			},
			thinkMessage: 'I am thinking',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
	}
}