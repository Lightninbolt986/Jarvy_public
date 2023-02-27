const fetch = require("node-fetch");
const { MessageEmbed, Collection } = require("discord.js");
const interval = new Collection();
interval.set("dog", new Collection());
interval.set("cat", new Collection());
interval.set("meme", new Collection());
interval.set("desimeme", new Collection());
module.exports = {
  name: "auto",
  description: "Autopost a vareity of different things",
  type: "CHAT_INPUT",
  permissions: {
    bot: ["EMBED_LINKS", "SEND_MESSAGES"],
    user: ["MANAGE_GUILD"],
  },
  options: [
    {
      name: "cat",
      description: "Autopost image of cats in current channel",
      type: 2,
      options: [
        {
          name: "enable",
          type: 1,
          description: "Enable auto posting",
          options: [
            {
              name: "time",
              description: "Time between each image posted(in seconds)",
              type: "INTEGER",
              required: true,
            },
          ],
        },
        {
          name: "disable",
          type: 1,
          description: "Disable auto posting",
        },
      ],
    },
    {
      name: "dog",
      description: "Autopost image of dogs in current channel",
      type: 2,
      options: [
        {
          name: "enable",
          type: 1,
          description: "Enable auto posting",
          options: [
            {
              name: "time",
              description: "Time between each image posted(in seconds)",
              type: "INTEGER",
              required: true,
            },
          ],
        },
        {
          name: "disable",
          type: 1,
          description: "Disable auto posting",
        },
      ],
    },
    {
      name: "meme",
      description: "Autopost memes in current channel",
      type: 2,
      options: [
        {
          name: "enable",
          type: 1,
          description: "Enable auto posting",
          options: [
            {
              name: "time",
              description: "Time between each image posted(in seconds)",
              type: "INTEGER",
              required: true,
            },
          ],
        },
        {
          name: "disable",
          type: 1,
          description: "Disable auto posting",
        },
      ],
    },
    {
      name: "desimeme",
      description: "Autopost desi memes in current channel",
      type: 2,
      options: [
        {
          name: "enable",
          type: 1,
          description: "Enable auto posting",
          options: [
            {
              name: "time",
              description: "Time between each image posted(in seconds)",
              type: "INTEGER",
              required: true,
            },
          ],
        },
        {
          name: "disable",
          type: 1,
          description: "Disable auto posting",
        },
      ],
    },
  ],
  async execute(interaction) {
    const subcmd = interaction.options.getSubcommandGroup();
    const type = interaction.options.getSubcommand();
    switch (subcmd) {
    case "cat":
      if (type == "enable") {
        const time = interaction.options.getInteger("time");
        const time_interval = time * 1000;
        if (time < 5 || time > 60 || !Number.isInteger(Number(time))) {
          return interaction.reply({
            content: "Enter a valid integer in seconds between 5 and 60",
            ephemeral: true,
          });
        }
        console.log(interval);
        if (interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Auto posting is already enabled, disable it first!",
            ephemeral: true,
          });
        interaction.reply({
          content: "Starting!",
          allowedMentions: {
            repliedUser: false,
          },
        });

        interval.get(subcmd).set(
          interaction.channel.id,
          setInterval(async () => {
            fetch("https://some-random-api.ml/img/cat").then((res) =>
              res.json().then((url) => {
                interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setTitle(
                        `Cat image requested by ${interaction.user.username}`
                      )
                      .setImage(url.link)
                      .setColor("BLUE")
                      .setFooter({ text: "Awww" }),
                  ],
                });
              })
            );
          }, time_interval)
        );
        console.log(interval);
      } else {
        if (!interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Autoposting is already disabled",
            ephemeral: true,
          });
        interaction.reply({
          content: "Stopped",
          allowedMentions: {
            repliedUser: false,
          },
        });
        clearInterval(interval.get(subcmd).get(interaction.channel.id));
        interval.get(subcmd).delete(interaction.channel.id);
      }

      break;
    case "dog":
      if (type == "enable") {
        const time = interaction.options.getInteger("time");
        const time_interval = time * 1000;
        if (time < 5 || time > 60 || !Number.isInteger(Number(time))) {
          return interaction.reply({
            content: "Enter a valid integer in seconds between 5 and 60",
            ephemeral: true,
          });
        }
        if (interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Auto posting is already enabled, disable it first!",
            ephemeral: true,
          });
        interaction.reply({
          content: "Starting!",
          allowedMentions: {
            repliedUser: false,
          },
        });

        interval.get(subcmd).set(
          interaction.channel.id,
          setInterval(async () => {
            fetch("https://some-random-api.ml/img/dog").then((res) =>
              res.json().then((url) => {
                interaction.followUp({
                  embeds: [
                    new MessageEmbed()
                      .setTitle(
                        `Dog image requested by ${interaction.user.username}`
                      )
                      .setImage(url.link)
                      .setColor("BLUE")
                      .setFooter({ text: "Awww" }),
                  ],
                });
              })
            );
          }, time_interval)
        );
      } else {
        if (!interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Autoposting is already disabled",
            ephemeral: true,
          });
        interaction.reply({
          content: "Stopped",
          allowedMentions: {
            repliedUser: false,
          },
        });
        clearInterval(interval.get(subcmd).get(interaction.channel.id));
        interval.get(subcmd).delete(interaction.channel.id);
      }

      break;
    case "meme":
      if (type == "enable") {
        const time = interaction.options.getInteger("time");
        const time_interval = time * 1000;
        if (time < 5 || time > 60 || !Number.isInteger(Number(time))) {
          return interaction.reply({
            content: "Enter a valid integer in seconds between 5 and 60",
            ephemeral: true,
          });
        }
        if (interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Auto posting is already enabled, disable it first!",
            ephemeral: true,
          });
        interaction.reply({
          content: "Starting!",
          allowedMentions: {
            repliedUser: false,
          },
        });


        interval.get(subcmd).set(
          interaction.channel.id,
          setInterval(async () => {
            fetch("https://meme-api.com/gimme").then((res) =>
              res.json().then((url) => {
                interaction
                  .followUp({
                    embeds: [
                      new MessageEmbed()
                        .setTitle(url.title)
                        .setURL(url.postLink)
                        .setImage(url.url)
                        .setAuthor({
                          name: url.author,
                          iconURL:
                              "https://cdn.discordapp.com/attachments/726083288170627125/849910787719168000/download__1_-removebg-preview.png",
                        })
                        .setDescription(`Requested by ${interaction.user.username}`)
                        .setTimestamp()
                        .setColor("BLUE")
                        .setFooter({
                          text: `Post from ${url.subreddit}, ${url.ups}👍`,
                        }),
                    ],
                  })
                  .catch(() => {});
              })
            );
          }, time_interval)
        );
      } else {
        if (!interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Autoposting is already disabled",
            ephemeral: true,
          });
        interaction.reply({
          content: "Stopped",
          allowedMentions: {
            repliedUser: false,
          },
        });
        clearInterval(interval.get(subcmd).get(interaction.channel.id));
        interval.get(subcmd).delete(interaction.channel.id);
      }

      break;
    case "automeme":
      if (type == "enable") {
        const time = interaction.options.getInteger("time");
        const time_interval = time * 1000;
        if (time < 5 || time > 60 || !Number.isInteger(Number(time))) {
          return interaction.reply({
            content: "Enter a valid integer in seconds between 5 and 60",
            ephemeral: true,
          });
        }
        if (interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Auto posting is already enabled, disable it first!",
            ephemeral: true,
          });
        interaction.reply({
          content: "Starting!",
          allowedMentions: {
            repliedUser: false,
          },
        });

        interval.get(subcmd).set(
          interaction.channel.id,
          setInterval(async () => {
            await fetch(
              "https://www.reddit.com/r/IndianDankMemes/top.json?limit=100&t=week"
            )
              .then((res) => res.json())
              .then((json) => json.data)
              .then((data) => {
                const data2 =
                    data.children[
                      Math.floor(Math.random() * (data.children.length + 1))
                    ].data;

                const embed = new MessageEmbed()
                  .setColor("BLUE")
                  .setTitle(data2.title)
                  .setURL(`http://www.reddit.com${data2.permalink}`)
                  .setAuthor({
                    name: data2.author_fullname,
                    iconURL:
                        "https://cdn.discordapp.com/attachments/726083288170627125/849910787719168000/download__1_-removebg-preview.png",
                  })
                  .setDescription(`Requested by ${interaction.user.username}`)
                  .setImage(data2.url)
                  .setTimestamp()
                  .setFooter({
                    text: `Post from r/${data2.subreddit}, ${data2.ups}👍`,
                  });
                interaction.followUp({ embeds: [embed] });
              });
          }, time_interval)
        );
      } else {
        if (!interval.get(subcmd).has(interaction.channel.id))
          return interaction.reply({
            content: "Autoposting is already disabled",
            ephemeral: true,
          });
        interaction.reply({
          content: "Stopped",
          allowedMentions: {
            repliedUser: false,
          },
        });
        clearInterval(interval.get(subcmd).get(interaction.channel.id));
        interval.get(subcmd).delete(interaction.channel.id);
      }

      break;
    }
  },
};
