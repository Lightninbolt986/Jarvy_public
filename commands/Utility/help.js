const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = 'j!'
let color = "20e4dc"
const {create_mh} = require(`../../functions`)
module.exports = {
  name: "help",
  aliases: ['h'],
  description: "Shows all available bot commands.",
  async execute(message, args, cmd, client, Discord) {
    const emo = {
      utility: '<:jarvy_util:893217287522357279>' ,
      nsfw: '<:jarvy_nsfw:893216903907135548>' ,
      fun: '<:jarvy_fun:893216745551196191>' ,
      animations:'<a:jarvy_animation:893216666777956412>', 
      autoposting: '<:jarvy_auto:893217211823587390>' ,
      music:  ' <:jarvy_moosic:893217343193382988>' ,
      giveaway: '<:jarvy_gw:893216817147961374>', 
      image: '<:jarvy_img:893216970307149904>' ,
      facts:  '<:jarvy_fax:893217154034466827>' ,
      uno: '<:jarvy_uno:893217104310960178>', 
      roleplay: '<:jarvy_rp:893217028691881994>' ,
      under_maintainance:  '<:broken:879049755865514024>' 
  }
  const descriptions = {
    utility: 'Useful and helpful commands' ,
    nsfw: 'Horni much?' ,
    fun: 'Game commands. Play with friends' ,
    animations:'Various animations to play', 
    autoposting: 'Automated posting of images' ,
    music:  'Listen to music woo' ,
    giveaway: ' Host giveaways in your server', 
    image: 'Images and image manipulation' ,
    facts:  'Learn something new' ,
    uno: 'Play UNO with friends!', 
    roleplay: 'Express your actions in form of gifs'
}

    if (!args[0]) {
      let categories = [];
      let cots = []
      



      //categories to ignore
      let ignored = [
        "economy",
        "owner",
        "under_maintainance",
        'suggestions',
      ];


      let ccate = [];
      readdirSync("././commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        if (!message.channel.nsfw && dir.toLowerCase() == 'nsfw') return
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} **${dir.toUpperCase()}**`
        let nome = dir.toUpperCase();
        let cats = new Object();
        cats = {
          name: name,
          value: `<:jarvy_replycont:893214149004390460> \`${prefix}help ${dir.toLowerCase()}\`\n<:jarvy_reply:893214082457550889> ${descriptions[dir.toLowerCase()]}`,
          inline: false
        }

    

        categories.push(cats);
        ccate.push(nome)
        //cots.push(dir.toLowerCase());
      });

      const embed = new MessageEmbed()
        .setDescription(
          `\`\`\`js\nPrefix: ${prefix}\`\`\`\n[Invite me](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\nTo check out a category, use command \`${prefix}help [category]\`.`
        )
        .addFields(categories)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        .setTimestamp()
        .setAuthor('Jarvy help menu:', client.user.displayAvatarURL({
          dynamic: true
        }))
        .setColor(color);
        let menus = create_mh(ccate);
        return message.channel.send({ embeds: [embed], components: menus.smenu }).then((msgg) => {

            const menuID = menus.sid;
    
            const select = async (interaction) => {
              if (interaction.customId != menuID) return;
    
              let {
                values
              } = interaction;
    
              let value = values[0];
    
              let catts = [];
              let catts2 = [];
              let catts3 = [];
              readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== value.toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
                );
    
    
                const cmds = commands.map((command) => {
                  let file = require(`../../commands/${dir}/${command}`);
    
                  if (!file.name) return "No command name.";
    
                  let name = file.name.replace(".js", "");
    
                  if (client.commands.get(name).hidden) return;
    
    
                  let des = client.commands.get(name).description;
                  let emo = client.commands.get(name).emoji;
                  let emoe = emo ? `${emo} - ` : '';
    
 
                            let obj = {
            cname: `<:jarvy_bullet:893214026258083850> **${name}**`,
            des: `<:jarvy_reply:893214082457550889> \`${des}\``
          }
    
                  return obj;
                });
    
                let dota = new Object();
    
                cmds.map(co => {
                  if (co == undefined) return;
                  dota = {
                    name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                    value: co.des ? co.des : 'No Description',
                    inline: false,
                  }
                
                  if (catts.length < 20) {
                    catts.push(dota)
                  } else if (catts2.length < 20) {
                    catts2.push(dota)
                  } else if (catts3.length < 20) {
                    catts3.push(dota)
                  }
                });
                cots.push(dir.toLowerCase());
              });
    
