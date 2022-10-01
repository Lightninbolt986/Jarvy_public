const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const math = require("mathjs");
module.exports = {
  name: "calculator",
  description: "Use a calculator in discord",
  execute: async (interaction, client) => {
    let buttons = [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("6")
          .setLabel("6")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("7")
          .setLabel("7")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("8")
          .setLabel("8")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("9")
          .setLabel("9")
          .setStyle("SECONDARY"),
        new MessageButton().setCustomId("/").setLabel("÷").setStyle("SUCCESS")
      ),
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("2")
          .setLabel("2")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("3")
          .setLabel("3")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("4")
          .setLabel("4")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("5")
          .setLabel("5")
          .setStyle("SECONDARY"),
        new MessageButton().setCustomId("*").setLabel("×").setStyle("SUCCESS")
      ),
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("%")
          .setLabel("%")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId(".")
          .setLabel(".")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("0")
          .setLabel("0")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("1")
          .setLabel("1")
          .setStyle("SECONDARY"),
        new MessageButton().setCustomId("-").setLabel("-").setStyle("SUCCESS")
      ),
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("(")
          .setLabel("(")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId(")")
          .setLabel(")")
          .setStyle("SECONDARY"),
        new MessageButton().setCustomId("+").setLabel("+").setStyle("SUCCESS"),
        new MessageButton().setCustomId("=").setLabel("=").setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("reset")
          .setEmoji("🔄")
          .setStyle("PRIMARY")
      ),
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("end")
          .setLabel("End Interaction")
          .setStyle("DANGER")
      ),
    ];

    let embed = new MessageEmbed().setDescription(
      `\`\`\`css\nPlaceholder\n\`\`\``
    );

    interaction.reply({
      embeds: [embed],
      components: buttons,
    });

    let user = interaction.user.id;
    var ids = [];
    var nums = [];
    for (let i = 0; i < buttons.length; i++) {
      for (let v = 0; v < buttons[i].components.length; v++) {
        ids.push(buttons[i].components[v].customId);
        if (
          buttons[i].components[v].style === "SECONDARY" ||
          buttons[i].components[v].style === "SUCCESS"
        ) {
          nums.push(buttons[i].components[v].customId);
        } else {
          continue;
        }
      }
    }
    const filter = (interaction) =>
      ids.includes(interaction.customId) && interaction.user.id === user;

    const collector = await interaction.channel.createMessageComponentCollector(
      {
        filter,
        time: 120000,
      }
    );

    var equation = "";

    collector.on("collect", async (i) => {
      if (i.user.id !== user) {
        return i.reply({
          content: `These buttons aren't for you`,
          ephemeral: true,
        });
      }

      if (nums.includes(i.customId)) {
        await i.deferUpdate();
        equation += `${i.customId}`;
        await i
          .editReply({
            embeds: [embed.setDescription(`\`\`\`css\n${equation}\n\`\`\``)],
          })
          .catch((e) => {});
      }
      if (i.customId === "=") {
        await i.deferUpdate();
        let answer = math.evaluate(equation);
        await i
          .editReply({
            embeds: [
              embed.setDescription(
                `\`\`\`css\n ${equation + ` = ${answer}`}\n\`\`\``
              ),
            ],
          })
          .catch((e) => {});
        await i
          .followUp({
            embeds: [
              embed.setDescription(
                `\`\`\`css\n${equation + ` = ${answer}`}\n\`\`\``
              ),
            ],
            ephemeral: true,
          })
          .catch((e) => {});
      }
      if (i.customId === "reset") {
        await i.deferUpdate();
        equation = "";
        await i
          .editReply({
            embeds: [embed.setDescription(`\`\`\`css\nPlaceholder\n\`\`\``)],
          })
          .catch((e) => {});
      }
      if (i.customId === "end") {
        await i.deferUpdate();
        collector.stop();
      }
    });

    collector.on("end", async (i, reason) => {
      for (let i = 0; i < buttons.length; i++) {
        for (let v = 0; v < buttons[i].components.length; v++) {
          buttons[i].components[v].setDisabled(true);
        }
      }

      if (reason == "time") {
        await interaction
          .editReply({
            components: buttons,
          })
          .catch((e) => {});
      } else {
        await interaction
          .editReply({
            components: buttons,
          })
          .catch((e) => {});
      }
    });
  },
};
