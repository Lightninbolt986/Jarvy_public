const ms = require("ms");
const Discord = require("discord.js");
const prettyMilliseconds = require("pretty-ms");
const guildSchema = require("../../models/guildSchema");
const { giveawayStart } = require("../../functions");
module.exports = {
  name: "test",
  description: "test",
  options: [
    {
      name: "giveaway",
      description: "Create and manage giveaways",
      type: 2,
      options: [
        {
          name: "start",
          description: "Start a giveaway",
          type: 1,
          options: [
            {
              name: "time",
              type: "STRING",
              description: "Time for the giveaway",
              required: true,
            },
            {
              name: "prize",
              type: "STRING",
              description: "The prize for the giveaway",
              required: true,
            },
            {
              name: "winners",
              type: "INTEGER",
              description: "Number of winners",
              required: false,
              min:1,
              max:10,
            },
            {
              name: "roles",
              type: "STRING",
              description:
                "Required roles for the giveaway. Separate role ids with a comma",
              required: false,
            },
            {
              name: "bypassroles",
              type: "STRING",
              description:
                "Required roles for the giveaway. Separate role ids with a comma",
              required: false,
            },
            {
              name: "blacklistroles",
              type: "STRING",
              description:
                "Required roles for the giveaway. Separate role ids with a comma",
              required: false,
            },
            {
              name: "amarilvl",
              type: "INTEGER",
              description: "Amari level required for the giveaway",
              required: false,
              min:1,
              max:200
            },
            {
              name: "weeklyamari",
              type: "INTEGER",
              description: "Weekly amari XP required for the giveaway",
              required: false,
              min:1,
              max:10000
            },
            {
              name: "channel",
              description: "Channel to send the giveaway message in",
              type: "CHANNEL",
              required: false,
            },
          ],
        },
      ],
    },
  ],
  async execute(interaction, client) {
    let guild = await guildSchema.findOne({ GuildID: interaction.guild.id });
    if (!guild)
      guild = await guildSchema.create({ GuildID: interaction.guild.id });
    if (interaction.user.id !== "543031298130837510") {
      return interaction.reply({
        content: "You are not allowed to use this command.",
        ephemeral: true,
      });
    }

    if (interaction.options.getSubcommandGroup() === "giveaway") {
      const time = interaction.options.getString("time");
      const prize = interaction.options.getString("prize");
      const winners = interaction.options.getInteger("winners") || 1;
      const roles = interaction.options.getString("roles");
      const bypassroles = interaction.options.getString("bypassroles");
      const blacklistroles = interaction.options.getString("blacklistroles");
      const amarilvl = interaction.options.getInteger("amarilvl");
      const weeklyamari = interaction.options.getInteger("weeklyamari");
      const channel =
        interaction.options.getChannel("channel") || interaction.channel;
      if (Number(time))
        return interaction.reply({
          content: "The time you entered is invalid",
          ephemeral: true,
        });
      const msTime = ms(time);
      if (!msTime)
        return interaction.reply({
          content: "The time you entered is invalid",
          ephemeral: true,
        });
      //TODO: requirements for the giveaway
      const unixTime = Math.floor((Date.now() + msTime) / 1000);
      const requirements = {};
      if (amarilvl) {
        if (amarilvl > 200 || amarilvl < 0) {
          return interaction.reply({
            content: "The maximum amari level is 200 and minimum is 1",
            ephemeral: true,
          });
        } else {
          if (!interaction.guild.members.cache.has("339254240012664832")) {
            return interaction.reply({
              content: "You don't have amari in your server",
              ephemeral: true,
            });
          }
          requirements.amari = amarilvl;
        }
      }
      if (weeklyamari) {
        if (!interaction.guild.members.cache.has("339254240012664832")) {
          return interaction.reply({
            content: "You don't have amari in your server",
            ephemeral: true,
          });
        }
        requirements.wamari = weeklyamari;
      }
      if (roles) {
        let roles2 = roles.split(",");
        roles2 = roles2.map((role) => {
          return role.trim();
        });
        let rolefinderr = false;
        for (const id of roles2) {
          if (!interaction.guild.roles.cache.has(id)) {
            interaction.reply({
              content: id + " is not a valid role id!",
              ephemeral: true,
            });
            rolefinderr = true;
            break;
          }
        }
        if (rolefinderr) return;
        requirements.roles = roles2;
      }
      if (bypassroles) {
        let bypassroles2 = bypassroles.split(",");
        bypassroles2 = bypassroles2.map((role) => {
          return role.trim();
        });
        let bypassrolefinderr = false;
        for (const id of bypassroles2) {
          if (!interaction.guild.roles.cache.has(id)) {
            interaction.reply({
              content: id + " is not a valid role id!",
              ephemeral: true,
            });
            bypassrolefinderr = true;
            break;
          }
        }
        if (bypassrolefinderr) return;
        requirements.bypassroles = bypassroles2;
      }
      if (blacklistroles) {
        let blacklistroles2 = blacklistroles.split(",");
        blacklistroles2 = blacklistroles2.map((role) => {
          return role.trim();
        });
        let blacklistrolefinderr = false;
        for (const id of blacklistroles2) {
          if (!interaction.guild.roles.cache.has(id)) {
            interaction.reply({
              content: id + " is not a valid role id!",
              ephemeral: true,
            });
            blacklistrolefinderr = true;
            break;
          }
        }
        if (blacklistrolefinderr) return;
        requirements.blacklistroles = blacklistroles2;
      }
      let requirementString = "";
      if (requirements.amari) {
        requirementString += `\u2001\u2001<:bp_dot:918074237992988722>Amari level: ${amarilvl}\n`;
      }
      if (requirements.wamari) {
        requirementString += `\u2001\u2001<:bp_dot:918074237992988722>Weekly amari XP: ${weeklyamari}\n`;
      }
      if (requirements.roles) {
        requirementString += `\u2001\u2001<:bp_dot:918074237992988722>Roles: ${roles
          .split(",")
          .map((e) => e.trim())
          .map((e) => `<@&${e}>`)
          .join(" ,")}\n`;
      }
      if (requirements.bypassroles) {
        requirementString += `\u2001\u2001<:bp_dot:918074237992988722>Bypass roles: ${bypassroles
          .split(",")
          .map((e) => e.trim())
          .map((e) => `<@&${e}>`)
          .join(" ,")}\n`;
      }
      if (requirements.blacklistroles) {
        requirementString += `\u2001\u2001<:bp_dot:918074237992988722>Blacklist roles: ${blacklistroles
          .split(",")
          .map((e) => e.trim())
          .map((e) => `<@&${e}>`)
          .join(" ,")}`;
      }
      if (requirementString.length === 0)
        requirementString = "\u2001\u2001<:bp_dot:918074237992988722>None!";
      const content = "**Giveaway**";
      //TODO: add settings
      const emo = "🎉";
      const createRow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("0")
          .setCustomId("gaw-join")
          .setEmoji(emo)
          .setStyle("SUCCESS"),
        new Discord.MessageButton()
          .setLabel("End")
          .setCustomId("gaw-end")
          .setStyle("SECONDARY"),
        new Discord.MessageButton()
          .setLabel("Entries")
          .setCustomId("gaw-entries")
          .setStyle("SECONDARY")
      );
      const embed = new Discord.MessageEmbed()
        .setTitle(`<:bp_gift:923106198906093619> ${prize}`)
        .setThumbnail(interaction.guild.iconURL())
        //TODO: add settings
        .setDescription(
          `<:bp_replycont:905405321277763624> Hosted by: <@${interaction.user.id}>\n<:bp_replycont:905405321277763624> Ends: <t:${unixTime}:R>\n<:bp_replycont:905405321277763624> Winners: ${winners}\n<:bp_reply:905405401946783804>Requirements:\n${requirementString}`
        )
        .setFooter({ text: "Started" })
        .setTimestamp(Date.now())
        .setColor("#5865F2");

      await interaction.reply({ content: "Done!", ephemeral: true });
      const msg = await channel.send({
        embeds: [embed],
        components: [createRow],
        fetchReply: true,
      });
      await guildSchema.findOneAndUpdate(
        { GuildID: interaction.guild.id },
        {
          $push: {
            "giveaways.giveaways": {
              id: msg.id,
              prize,
              requirements,
              winners,
              channel: channel.id,
              time: Date.now() + msTime,
              host: interaction.user.id,
              ended: false,
              entries: [],
              winner: [],
            },
          },
        },
        { upsert: true }
      );
      giveawayStart(msg.id, client);
    }
  },
};
