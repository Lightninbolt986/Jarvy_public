const Discord = require("discord.js");
const Guild = require("../../models/guildSchema");
const { paginate } = require("../../functions");
const emos = {
  dot: "<:dd_dot:958621014294659082>",
  arrow: "<:dd_sarrow:971312925744726056>",
  cross: "<:cross:967007953393700884>",
  tick: "<:tick:967005955109818378>",
};
module.exports = {
  //Command Information
  name: "raffle",
  description: "Start a raffle in Server.",
  options: [
    {
      name: "start",
      description: "Start a new raffle.",
      type: 1,
      options: [
        {
          name: "logchannel",
          description: "Channel where tickets are logged.",
          type: "CHANNEL",
          required: true,
        },
        {
          name: "winners",
          description: "Number of winners.",
          type: "INTEGER",
          required: true,
        },
      ],
    },
    {
      name: "entries",
      description: "View the entries for an ongoing raffle.",
      type: 1,
    },
    {
      name: "addticket",
      description: "Add a ticket to a user.",
      type: 1,
      options: [
        {
          name: "user",
          description: "Member to add the tickets too.",
          type: "USER",
          required: true,
        },
        {
          name: "tickets",
          description: "Number of tickets to add.",
          type: "INTEGER",
          required: false,
          min: 1,
          max: 10,
        },
      ],
    },
    {
      name: "reset",
      description: "Cancel the ongoing raffle.",
      type: 1,
    },
    {
      name: "end",
      description: "End an ongoing raffle.",
      type: 1,
    },
    {
      name: "status",
      description: "View the status for an ongoing raffle.",
      type: 1,
    },
  ],
  async execute(interaction, client) {
    /*  if(interaction.guild.id === '805877804494618655') interaction.reply({content:'Coming soon',ephemeral:true});
     */ let guild = await Guild.findOne({ GuildID: interaction.guild.id });
    if (!guild) guild = new Guild({ GuildID: interaction.guild.id });
    if (interaction.options.getSubcommand() === "start") {
      const channeltoshow = interaction.options.getChannel("logchannel").id;
      const numwinner = interaction.options.getInteger("winners");
      if (guild.raffle && guild.raffle.enabled)
        return interaction.reply({
          content: "There is already a raffle going on in this server.",
          ephemeral: true,
        });
      await Guild.findOneAndUpdate(
        { GuildID: interaction.guild.id },
        {
          raffle: {
            host: interaction.user.id,
            entries: [],
            numwinner: numwinner,
            channel: channeltoshow,
            enabled: true,
          },
        },
        { upsert: true }
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setTitle("Raffle Started")
        .setColor(233790)
        .setFooter({
          text: `Hosted By┃${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          "┃Raffle has been started in the server.\n┃You can use `/raffle addticket` to add tickets to a user.\n┃Use `/raffle status` to check status of Raffle."
        );
      return interaction.reply({ embeds: [embed] });
    }
    if (interaction.options.getSubcommand() === "entries") {
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setTitle("Raffle Entries")
        .setColor(233790);
      if (!guild.raffle || !guild.raffle.enabled) {
        embed.setDescription("There is no Raffle going on in this server.");
        return interaction.reply({ embeds: [embed] });
      }
      if (!guild.raffle.entries || !guild.raffle.entries.length) {
        embed.setDescription("No one joined raffle yet.");
        return interaction.reply({ embeds: [embed] });
      } else {
        const entries = guild.raffle.entries;
        const msgArr = [];
        entries.forEach((g) => {
          msgArr.push(
            `${emos.dot}\`${entries.indexOf(g) + 1}\`│${g.user} - (\`${
              g.id
            }\`)\n`
          );
        });
        desc = {};
        let k,
          j,
          temporary,
          chunk = 15,
          p = 1;
        for (k = 0, j = msgArr.length; k < j; k += chunk) {
          temporary = msgArr.slice(k, k + chunk);
          desc[`${p}`] = new Discord.MessageEmbed()
            .setDescription(temporary.join(""))
            .setColor(233790)
            .setTitle(`**Lottery in ${interaction.guild.name}`);
          p++;
        }

        const embeds = [];
        for (let i = 0; i < Object.keys(desc).length; i++) {
          embeds.push(desc[i + 1]);
        }
        if (embeds.length === 1) interaction.reply({ embeds });
        paginate(embeds, interaction);
      }
    }
    if (interaction.options.getSubcommand() === "addticket") {
      if (!guild.raffle || !guild.raffle.enabled) {
        return interaction.reply({
          content: "There is no Raffle going on in this server.",
          ephemeral: true,
        });
      }
      const length = guild.raffle.entries.length;
      const array2 = [];
      const user = interaction.options.getUser("user");
      const number = interaction.options.getInteger("tickets") || 1;
      if (number > 25 || number < 1)
        return interaction.reply("Number of tickets must me between 1 and 25");
      for (let i = 0; i < parseInt(number); i++) {
        const ObjectID = require("mongodb").ObjectID;
        const idofelement = new ObjectID();
        array2.push({
          id: user.id,
          user: user.tag,
          _idofelement: idofelement,
        });
      }

      let number2000 = length;
      array2.forEach(async (r) => {
        await Guild.findOneAndUpdate(
          { GuildID: interaction.guild.id },
          { $push: { "raffle.entries": r } }
        );
        const embed2 = new Discord.MessageEmbed()
          .setTitle(`Raffle Ticket #${number2000 + 1}`)
          .setDescription(`\`${r.user}\` - <@${r.id}>`)
          .setFooter({ text: `ID: ${r.id}` })
          .setColor(233790);
        number2000++;
        const channel = client.channels.cache.get(guild.raffle.channel);
        if (channel)
          await channel.send({ embeds: [embed2] }).catch((err) => {
            return;
          });
      });
      interaction.reply(`Added ${number} tickets to <@${user.id}>`);
    }
    if (interaction.options.getSubcommand() === "status") {
      const embed2 = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setTitle("Raffle Status")
        .setColor(233790);
      if (!guild.raffle || !guild.raffle.enabled) {
        embed2.setDescription("There is no raffle going on in this server.");
        return interaction.reply({ embeds: [embed2] });
      } else {
        embed2.setDescription(
          `┃Hosted By: <@${guild.raffle.host}>\n┃Total Entries: \`${guild.raffle.entries.length}\``
        );
        return interaction.reply({ embeds: [embed2] });
      }
    }
    if (interaction.options.getSubcommand() === "reset") {
      const row = [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: "PRIMARY",
              custom_id: "Y",
              label: "Yes",
            },
            {
              type: 2,
              style: "DANGER",
              custom_id: "N",
              label: "No",
            },
          ],
        },
      ];
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setTitle("Reset Raffle")
        .setDescription(
          "WARNING! This will reset all data of raffle in this server.\nIf there is any raffle going on in server, It will reset that. Do you want to continue?"
        )
        .setColor("RED");
      const msg = await interaction.reply({
        embeds: [embed],
        components: row,
        fetchReply: true,
      });
      const collector = msg.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 15000,
      });

      collector.on("collect", async (i) => {
        if (i.user.id === interaction.user.id) {
          if (i.customId == "Y") {
            await Guild.findOneAndUpdate(
              { GuildID: interaction.guild.id },
              { $set: { raffle: {} } }
            );
            collector.stop("e");
            return i.reply(`${emos.tick} Ended the raffle`);
          } else {
            collector.stop("e");
            return i.reply(`${emos.cross} Cancelled deletion`);
          }
        } else {
          i.reply({
            content: `${emos.cross} These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });

      collector.on("end", (collected, reason) => {
        msg.edit({
          components: row.map((e) => {
            e.components = e.components.map((i) => {
              i.disabled = true;
              return i;
            });
            return e;
          }),
        });
      });
    }
    if (interaction.options.getSubcommand() === "end") {
      const row = [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: "PRIMARY",
              custom_id: "Y",
              label: "Yes",
            },
            {
              type: 2,
              style: "DANGER",
              custom_id: "N",
              label: "No",
            },
          ],
        },
      ];
      if (!guild.raffle || !guild.raffle.enabled) {
        return interaction.reply("There is no raffle in this server...");
      }
      if (!guild.raffle.entries || !guild.raffle.entries.length) {
        return interaction.reply("No one joined the raffle-");
      }
      const msg = await interaction.reply({
        content: `Are you sure? Do you want to end raffle hosted by <@${guild.raffle.host}>`,
        components: row,
        fetchReply: true,
      });
      const collector = msg.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 15000,
      });
      collector.on("collect", async (int) => {
        if (int.user.id === interaction.user.id) {
          if (int.customId == "Y") {
            const raffle = guild.raffle.entries;
            const numwinner = guild.raffle.numwinner;
            let winners = [];
            if (raffle.length <= numwinner) {
              winners = raffle; // Add everyone to the list of winners if the number of participants is less than or equal to the number winners
            } else {
              let index = 0;
              for (let i = 0; i < numwinner; i++) {
                index = Math.floor(Math.random() * (raffle.length - 1)); // Subtract 1 from peopleReacted.length to prevent an Array Out of Bounds exception
                if (!winners.includes(raffle[index]))
                  winners.push(raffle[index]);
                else i--; // Don't progress the loop if no winner is selected.
              }
            }

            let winner = winners.map((x) => `<@${x.id}>`).join(" ");
            const winningnumber = winners
              .map((x) => raffle.indexOf(x) + 1)
              .join(", ");

            if (winners.length < 1) winner = "No one";
            if (!winner) winner = "No one";
            if (!winner.length) winner = "No one";
            if (winner === "") winner = "No one";

            await Guild.findOneAndUpdate(
              { GuildID: interaction.guild.id },
              { $set: { raffle: {} } }
            );
            const embed = new Discord.MessageEmbed()
              .setAuthor({
                name: interaction.guild.name,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
              })
              .setTitle("Raffle Ended")
              .setColor(233790)
              .setDescription(
                `Winning Ticket Number: \`${winningnumber}\`\nWinner(s): ${winner}.\nTotal Entries: \`${raffle.length}\`\nHosted By: <@${guild.raffle.host}>`
              );
            return int.reply({ embeds: [embed] });
          } else {
            collector.stop("e");
            return int.reply("Alright, I ain't ending raffle yet.");
          }
        } else {
          msg.edit({
            components: row.map((e) => {
              e.components = e.components.map((i) => {
                i.disabled = true;
                return i;
              });
              return e;
            }),
          });
        }
      });
    }
  },
};