//                return interaction.message.edit({ embeds: [combed], components: menus.smenu })
                if (cots.includes(value.toLowerCase())) {
                 value = value.toLowerCase()
                  await interaction.deferUpdate();
                  if (catts3.length > 0) {
                    console.log
                    const combed1 = new MessageEmbed()
                      .setTitle(`${emo[value]} __${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                      .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                      .addFields(catts)
                      .setColor(color)
                    const combed2 = new MessageEmbed()
                      .setTitle(`${emo[value]} __${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                      .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                      .addFields(catts2)
                      .setColor(color)
                    const combed3 = new MessageEmbed()
                      .setTitle(`${emo[value]} __${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                      .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                      .addFields(catts3)
                      .setColor(color)
                    return interaction.message.edit({embeds:[combed1, combed2, combed3], components: menus.smenu})
                  }
                  else if (catts2.length > 0) {
                    const combed1 = new MessageEmbed()
                      .setTitle(`${emo[value]} __${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                      .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                      .addFields(catts)
                      .setColor(color)
                    const combed2 = new MessageEmbed()
                      .setTitle(`${emo[value]} __${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                      .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                      .addFields(catts2)
                      .setColor(color)
                    return interaction.message.edit({embeds: [combed1, combed2], components: menus.smenu})
                  } else {
                    const combed1 = new MessageEmbed()
                      .setTitle(`${emo[value]} __${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                      .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                      .addFields(catts)
                      .setColor(color)
                    return interaction.message.edit({embeds:[combed1], components: menus.smenu})
                  }
                }
    
            };
    
            const filter = (interaction) => { return !interaction.user.bot && interaction.user.id == message.author.id };
    
            const collector = msgg.createMessageComponentCollector({ filter, componentType: "SELECT_MENU" });
            collector.on("collect", select);
            collector.on("end", () => null);
    
          });
    } else {
      let cots = [];
      let catts = [];
      let catts2 = [];
      let catts3 = [];

      readdirSync("././commands/").forEach((dir) => {
        if (!message.channel.nsfw && dir.toLowerCase() == 'nsfw') return
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`././commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        


        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = client.commands.get(name).description;
          let emo = client.commands.get(name).emoji;

          let obj = {
            cname: `<:jarvy_bullet:893214026258083850> **${name}**`,
            des: `<:jarvy_reply:893214082457550889> \`${des}\``
          }

          return obj;
        });

        let dota = new Object();

        cmds.map(co => {
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : 'No Description',
            inline: false,
          }
          if (catts.length < 20) {
            catts.push(dota)
          } else if (catts2.length < 20) {
            catts2.push(dota)
          } else if (catts3.length < 20) {
            catts3.push(dota)
          }
        });

        cots.push(dir.toLowerCase());
      });

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (cots.includes(args[0].toLowerCase())) {
        console.log('e')
        if (catts3.length > 0) {
          const combed1 = new MessageEmbed()
            .setTitle(`${emo[args[0]]} __${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
            .addFields(catts)
            .setColor(color)
          const combed2 = new MessageEmbed()
            .setTitle(`${emo[args[0]]} __${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
            .addFields(catts2)
            .setColor(color)
          const combed3 = new MessageEmbed()
            .setTitle(`${emo[args[0]]} __${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
            .addFields(catts3)
            .setColor(color)
          return message.channel.send({embeds:[combed1, combed2, combed3]})
        }
        else if (catts2.length > 0) {
          const combed1 = new MessageEmbed()
            .setTitle(`${emo[args[0]]} __${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
            .addFields(catts)
            .setColor(color)
          const combed2 = new MessageEmbed()
            .setTitle(`${emo[args[0]]} __${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
            .addFields(catts2)
            .setColor(color)
          return message.channel.send({embeds: [combed1, combed2]})
        } else {
          const combed1 = new MessageEmbed()
            .setTitle(`${emo[args[0]]} __${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
            .addFields(catts)
            .setColor(color)
          return message.channel.send({embeds:[combed1]})
        }
      }
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("RED");
        return message.channel.send({embeds:[embed]});
      }

      const embed = new MessageEmbed()
        .setTitle(`${command.name.charAt(0).toUpperCase() + command.name.slice(1)} help`)
        .addField(
          "<:jarvy_bullet:893214026258083850> Aliases:",
          command.aliases ?
            `<:jarvy_reply:893214082457550889> \`${command.aliases.join("` `")}\`` :
            "<:jarvy_reply:893214082457550889> No aliases for this command."
        )
        .addField(
          "<:jarvy_bullet:893214026258083850> Usage:",
          command.usage ?
            `<:jarvy_reply:893214082457550889> \`${prefix}${command.name} ${command.usage}\`` :
            `<:jarvy_reply:893214082457550889> \`${prefix}${command.name}\``
        )
        .addField(
          "<:jarvy_bullet:893214026258083850> Command Description:",
          command.description ?
          `<:jarvy_reply:893214082457550889> ${command.description}` :
            "<:jarvy_reply:893214082457550889> No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send({embeds:[embed]});
    }
  },
};