function arrayMoveMutable(array, fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
function arrayMove(array, fromIndex, toIndex) {
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
}
module.exports = {
  name: "race",
  description: "Start a race game",
  type: "CHAT_INPUT",
  options: [
    {
      name: "gamemode",
      description: "Choose what you want to race",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Car",
          value: "car",
        },
        {
          name: "Bike",
          value: "bike",
        },
        {
          name: "Horse",
          value: "horse",
        },
        {
          name: "Run",
          value: "run",
        },
        {
          name: "Pokemon",
          value: "pokemon",
        },
      ],
    },
    {
      name: "prize",
      description: "Enter the prize for the game",
      type: "STRING",
      required: false,
    },
  ],
  async execute(interaction) {
    const gamemode = interaction.options.getString("gamemode");
    const prize = interaction.options.getString("prize") || "Nothing";
    //You need to change the emote ids (and name if you rename them) after stealing them in another server
    const emos = {
      car: [
        "<:carv:894504695127740457>", //https://cdn.discordapp.com/emojis/894504695127740457.png?size=80
        "<:carg:894504648969441330>", //https://cdn.discordapp.com/emojis/894504648969441330.png?size=80
        "<:caro:893824315261333514>", //https://cdn.discordapp.com/emojis/893824315261333514.png?size=80
        "<:carp:894504507914997800>", //https://cdn.discordapp.com/emojis/894504507914997800.png?size=80
        "<:carr:894504556560527391>", //https://cdn.discordapp.com/emojis/894504556560527391.png?size=80
      ],
      horse: [
        "<:horsev:894532878954803221>", //https://cdn.discordapp.com/emojis/894532878954803221.png?size=80
        "<:horser:894532824105893929>", //https://cdn.discordapp.com/emojis/894532824105893929.png?size=80
        "<:horsep:894532618962501673>", //https://cdn.discordapp.com/emojis/894532618962501673.png?size=80
        "<:horseg:894532937658298388>", //https://cdn.discordapp.com/emojis/894532937658298388.png?size=80
        "<:horseb:894532764362231828>", //https://cdn.discordapp.com/emojis/894532764362231828.png?size=80
      ],
      bike: [
        "<:bikec:894540182437634049>", //https://cdn.discordapp.com/emojis/894540182437634049.png?size=80
        "<:bikeg:894540295260229652>", //https://cdn.discordapp.com/emojis/894540295260229652.png?size=80
        "<:biker:894540237684998174>", //https://cdn.discordapp.com/emojis/894540237684998174.png?size=80
        "<:bikev:894540401149612032>", //https://cdn.discordapp.com/emojis/894540401149612032.png?size=80
        "<:bikey:894540342878142484>", //https://cdn.discordapp.com/emojis/894540342878142484.png?size=80
      ],
      run: [
        "<a:runr:912750248886145024>", //https://cdn.discordapp.com/emojis/912750248886145024.gif?size=80
        "<a:runy:912750199846363176>", //https://cdn.discordapp.com/emojis/912750199846363176.gif?size=80
        "<a:rung:912750131206565908>", //https://cdn.discordapp.com/emojis/912750131206565908.gif?size=80
        "<a:runc:912750087606796298>", //https://cdn.discordapp.com/emojis/912750087606796298.gif?size=80
        "<a:runb:912750316418650183>", //https://cdn.discordapp.com/emojis/912750316418650183.gif?size=80
      ],
      pokemon: [
        "<a:poke1:912973860381532181>", //https://cdn.discordapp.com/emojis/912973860381532181.gif?size=40
        "<a:poke2:912973802135240734>", //https://cdn.discordapp.com/emojis/912973802135240734.gif?size=40
        "<a:poke3:912973755809165342>", //https://cdn.discordapp.com/emojis/912973755809165342.gif?size=40
        "<a:poke4:912973713740292126>", //https://cdn.discordapp.com/emojis/912973713740292126.gif?size=40
        "<a:poke5:912973673823084554>", //https://cdn.discordapp.com/emojis/912973673823084554.gif?size=40
      ],
    };
    const userEmos = {};
    const winner = [];
    let raceMsg = [];

    const move = async (racemsg, interval) => {
      raceMsg = racemsg.split("\n");
      if (
        !raceMsg.every((e) => {
          if (e.includes("🚩")) return true;
          return false;
        })
      ) {
        raceMsg = raceMsg.map((thing) => {
          if (!thing.includes("🚩")) {
            const movementNumber = Math.round(Math.random() * 3);
            let _obj = thing.split(" ");
            const carrotindex = _obj.indexOf(userEmos[_obj[13]]);
            if (carrotindex - movementNumber < 2) {
              _obj = arrayMove(_obj, carrotindex, 1);
              winner.push(_obj[13]);
              return `🚩 ${_obj.slice(1).join(" ")}`;
            }
            _obj = arrayMove(_obj, carrotindex, carrotindex - movementNumber);
            _obj = _obj.join(" ");

            return _obj;
          }
          return thing;
        });
        return raceMsg.join("\n");
      }

      clearInterval(interval);
      await interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setTitle("Game Over")
            .setDescription(
              winner[2]
                ? `<:neo_first:876912509255290920> - ${winner[0]}\n<:neo_second:876912663995772948> - ${winner[1]}\n<:neo_third:876912595767033907> - ${winner[2]}`
                : `<:neo_first:876912509255290920> - ${winner[0]}\n<:neo_second:876912663995772948> - ${winner[1]}`
            ),
        ],
      });
      return raceMsg.join("\n");
    };
    const joinon = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("join")
        .setLabel("Join Race")
        .setStyle("SUCCESS")
    );
    const joinoff = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("join")
        .setLabel("Join Race")
        .setStyle("SUCCESS")
        .setDisabled(true)
    ); /** */
    require("discord.js").CommandInteraction;
    const m = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Race!")
          .setDescription(
            "Click the button on this message to enter the race. There's limited space so hurry!"
          )
          .setFooter({ text: "Starts in 60 seconds" })
          .addField("Prize", prize),
      ],
      components: [joinon],
      fetchReply: true,
    });

    const collector = m.createMessageComponentCollector({
      time: 60000,
    });

    let participants = [];
    collector.on("collect", async (i) => {
      if (!participants.includes(i.user.id)) {
        participants.push(i.user.id);
        userEmos[`<@${i.user.id}>`] =
          emos[gamemode][Math.floor(Math.random() * emos[gamemode].length)];
        await i.reply({
          content: "You successfully joined the race",
          ephemeral: true,
        });
        if (participants.length >= 25) return collector.stop("players");
      } else {
        await i.reply({
          content: "You already joined the race!",
          ephemeral: true,
        });
      }
    });

    collector.on("end", async () => {
      await m.edit({
        components: [joinoff],
      });
      if (participants.length < 2) {
        return interaction.followUp("Not enough ppl joined, get friends lol");
      }
      participants = participants.map((item) => `<@${item}>`);
      const players = participants.join(", ");
      await interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setTitle(`${interaction.user.tag} started a new race!`)
            .addField("Participants:", `${players}`)
            .addField("Race type:", gamemode)
            .addField("Prize:", `${prize}`)
            .addField("No. of participants:", `${participants.length}`, true),
        ],
      });

      participants.forEach((player) => {
        raceMsg.push(`🏁 ● ● ● ● ● ● ● ● ● ● ● ${userEmos[player]} ${player}`);
      });

      const racemsg = raceMsg.join("\n");
      let e = racemsg;

      const msg = await interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setTitle(`Race started by ${interaction.user.tag}`)
            .setDescription(racemsg)
            .setFooter({ text: `Participants - ${participants.length}` }),
        ],
        fetchReply: true,
      });
      const interval = setInterval(async () => {
        e = await move(e, interval);
        msg.embeds[0].description = e;
        await msg.edit({
          embeds: [msg.embeds[0]],
        });
      }, 3000);
    });
  },
};
