module.exports = {
    name: 'instagram',
    aliases:['insta'],
    description: 'Find a user on instagram',
    async execute(message, args, cmd, client, Discord) {

        const { instagramUser } = require("popcat-wrapper")
        const username = args.join('_');
        if (!username) return message.channel.send("Provide a name to search for!")
        try {
          const account = await instagramUser(username)
          const embed = new Discord.MessageEmbed()
            .setColor('4169e1')
            .setTitle(account.username)
            .setURL(`https://instagram.com/${username}`)
            .setThumbnail(account.profile_pic)
            .addFields(
              { name: 'Username', value: `${account.username}`, inline: true },
              { name: 'Full Name', value: `${account.full_name}`, inline: true },
              { name: 'Biography', value: `${account.biography}`, inline: true },
              { name: 'Posts', value: `${account.posts}`, inline: true },
              { name: "Followers", value: `${account.followers}`, inline: true },
              { name: 'Following', value: `${account.following}`, inline: true },
              { name: 'Private?', value: `${account.private}`, inline: true },
              { name: 'Reels', value: `${account.reels}`, inline: true },
              { name: 'Verified', value: `${account.verified}`, inline: true })
          message.channel.send({ embeds: [embed] })
        } catch (error) {
          message.channel.send("Not a valid user!")
        }
      
    }}