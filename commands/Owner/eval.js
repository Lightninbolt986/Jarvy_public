module.exports = {
    name: 'eval',
    aliases: ['ev'],
    description: 'Eval some code',
    async execute(message, args, cmd, client, Discord) {
        if (!args[0]) return message.reply('huh?')
        const {
            author
        } = message;
        const member = author
        const {
            MessageEmbed
        } = require('discord.js')
        if (member.id !== ('543031298130837510') && member.id !== ('654639494481313792')) {
            message.reply('Youre not my owner!')
            return;
        }
        try {
            var code = args.join(' ');
            let a = false;
            if (code.includes('client.token'))
                return message.reply('Dont wanna do that 0_0');
            var evaled = eval(code)
            if (a) return
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);

            const embed = new MessageEmbed()
                .setColor('#000')
                .addField(':inbox_tray: Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    ':outbox_tray: output: ',
                    `\`\`\`js\n${clean(evaled)}\n\`\`\``
                );
            message.reply({
                embeds: [embed]
            });
        } catch (err) {
            errors(err)
        }

        function errors(err) {
            const embed = new MessageEmbed()
                .setColor('#000')
                .addField(':inbox_tray: Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    ':outbox_tray: output: ',
                    `\`\`\`${clean(err)}\`\`\``
                );
            message.reply({
                embeds: [embed]
            });
        }

        function clean(text) {
            if (typeof text === 'string')
                return text
                    .replace(/`/g, '`' + String.fromCharCode(8203))
                    .replace(/@/g, '@' + String.fromCharCode(8203));
            else return text;
        }
    }
}