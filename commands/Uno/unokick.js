module.exports = {
    name: 'unokick',
    aliases: ['ukick'],
    description: 'Kick someone from the game',
    async execute(message, args, cmd, client, Discord) {
        await client.discordUNO.kickUser(message);
    }
}