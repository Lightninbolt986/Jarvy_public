const { MessageEmbed } = require("discord.js");
const { paginate } = require("../../functions");
const profileModel = require("../../models/profileSchema");
const cooldowns = new Map();
module.exports = async (Discord, client, interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({
        content: "An error has occured ",
        ephemeral: true,
      });

    const args = [];
    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: interaction.user.id });
      if (!profileData) {
        profileData = await profileModel.create({
          userID: interaction.user.id,
          serverID: interaction.guild.id,
          moni: 1000,
          bank: 0,
          hugs: 0,
          kisses: 0,
          insults: 0,
          praises: 0,
          fucks: 0,
          pats: 0,
          slaps: 0,
          winks: 0,
        });
        profile.save();
      }
    } catch (err) {
      console.log(err);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    const command = cmd;
    if (interaction.guild) {
      const userperms = command.permissions?.user || [];
      const botperms = command.permissions?.bot || [];
      if (
        !interaction.member.permissions.has(userperms) &&
        interaction.user.id !== "543031298130837510"
      )
        return interaction.reply({
          content: `You do not have the required permissions to run this command. Run /help ${command.name} for more info"`,
          ephemeral: true,
        });
      if (!interaction.guild.me.permissions.has(botperms))
        return interaction.reply({
          content: `I dont have the required permissions for that. Run /help ${command.name} for more information`,
          ephemeral: true,
        });
    }
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown;

    if (time_stamps.has(interaction.user.id)) {
      const expiration_time =
        time_stamps.get(interaction.user.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            "Woah! Chill out.",
            "https://cdn.discordapp.com/emojis/831761508676927528.png"
          )
          .setDescription(
            `<:jarvy_redarrow:892705185518981130>Have some patience, don't try to break me.\n<:jarvy_redarrow:892705185518981130>You can use \`${
              command.name
            }\` again in **${time_left.toFixed(
              1
            )} seconds**.\n<:jarvy_redarrow:892705185518981130>Default cooldown for \`${
              command.name
            }\` is **${command.cooldown / 1000} seconds**`
          )
          .setColor(16733011);
        return interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      }
    }
    time_stamps.set(interaction.user.id, current_time);
    setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);
    cmd.execute(interaction, client, Discord, profileData);
  }
  if (interaction.isContextMenu()) {
    const profileModel = require("../../models/profileSchema");
    let profileData;
    try {
      profileData = await profileModel.findOne({
        userID: interaction.user.id,
      });
      if (!profileData) {
        profileData = await profileModel.create({
          userID: interaction.user.id,
          dono: 0,
        });
        profileData.save();
      }
    } catch (err) {
      console.log(err);
    }
    /* 
    await interaction.deferReply({
      ephemeral: false,
    }); */
    const command = client.slashCommands.get(interaction.commandName);

    if (command) command.execute(interaction, client, profileData);
  }
  if (interaction.isButton()) {
    if (interaction.customId === "gaw-entries") {
      await interaction.deferReply({
        ephemeral: true,
      });
      const guildSchema = require("../../models/guildSchema");
      let gaw = await guildSchema.findOne({
        "giveaways.giveaways.id": interaction.message.id,
      });
      let giveaway = gaw.giveaways.giveaways.find(
        (e) => e.id === interaction.message.id
      );
      let entries = giveaway.entries;
      var i,
        j,
        temporary,
        chunk = 25;
      embed = {};
      embedslist = [];
      for (i = 0, j = entries.length; i < j; i += chunk) {
        temporary = entries.slice(i, i + chunk);
        str = "";
        temporary.forEach((e, ind) => (str += `${ind + 1}) <@${e}>\n`));
        embed[`${i / 25}`] = new MessageEmbed()
          .setTitle(`Entries for giveaway of ${giveaway.prize}`)
          .setDescription(str)
          .setColor("BLURPLE");
      }
      for (let i = 0; i < Object.keys(embed).length; i++) {
        embedslist.push(embed[i]);
      }
      if (embedslist.length === 0) {
        interaction.editReply("There are no entries for the giveaway");
      } else if (embedslist.length === 1)
        interaction.editReply({ embeds: [embedslist[0]] });
      else paginate(embedslist, interaction);
    }
  }
};
