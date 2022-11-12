module.exports = async (Discord, client, guild) => {
  try {
    const profileModel = require("../../models/guildSchema");
    await profileModel.deleteOne({
      GuildID: guild.id,
    });
  } catch (err) {
    console.log(err);
  }
};
