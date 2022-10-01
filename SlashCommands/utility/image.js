const Discord = require("discord.js");
const api = require("imageapi.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "image",
  description: "Get a variety of different images",
  options: [
    {
      name: "meme",
      description: "Get a random meme from reddit",
      type: 1,
    },
    {
      name: "bird",
      description: "Get a bird image",
      type: 1,
    },
    {
      name: "cat",
      description: "Get a vat image",
      type: 1,
    },
    {
      name: "dog",
      description: "Get a dog image",
      type: 1,
    },
    {
      name: "cute",
      description: "Get a random cute animal image",
      type: 1,
    },
  ],
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "meme") {
      const fetch = require("node-fetch");
      async function embed() {
        let embed1 = null;
        await fetch(`https://meme-api.herokuapp.com/gimme`).then((res) =>
          res.json().then((url) => {
            embed1 = new Discord.MessageEmbed()
              .setTitle(url.title)
              .setImage(url.url)
              .setTimestamp()
              .setColor("BLURPLE")
              .setFooter({ text: `${url.ups} 👍` });
          })
        );
        return embed1;
      }
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload Meme")
          .setStyle("SECONDARY")
      );
      const disabled = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload Meme")
          .setStyle("SECONDARY")
          .setDisabled(true)
      );

      let m = await interaction.reply({
        embeds: [await embed()],
        components: [row],
        fetchReply: true,
      });

      const collector = m.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 120000,
      });
      collector.on("collect", async (i) => {
        if (i.user.id === interaction.user.id) {
          i.deferUpdate();
          await update(m);
          collector.stop();
        } else {
          i.reply({
            content: `These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });
      collector.on("end", (mes, r) => {
        if (r == "time") {
          m.edit({
            components: [disabled],
          });
        }
      });

      async function update(m) {
        m.edit({
          embeds: [await embed()],
        }).catch((e) => console.log(e.requestData.json.embeds));

        const collector = m.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 120000,
        });
        collector.on("collect", async (i) => {
          if (i.user.id === interaction.user.id) {
            i.deferUpdate();
            await update(m);
            collector.stop();
          } else {
            i.reply({
              content: `These buttons aren't for you!`,
              ephemeral: true,
            });
          }
        });
        collector.on("end", (mes, r) => {
          if (r == "time") {
            m.edit({
              components: [disabled],
            });
          }
        });
      }
    } else if (interaction.options.getSubcommand() === "bird") {
      const fetch = require("node-fetch");
      async function embed() {
        let embed1 = null;
        await fetch(`https://some-random-api.ml/img/bird`).then((res) =>
          res.json().then((url) => {
            embed1 = new MessageEmbed()
              .setTitle(`Bird image requested by ${interaction.user.username}`)
              .setImage(url.link)
              .setColor("BLUE")
              .setFooter("Awww");
          })
        );
        return embed1;
      }
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
      );
      const disabled = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
          .setDisabled(true)
      );

      let m = await interaction.reply({
        embeds: [await embed()],
        components: [row],
        fetchReply: true,
      });

      const collector = m.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 120000,
      });
      collector.on("collect", async (i) => {
        if (i.user.id === interaction.user.id) {
          i.deferUpdate();
          await update(m);
          collector.stop();
        } else {
          i.reply({
            content: `These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });
      collector.on("end", (mes, r) => {
        if (r == "time") {
          m.edit({
            components: [disabled],
          });
        }
      });

      async function update(m) {
        m.edit({
          embeds: [await embed()],
        }).catch((e) => console.log(e.requestData.json.embeds));

        const collector = m.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 120000,
        });
        collector.on("collect", async (i) => {
          if (i.user.id === interaction.user.id) {
            i.deferUpdate();
            await update(m);
            collector.stop();
          } else {
            i.reply({
              content: `These buttons aren't for you!`,
              ephemeral: true,
            });
          }
        });
        collector.on("end", (mes, r) => {
          if (r == "time") {
            m.edit({
              components: [disabled],
            });
          }
        });
      }
    } else if (interaction.options.getSubcommand() === "cat") {
      const fetch = require("node-fetch");
      async function embed() {
        let embed1 = null;
        await fetch(`https://some-random-api.ml/img/cat`).then((res) =>
          res.json().then((url) => {
            embed1 = new MessageEmbed()
              .setTitle(`Cat image requested by ${interaction.user.username}`)
              .setImage(url.link)
              .setColor("BLUE")
              .setFooter("Awww");
          })
        );
        return embed1;
      }
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
      );
      const disabled = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
          .setDisabled(true)
      );

      let m = await interaction.reply({
        embeds: [await embed()],
        components: [row],
        fetchReply: true,
      });

      const collector = m.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 120000,
      });
      collector.on("collect", async (i) => {
        if (i.user.id === interaction.user.id) {
          i.deferUpdate();
          await update(m);
          collector.stop();
        } else {
          i.reply({
            content: `These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });
      collector.on("end", (mes, r) => {
        if (r == "time") {
          m.edit({
            components: [disabled],
          });
        }
      });

      async function update(m) {
        m.edit({
          embeds: [await embed()],
        }).catch((e) => console.log(e.requestData.json.embeds));

        const collector = m.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 120000,
        });
        collector.on("collect", async (i) => {
          if (i.user.id === interaction.user.id) {
            i.deferUpdate();
            await update(m);
            collector.stop();
          } else {
            i.reply({
              content: `These buttons aren't for you!`,
              ephemeral: true,
            });
          }
        });
        collector.on("end", (mes, r) => {
          if (r == "time") {
            m.edit({
              components: [disabled],
            });
          }
        });
      }
    } else if (interaction.options.getSubcommand() === "bird") {
      const fetch = require("node-fetch");
      async function embed() {
        let embed1 = null;
        await fetch(`https://some-random-api.ml/img/dog`).then((res) =>
          res.json().then((url) => {
            embed1 = new MessageEmbed()
              .setTitle(`Dog image requested by ${interaction.user.username}`)
              .setImage(url.link)
              .setColor("BLUE")
              .setFooter("Awww");
          })
        );
        return embed1;
      }
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
      );
      const disabled = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
          .setDisabled(true)
      );

      let m = await interaction.reply({
        embeds: [await embed()],
        components: [row],
        fetchReply: true,
      });

      const collector = m.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 120000,
      });
      collector.on("collect", async (i) => {
        if (i.user.id === interaction.user.id) {
          i.deferUpdate();
          await update(m);
          collector.stop();
        } else {
          i.reply({
            content: `These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });
      collector.on("end", (mes, r) => {
        if (r == "time") {
          m.edit({
            components: [disabled],
          });
        }
      });

      async function update(m) {
        m.edit({
          embeds: [await embed()],
        }).catch((e) => console.log(e.requestData.json.embeds));

        const collector = m.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 120000,
        });
        collector.on("collect", async (i) => {
          if (i.user.id === interaction.user.id) {
            i.deferUpdate();
            await update(m);
            collector.stop();
          } else {
            i.reply({
              content: `These buttons aren't for you!`,
              ephemeral: true,
            });
          }
        });
        collector.on("end", (mes, r) => {
          if (r == "time") {
            m.edit({
              components: [disabled],
            });
          }
        });
      }
    } else if (interaction.options.getSubcommand() === "cute") {
      await interaction.deferReply();
      const fetch = require("node-fetch");
      async function embed() {
        let embed1 = null;
        await fetch(`https://www.reddit.com/r/aww/top.json?limit=100&t=week`)
          .then((res) => res.json())
          .then((json) => json.data)
          .then((data) => {
            const data2 =
              data.children[
                Math.floor(Math.random() * (data.children.length + 1))
              ].data;
            embed1 = new MessageEmbed()
              .setColor("BLUE")
              .setTitle(data2.title)
              .setURL(`http://www.reddit.com${data2.permalink}`)
              .setAuthor({
                name: data2.author_fullname,
                iconURL:
                  "https://cdn.discordapp.com/attachments/726083288170627125/849910787719168000/download__1_-removebg-preview.png",
              })
              .setDescription(`Requested by ${interaction.user}`)
              .setImage(data2.url)
              .setTimestamp()
              .setFooter({
                text: `Post from r/${data2.subreddit}, ${data2.ups}👍`,
              });
          });
        return embed1;
      }
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
      );
      const disabled = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("reload")
          .setLabel("Reload image")
          .setStyle("SECONDARY")
          .setDisabled(true)
      );
      const embe = await embed();
      let m = await interaction.editReply({
        embeds: [embe],
        components: [row],
        fetchReply: true,
      });

      const collector = m.createMessageComponentCollector({
        componentType: "BUTTON",
        time: 120000,
      });
      collector.on("collect", async (i) => {
        if (i.user.id === interaction.user.id) {
          i.deferUpdate();
          await update(m);
          collector.stop();
        } else {
          i.reply({
            content: `These buttons aren't for you!`,
            ephemeral: true,
          });
        }
      });
      collector.on("end", (mes, r) => {
        if (r == "time") {
          m.edit({
            components: [disabled],
          });
        }
      });

      async function update(m) {
        m.edit({
          embeds: [await embed()],
        }).catch((e) => console.log(e.requestData.json.embeds));

        const collector = m.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 120000,
        });
        collector.on("collect", async (i) => {
          if (i.user.id === interaction.user.id) {
            i.deferUpdate();
            await update(m);
            collector.stop();
          } else {
            i.reply({
              content: `These buttons aren't for you!`,
              ephemeral: true,
            });
          }
        });
        collector.on("end", (mes, r) => {
          if (r == "time") {
            m.edit({
              components: [disabled],
            });
          }
        });
      }
    }
  },
};
