const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Aki } = require("aki-api");
const isPlaying = new Set();
const attemptingGuess = new Set();
const image_finder = require("image-search-engine");
const row = new MessageActionRow().addComponents(
  new MessageButton().setLabel("Yes").setStyle("SECONDARY").setCustomId("y"),
  new MessageButton().setLabel("No").setStyle("SECONDARY").setCustomId("n"),
  new MessageButton()
    .setLabel("I don't know")
    .setStyle("SECONDARY")
    .setCustomId("i"),
  new MessageButton()
    .setLabel("Probably")
    .setStyle("SECONDARY")
    .setCustomId("p"),
  new MessageButton()
    .setLabel("Probably not")
    .setStyle("SECONDARY")
    .setCustomId("pn")
);
const row2 = new MessageActionRow().addComponents(
  new MessageButton().setLabel("Back").setStyle("SECONDARY").setCustomId("b"),
  new MessageButton().setLabel("Stop").setStyle("SECONDARY").setCustomId("s")
);
const rowYN = new MessageActionRow().addComponents(
  new MessageButton().setLabel("Yes").setStyle("SECONDARY").setCustomId("y"),
  new MessageButton().setLabel("No").setStyle("SECONDARY").setCustomId("n")
);
module.exports = {
  name: "akinator",
  description: "Play a game of akinator",
  type: "CHAT_INPUT",
  async execute(interaction, client) {
    // try {

    let usertag = interaction.user.tag;
    let avatar = interaction.user.displayAvatarURL();
    if (isPlaying.has(interaction.user.id)) {
      let isPlayingEmbed = new MessageEmbed()
        .setAuthor({ name: usertag, iconURL: avatar })
        .setTitle(`You're Already Playing!`)
        .setDescription("Stop current game to start another one.")
        .setColor("RED");

      return interaction.reply({ embeds: [isPlayingEmbed], ephmeral: true });
    }

    isPlaying.add(interaction.user.id);

    let startEmbed = new MessageEmbed()
      .setAuthor({ name: usertag, iconURL: avatar })
      .setTitle(`Starting Akinator...`)
      .setDescription("Game will begin Shortly")
      .setColor("RANDOM");

    await interaction.reply({
      embeds: [startEmbed],
      fetchReply: true,
    });

    let aki = new Aki({ region: "en" });
    await aki.start();

    let notFinished = true;
    let stepsSinceLastGuess = 0;

    let noReplyEmbed = new MessageEmbed()
      .setAuthor({ name: usertag, iconURL: avatar })
      .setTitle(`Game Ended`)
      .setDescription(
        `**${interaction.user.username}, Your Game ended due to inactivity.**`
      )
      .setColor("RANDOM");

    let akiEmbed = new MessageEmbed()
      .setAuthor({ name: usertag, iconURL: avatar })
      .setTitle(`Question ${aki.currentStep + 1}`)
      .setDescription(`**Progress: 0%\n${aki.question}**`)
      .addField(
        "Please press...",
        "**Yes**\n**No**\n**I don't know**\n**Probably**\n**Probably Not**\n**Back**"
      )
      .setFooter({ text: `You can also press "Stop" to End your Game` })
      .setColor("RANDOM");
    let akiMessage = await interaction.editReply({
      embeds: [akiEmbed],
      components: [row, row2],
      fetchReply: true,
    });
    client.on("messageDelete", async (deletedMessage) => {
      if (deletedMessage.id == akiMessage.id) {
        notFinished = false;
        isPlaying.delete(interaction.user.id);
        attemptingGuess.delete(interaction.guild.id);
        await aki.win();
        return;
      }
    });

    while (notFinished) {
      if (!notFinished) return;

      stepsSinceLastGuess = stepsSinceLastGuess + 1;

      if (
        ((aki.progress >= 95 && stepsSinceLastGuess >= 5) ||
          aki.currentStep >= 78) &&
        !attemptingGuess.has(interaction.guild.id)
      ) {
        attemptingGuess.add(interaction.guild.id);
        await aki.win();

        stepsSinceLastGuess = 0;

        let guessEmbed = new MessageEmbed()
          .setAuthor({ name: usertag, iconURL: avatar })
          .setTitle(
            `I'm ${Math.round(aki.progress)}% Sure your Character is...`
          )
          .setDescription(
            `**${aki.answers[0].name}**\n${aki.answers[0].description}\n\nIs this your Character? **(Click Yes or No)**`
          )
          .addField("Ranking", `**#${aki.answers[0].ranking}**`, true)
          .addField("No. of Questions", `**${aki.currentStep}**`, true)
          .setImage(
            await image_finder.find(aki.answers[0].name, { size: "large" })
          )
          .setColor("RANDOM");
        await interaction.channel.messages.edit(akiMessage.id, {
          embeds: [guessEmbed],
          components: [rowYN],
        });

        await akiMessage
          .awaitMessageComponent({
            time: 60000,
            componentType: "BUTTON",
          })
          .then(async (int) => {
            const answer = int.customId;
            attemptingGuess.delete(interaction.guild.id);
            if (answer == "y") {
              let finishedGameCorrect = new MessageEmbed()
                .setAuthor({ name: usertag, iconURL: avatar })
                .setTitle(`Well Played!`)
                .setDescription(
                  `**${interaction.user.username}, i guessed it right :D**`
                )
                .addField("Character", `**${aki.answers[0].name}**`, true)
                .addField("Ranking", `**#${aki.answers[0].ranking}**`, true)
                .addField("No. of Questions", `**${aki.currentStep}**`, true)
                .setThumbnail(await image_finder.find(aki.answers[0].name))
                .setColor("RANDOM");
              await int.update({
                embeds: [finishedGameCorrect],
                components: [],
              });
              notFinished = false;
              isPlaying.delete(interaction.user.id);
              return;
            } else if (guessAnswer == "n") {
              if (aki.currentStep >= 78) {
                let finishedGameDefeated = new MessageEmbed()
                  .setAuthor({ name: usertag, iconURL: avatar })
                  .setTitle(`Well Played!`)
                  .setDescription(
                    `**${interaction.user.username}, oof, you defeated me D:**`
                  )
                  .setColor("RANDOM");
                await int.update({
                  embeds: [finishedGameDefeated],
                  components: [],
                });
                notFinished = false;
                isPlaying.delete(interaction.user.id);
              } else {
                aki.progress = 50;
              }
            }
          })
          .catch(async (e) => {
            akiMessage.edit({
              components: [row, row2].map((e) => {
                e.components = e.components.map((i) => {
                  i.disabled = true;
                  return i;
                });
                return e;
              }),
              embeds: [noReplyEmbed],
            });
          });
      }

      if (!notFinished) return;

      let updatedAkiEmbed = new MessageEmbed()
        .setAuthor({ name: usertag, iconURL: avatar })
        .setTitle(`Question ${aki.currentStep + 1}`)
        .setDescription(
          `**Progress: ${Math.round(aki.progress)}%\n${aki.question}**`
        )
        .addField(
          "Please press...",
          "**Yes**\n**No**\n**I don't know**\n**Probably**\n**Probably Not**\n**Back**"
        )
        .setFooter({ text: `You can also press "Stop" to End your Game` })
        .setColor("RANDOM");
      interaction.channel.messages.edit(akiMessage.id, {
        embeds: [updatedAkiEmbed],
        components: [row, row2],
      });
      await akiMessage
        .awaitMessageComponent({
          time: 60000,
          componentType: "BUTTON",
        })
        .then(async (int) => {
          if (int.user.id !== interaction.user.id) {
            return int.reply({
              content: "This is not for you!",
              ephmeral: true,
            });
          }
          const answers = {
            y: 0,
            n: 1,
            i: 2,
            p: 3,
            pn: 4,
          };
          const answer = int.customId;
          let thinkingEmbed = new MessageEmbed()
            .setAuthor({ name: usertag, iconURL: avatar })
            .setTitle(`Question ${aki.currentStep + 1}`)
            .setDescription(
              `**Progress: ${Math.round(aki.progress)}%\n${aki.question}**`
            )
            .addField(
              "Please press...",
              "**Yes**\n**No**\n**I don't know**\n**Probably**\n**Probably Not**\n**Back**"
            )
            .setFooter({ text: `Thinking...` })
            .setColor("RANDOM");
          await int.update({
            embeds: [thinkingEmbed],
            components: [row, row2],
          });

          if (answer == "b") {
            if (aki.currentStep >= 1) {
              await aki.back();
            } else {
              interaction.reply({
                content: "You can't go back anymore!",
                ephmeral: true,
              });
            }
          } else if (answer == "s") {
            isPlaying.delete(interaction.user.id);
            let stopEmbed = new MessageEmbed()
              .setAuthor({ name: usertag, iconURL: avatar })
              .setTitle(`Game Ended`)
              .setDescription(
                `**${interaction.user.username}, your game was successfully ended!**`
              )
              .setColor("RANDOM");
            await aki.win();
            await int.editReply({
              embeds: [stopEmbed],
              components: [],
            });
            notFinished = false;
          } else {
            await aki.step(answers[answer]);
          }

          if (!notFinished) return;
        })
        .catch(async (e) => {
          await aki.win();
          notFinished = false;
          isPlaying.delete(interaction.user.id);
          akiMessage.edit({
            components: [row, row2].map((e) => {
              e.components = e.components.map((i) => {
                i.disabled = true;
                return i;
              });
              return e;
            }),
            embeds: [noReplyEmbed],
          });
        });
    }
  },
};
