const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = "/";
const color = "20e4dc";
const { create_mh, paginate } = require("../../functions");
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows all available bot commands.",
  options: [
    {
      name: "command",
      description: "Get help for a command",
      type: 1,
      options: [
        {
          name: "name",
          description: "The command name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "category",
      description: "Get help for a category",
      type: 1,
      options: [
        {
          name: "name",
          description: "The category name",
          type: 3,
          required: true,
        },
      ],
    },
    {
      name: "menu",
      description: "Get the main help menu",
      type: 1,
    },
  ],
  async execute(interaction, client) {
    await interaction.deferReply();
    const cmds2 = await client.application.commands.fetch();
    const emo = {
      utility: "<:jarvy_util:893217287522357279>",
      nsfw: "<:jarvy_nsfw:893216903907135548>",
      games: "<:jarvy_fun:893216745551196191>",
      fun: "TODO",
      animations: "<a:jarvy_animation:893216666777956412>",
      autoposting: "<:jarvy_auto:893217211823587390>",
      music: " <:jarvy_moosic:893217343193382988>",
      giveaway: "<:jarvy_gw:893216817147961374>",
      image: "<:jarvy_img:893216970307149904>",
      facts: "<:jarvy_fax:893217154034466827>",
      uno: "<:jarvy_uno:893217104310960178>",
      roleplay: "<:jarvy_rp:893217028691881994>",
      under_maintainance: "<:broken:879049755865514024>",
    };
    const descriptions = {
      utility: "Useful and helpful commands",
      nsfw: "Horni much?",
      fun: "Fun commands. Enjoy with friends",
      games: "Games commands. Play solo or in groups",
      animations: "Various animations to play",
      autoposting: "Automated posting of images",
      music: "Listen to music woo",
      giveaway: " Host giveaways in your server",
      image: "Images and image manipulation",
      facts: "Learn something new",
      uno: "Play UNO with friends!",
      roleplay: "Express your actions in form of gifs",
    };
    const subc = interaction.options.getSubcommand();
    if (subc == "menu") {
      const categories = [];
      const cots = [];

      // categories to ignore
      const ignored = ["economy", "Owner", "under_maintainance", "suggestions"];

      const ccate = [];
      readdirSync("././SlashCommands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        if (!interaction.channel.nsfw && dir.toLowerCase() == "nsfw") return;
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} **${dir.toUpperCase()}**`;
        const nome = dir.toUpperCase();
        let cats = new Object();
        cats = {
          name: name,
          value: `<:jarvy_replycont:893214149004390460> \`${prefix}help category ${dir.toLowerCase()}\`\n<:jarvy_reply:893214082457550889> ${
            descriptions[dir.toLowerCase()]
          }`,
          inline: false,
        };

        categories.push(cats);
        ccate.push(nome);
      });

      const embed = new MessageEmbed()
        .setDescription(
          `\`\`\`js\nPrefix: ${prefix}\`\`\`\n[Invite me](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\nTo check out a category, use command \`${prefix}help category [category]\`.`
        )
        .addFields(categories)
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({
            dynamic: true,
          }),
        })
        .setTimestamp()
        .setAuthor({
          name: "Jarvy help menu:",
          iconURL: client.user.displayAvatarURL({
            dynamic: true,
          }),
        })
        .setColor(color);
      const menus = create_mh(ccate);
      const msgg = await interaction.editReply({
        embeds: [embed],
        components: menus.smenu,
        fetchReply: true,
      });

      const menuID = menus.sid;

      const select = async (i) => {
        if (i.customId != menuID) return;

        const { values } = i;

        let value = values[0];

        const big_cat = [];
        readdirSync("./SlashCommands/").forEach((dir) => {
          if (dir.toLowerCase() !== value.toLowerCase()) return;
          const commands = readdirSync(`./SlashCommands/${dir}/`).filter(
            (file) => file.endsWith(".js")
          );

          const cmds = commands.map((command) => {
            const file = require(`../../SlashCommands/${dir}/${command}`);
            if (!file?.name) return;
            if (file.type == "MESSAGE" || file.type == "USER") return;
            const name = file.name.replace(".js", "");

            if (client.slashCommands.get(name).hidden) return;

            const des = client.slashCommands.get(name).description;
            const id = cmds2.find((c) => c.name === name).id;
            const obj = {
              cname: `<:jarvy_bullet:893214026258083850> </${name}:${id}>`,
              des: `<:jarvy_reply:893214082457550889> \`${
                des || "No Description"
              }\``,
            };

            return obj;
          });

          let dota = new Object();

          cmds.map((co) => {
            if (co == undefined) return;
            dota = {
              name: `${cmds.length === 0 ? "In progress." : co.cname}`,
              value: co.des ? co.des : "No Description",
              inline: false,
            };
            const stri = `${dota.name}\n${dota.value}\n`;
            big_cat.push(stri);
          });
          cots.push(dir.toLowerCase());
        });

        //                return interaction.message.edit({ embeds: [combed], components: menus.smenu })
        if (cots.includes(value.toLowerCase())) {
          value = value.toLowerCase();
          await i.deferUpdate();
          const chunkSize = 15;
          const embedss = [];
          for (let int = 0; i < big_cat.length; int += chunkSize) {
            const chunk = big_cat.slice(int, int + chunkSize);
            embedss.push(
              new MessageEmbed()
                .setTitle(
                  `${emo[value]} __${
                    value.charAt(0).toUpperCase() + value.slice(1)
                  } Commands!__`
                )
                .setDescription(
                  `Use \`${prefix}help command\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help command ping\`.\n\n${chunk.join(
                    "\n"
                  )}`
                )
                .setColor(color)
            );
          }
          paginate(embedss, i, menus.smenu, true);
        }
      };

      const filter = (i) => {
        return !i.user.bot && i.user.id == interaction.user.id;
      };

      const collector = msgg.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
      });
      collector.on("collect", select);
      collector.on("end", () => {
        collector.message.edit({
          // disable buttons
          components: collector.message.components.map((e) => {
            e.components = e.components.map((i) => {
              i.disabled = true;
              return i;
            });
            return e;
          }),
        });
      });
    } else if (subc == "category") {
      let value = interaction.options.getString("name");
      const big_cat = [];
      const cots = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        if (dir.toLowerCase() !== value.toLowerCase()) return;
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          const file = require(`../../SlashCommands/${dir}/${command}`);
          if (!file?.name) return;
          if (file.type == "MESSAGE" || file.type == "USER") return;
          const name = file.name.replace(".js", "");

          if (client.slashCommands.get(name).hidden) return;

          const des = client.slashCommands.get(name).description;
          const id = cmds2.find((c) => c.name === name).id;
          const obj = {
            cname: `<:jarvy_bullet:893214026258083850> </${name}:${id}>`,
            des: `<:jarvy_reply:893214082457550889> \`${
              des || "No Description"
            }\``,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          if (co == undefined) return;
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: false,
          };
          const stri = `${dota.name}\n${dota.value}\n`;
          big_cat.push(stri);
        });
        cots.push(dir.toLowerCase());
      });

      //                return interaction.message.edit({ embeds: [combed], components: menus.smenu })
      if (cots.includes(value.toLowerCase())) {
        value = value.toLowerCase();
        const chunkSize = 15;
        const embedss = [];
        for (let i = 0; i < big_cat.length; i += chunkSize) {
          const chunk = big_cat.slice(i, i + chunkSize);
          embedss.push(
            new MessageEmbed()
              .setTitle(
                `${emo[value]} __${
                  value.charAt(0).toUpperCase() + value.slice(1)
                } Commands!__`
              )
              .setDescription(
                `Use \`${prefix}help command\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help command ping\`.\n\n${chunk.join(
                  "\n"
                )}`
              )
              .setColor(color)
          );
        }
        paginate(embedss, interaction);
      } else {
        interaction.editReply("Invalid category!");
      }
    } else if (subc == "command") {
      const value = interaction.options.getString("name");
      const command =
        client.slashCommands.get(value.toLowerCase()) ||
        client.slashCommands.find(
          (c) => c.aliases && c.aliases.includes(value.toLowerCase())
        );
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return interaction.reply({ embeds: [embed] });
      }

      const id = cmds2.find((c) => c.name === command.name).id;
      const embed = new MessageEmbed()
        .setTitle(
          `${command.name.charAt(0).toUpperCase() + command.name.slice(1)} help`
        )
        .addField(
          "<:jarvy_bullet:893214026258083850> Usage:",
          `</${command.name}:${id}>`
        )
        .addField(
          "<:jarvy_bullet:893214026258083850> Command Description:",
          command.description
            ? `<:jarvy_reply:893214082457550889> ${command.description}`
            : "<:jarvy_reply:893214082457550889> No description for this command."
        )
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({
            dynamic: true,
          }),
        })
        .setTimestamp()
        .setColor(color);
      return interaction.editReply({ embeds: [embed] });
    }
  },
};
