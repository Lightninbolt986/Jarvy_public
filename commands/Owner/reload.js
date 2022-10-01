module.exports = {
    name: 'reload',
    description: 'Reload commands',
    async execute(message, args, cmd, client) {
        const glob = require("glob");

        if (message.author.id !== ('543031298130837510') && message.author.id !== ('654639494481313792')) {
            message.reply('Youre not my owner!')
            return;
        }
        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);
                if (pull.name) {
                   client.commands.set(pull.name, pull);

                }

            });

        });
        message.channel.send('Reloaded Commands')
    }
}