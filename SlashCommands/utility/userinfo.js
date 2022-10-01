const emotes = {
  online: `<:online:944091415351263353>`,
  dnd: `<:dnd:944091478735585330>`,
  offline: `<:offline:944091500097183815>`,
  idle: `<:idle:944091516035543051>`,
};
const flags = {
  DISCORD_EMPLOYEE: "<:discordemployee:931530420800061530>",
  DISCORD_PARTNER: "<:discordpartner:929651430682402819>",
  BUGHUNTER_LEVEL_1: "<:discordbughunterlv1:929651431496118302>",
  BUGHUNTER_LEVEL_2: "<:discordbughunterlv2:929651431219298324>",
  HYPESQUAD_EVENTS: "<:discordhypesquad:929651430820810792>",
  HOUSE_BRAVERY: "<:discordbravery:929651430535606302>",
  HOUSE_BRILLIANCE: "<:discordbrillance:929651430682402816>",
  HOUSE_BALANCE: "<:discordbalance:929651431093448704>",
  EARLY_SUPPORTER: "<:discordearlysupporter:929651430523011133>",
  VERIFIED_BOT: "<:bottag:929651431613554728>",
  VERIFIED_DEVELOPER: "<:bot_developer:929650907665297408>",
};
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "User Info",
  description: "View info about a user",
  type: "USER",
  execute(interaction) {
    const user = interaction.guild.members.cache.get(interaction.targetId);
    let badge = user.user.flags.toArray();
    let badges = badge.length
      ? badge.map((f) => flags[f]).join(" ")
      : "No Badges";
    let temp = 0;
    let status = user.presence?.status;
    if (status === "dnd") status = emotes["dnd"];
    if (status === "idle") status = emotes["idle"];
    if (status === "online") status = emotes["online"];
    if (status === "offline" || status === "invisible" || status === undefined)
      status = emotes["offline"];
    let activity = user.presence?.activities[0]?.name || "No Activity";
    const roles = user.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((r) => {
        if (temp <= 900) {
          temp = temp + r.toString().length;
          return r.toString();
        } else return undefined;
      });
    let finalRoles = roles
      .filter((e) => {
        return e;
      })
      .slice(0, -1)
      .join(" ");
    if (
      roles.filter((e) => {
        return !e;
      }).length
    )
      finalRoles =
        finalRoles +
        ` + ${
          roles.filter((e) => {
            return !e;
          }).length
        } more`;
    let embed = new MessageEmbed()
      .setTitle(`${user.user.username}`)
      .setThumbnail(
        user.displayAvatarURL({
          dynamic: true,
        })
      )
      .addField(
        "User",
        `\n**Username:** ${user.user.username}\n**Tag:** ${
          user.user.tag
        }\n**Discriminator:** ${user.user.discriminator}\n**ID:** ${
          user.id
        }\n**Status:** ${status}\n**Activity:** ${activity}\n**Badges:** ${badges}\n**Created At:** <t:${parseInt(
          user.user.createdTimestamp / 1000
        )}:R>`
      )
      .addField(
        "Server",
        `\n**Nickname:** ${user.displayName}\n**Joined At:** <t:${parseInt(
          user.joinedTimestamp / 1000
        )}:R>\n**Roles:** ${finalRoles}`
      )
      .setColor("RANDOM")
      .setTimestamp();
    return interaction.reply({
      embeds: [embed],
    });
  },
};
