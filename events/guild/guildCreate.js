module.exports = async (Discord, client, guild) => {

    try {
        const profileModel = require('../../models/guildSchema')
     
            let profile = await profileModel.create({
                GuildID: guild.id,
            });
            profile.save();
       
    } catch (err) {
        console.log(err);
    }
}