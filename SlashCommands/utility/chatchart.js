module.exports = {
  name: "chatchart",
  description:
    "Generates a pie chart, representing the last 5000 messages in the channel.",
  async execute(interaction, client) {
    const { PieChart } = require("canvas-pie-chart");
    const pEmbed = new Discord.MessageEmbed()
      .setColor("#a8f1ff")
      .setDescription(
        `**Fetching the past 5000 messages** <a:neo_loading:877035130076659762>`
      )
      .setFooter("This might take time");
    const msg = await interaction.reply({
      embeds: [pEmbed],
      fetchReply: true,
    });
    try {
      let authors = [];
      const list = await fetchMore(message.channel, 5000);
      const arraylist = Array.from(list);

      arraylist.forEach((array) => {
        authors.push(array[1].author.id);
      });
      let frequency = {};
      authors.forEach(function (item) {
        frequency[item] = frequency[item] ? frequency[item] + 1 : 1;
      });
      let intents = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .map(function (x) {
          return x[0];
        });
      let finalthingyig = {};
      let chartlabels = [];
      for (const u of intents) {
        try {
          const newe = await client.users.fetch(u);
          if (newe.bot) continue;
          if (frequency[u] > 200) {
            finalthingyig[newe.tag] = frequency[u];
          } else {
            if (finalthingyig["Others"]) {
              finalthingyig["Others"] = finalthingyig["Others"] + frequency[u];
            } else finalthingyig["Others"] = frequency[u];
          }
        } catch (e) {}
      }
      for (let i = 0; i < Object.keys(finalthingyig).length; i++) {
        chartlabels.push({
          text: Object.keys(finalthingyig)[i],
          size: Object.values(finalthingyig)[i],
        });
      }
      if (Object.keys(finalthingyig).length < 3)
        return message.channel.messages.edit(msg.id, {
          content: `Just 2 people lol`,
          embeds: [],
        });
      const chart = new PieChart({
        labels: chartlabels,
        blackOrWhiteInvert: false,
        size: 1024,
      });
      const buffer = chart.draw();
      const attachment = new Discord.MessageAttachment(buffer, "chart.png");

      const embed = new Discord.MessageEmbed()
        .setTitle(`**Chatchart of the past 5000 messages in this channel**`)
        .setColor("#a8f1ff")
        .setDescription(
          `<:neo_podium:877031994192691310>│**STANDINGS:**\n
  <:neo_gold:877031189985230868>│**${Object.keys(finalthingyig)[0]}** - \`${
            Object.values(finalthingyig)[0]
          } [${Object.values(finalthingyig)[0] / 5}%]\`
  <:neo_silver:877030960070262794>│**${Object.keys(finalthingyig)[1]}** - \`${
            Object.values(finalthingyig)[1]
          } [${Object.values(finalthingyig)[1] / 5}%]\`
  <:neo_bronze:877030829732298784>│**${Object.keys(finalthingyig)[2]}** - \`${
            Object.values(finalthingyig)[2]
          } [${Object.values(finalthingyig)[2] / 5}%]\``
        )
        .setImage("attachment://chart.png")
        .setFooter(`The numbers might not add up as it does not display bots`);
      interaction.editReply({
        embeds: [embed],
        files: [attachment],
      });
    } catch (e) {
      interaction.editReply("Command broke, bot down gg :smile:");
      console.log(e);
    }
    async function fetchMore(channel, limit = 250) {
      if (!channel) {
        throw new Error(`Expected channel, got ${typeof channel}.`);
      }
      if (limit <= 100) {
        return channel.messages.fetch({
          limit,
        });
      }

      let collection = new Discord.Collection();
      let lastId = null;
      let options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
          break;
        }

        collection = collection.concat(messages);
        lastId = messages.last().id;
      }

      return collection;
    }
  },
};
