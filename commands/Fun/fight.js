module.exports = {
  name: "fight",
  aliases: ["battle"],
  description: "Fight",
  permissions: {
    bot: ["EMBED_LINKS", "SEND_MESSAGES"],
    user: ["SEND_MESSAGES"],
  },
  async execute(message) {
    const opponent = message.mentions.users.first();
    const getRandomString = function (length) {
      const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    };
    const randomHexColor = function () {
      return (
        "#" +
        ("000000" + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
      );
    };
    if (!opponent)
      return message.channel.send("Please mention who you want to fight");
    const fight = async function (options) {
      const data = new Set();
      const db = require("quick.db");
      const Discord = require("discord.js");
      const { MessageButton, MessageActionRow } = require("discord.js");

      if (!options.message) {
        throw new Error("Error: message argument was not specified.");
      }
      if (typeof options.message !== "object") {
        throw new TypeError("Error: Invalid Discord Message was provided.");
      }

      if (!options.opponent) {
        throw new Error("Error: opponent argument was not specified.");
      }
      if (typeof options.opponent !== "object") {
        throw new TypeError("Error: Invalid Discord User was provided.");
      }

      if (!options.embed) options.embed = {};
      if (typeof options.embed !== "object") {
        throw new TypeError("Error: embed must be an object.");
      }

      if (!options.embed.title) {
        options.embed.title = "Fight | Development";
      }
      if (typeof options.embed.title !== "string") {
        throw new TypeError("Error: embed title must be a string.");
      }

      if (!options.embed.color) {
        options.embed.color = randomHexColor();
      }
      if (typeof options.embed.color !== "string") {
        throw new TypeError("Error: embed color must be a string.");
      }

      if (!options.embed.timestamp) {
        options.embed.timestamp = true;
      }
      if (typeof options.embed.timestamp !== "boolean") {
        throw new TypeError("Error: setTimestamp must be a boolean.");
      }

      if (!options.buttons) options.buttons = {};
      if (typeof options.buttons !== "object") {
        throw new TypeError("Error: buttons must be an object.");
      }

      if (!options.buttons.hit) {
        options.buttons.hit = "Hit";
      }
      if (typeof options.buttons.hit !== "string") {
        throw new Error("Error: hit button text must be a string.");
      }

      if (!options.buttons.heal) {
        options.buttons.heal = "Heal";
      }
      if (typeof options.buttons.heal !== "string") {
        throw new Error("Error: heal button text must be a string.");
      }

      if (!options.buttons.cancel) {
        options.buttons.cancel = "Stop";
      }
      if (typeof options.buttons.cancel !== "string") {
        throw new Error("Error: cancel button text must be a string.");
      }

      if (!options.buttons.accept) {
        options.buttons.accept = "Accept";
      }
      if (typeof options.buttons.accept !== "string") {
        throw new Error("Error: accept button text must be a string.");
      }

      if (!options.buttons.deny) {
        options.buttons.deny = "Deny";
      }
      if (typeof options.buttons.deny !== "string") {
        throw new Error("Error: deny button text must be a string.");
      }

      if (!options.acceptMessage) {
        options.acceptMessage =
          "<@{{challenger}}> has challenged <@{{opponent}}> for a fight!";
      }
      if (typeof options.acceptMessage !== "string") {
        throw new Error("Error: acceptMessage must be a string.");
      }

      if (!options.winMessage) {
        options.winMessage = "GG, <@{{winner}}> won the fight!";
      }
      if (typeof options.winMessage !== "string") {
        throw new TypeError("Error: winMessage must be a string.");
      }

      if (!options.endMessage) {
        options.endMessage =
          "<@{{opponent}}> didn't answer in time. So, I dropped the game!";
      }
      if (typeof options.endMessage !== "string") {
        throw new TypeError("Error: endMessage must be a string.");
      }

      if (!options.cancelMessage) {
        options.cancelMessage =
          "<@{{opponent}}> refused to have a fight with you!";
      }
      if (typeof options.cancelMessage !== "string") {
        throw new TypeError("Error: cancelMessage must be a string.");
      }

      if (!options.fightMessage) {
        options.fightMessage = "{{player}} you go first!";
      }
      if (typeof options.fightMessage !== "string") {
        throw new TypeError("Error: fightMessage must be a string.");
      }

      if (!options.othersMessage) {
        options.othersMessage = "Only {{author}} can use the buttons!";
      }
      if (typeof options.othersMessage !== "string") {
        throw new TypeError("Error: othersMessage must be a string.");
      }

      if (!options.opponentsTurnMessage) {
        options.opponentsTurnMessage = "Please wait for your opponents move!";
      }
      if (typeof options.opponentsTurnMessage !== "string") {
        throw new TypeError("Error: opponentsTurnMessage must be a string.");
      }

      if (!options.highHealthMessage) {
        options.highHealthMessage = "You cannot heal if your HP is above 80!";
      }
      if (typeof options.highHealthMessage !== "string") {
        throw new TypeError("Error: highHealthMessage must be a string.");
      }

      if (!options.lowHealthMessage) {
        options.lowHealthMessage =
          "You cannot cancel the fight if your HP is below 50!";
      }
      if (typeof options.lowHealthMessage !== "string") {
        throw new TypeError("Error: lowHealthMessage must be a string.");
      }

      if (!options.returnWinner) options.returnWinner = false;
      if (typeof options.returnWinner !== "boolean") {
        throw new TypeError("Error: buttonText must be a boolean.");
      }

      if (
        data.has(options.message.author.id) ||
        data.has(options.opponent.id)
      ) {
        return;
      }
      data.add(options.message.author.id);
      data.add(options.opponent.id);

      const id1 =
        getRandomString(5) +
        "-" +
        getRandomString(5) +
        "-" +
        getRandomString(5) +
        "-" +
        getRandomString(5);

      const id2 =
        getRandomString(5) +
        "-" +
        getRandomString(5) +
        "-" +
        getRandomString(5) +
        "-" +
        getRandomString(5);

      const id3 =
        getRandomString(5) +
        "-" +
        getRandomString(5) +
        "-" +
        getRandomString(5) +
        "-" +
        getRandomString(5);

      const oppenent = options.opponent;
      const challenger = options.message.author;
      if (oppenent.bot || oppenent.id === challenger.id) return;
      let acceptbutton = new MessageButton()
        .setStyle("SUCCESS")
        .setLabel(options.buttons.accept)
        .setCustomId("accept");
      let denybutton = new MessageButton()
        .setStyle("DANGER")
        .setLabel(options.buttons.deny)
        .setCustomId("deny");
      let component = new MessageActionRow().addComponents([
        acceptbutton,
        denybutton,
      ]);
      const embed = new Discord.MessageEmbed()
        .setTitle(options.embed.title)
        .setDescription(
          options.acceptMessage
            .replace("{{challenger}}", challenger.id)
            .replace("{{opponent}}", oppenent.id)
        )
        .setFooter("Jarvy")
        .setColor(options.embed.color);
      if (options.embed.timestamp) {
        embed.setTimestamp();
      }
      const question = await options.message.reply({
        embeds: [embed],
      });
      message.channel.messages.edit(question.id, {
        embeds: [embed],
        components: [component],
      });
      const Collector = await question.createMessageComponentCollector(
        (fn) => fn,
        {
          time: 60000,
        }
      );
      Collector.on("collect", async (_btn) => {
        if (_btn.user.id !== oppenent.id) {
          return _btn.reply({
            content: options.othersMessage.replace(
              "{{author}}",
              `<@${oppenent.id}>`
            ),
            ephemeral: true,
          });
        }
        _btn.deferUpdate();
        if (_btn.customId === "deny") {
          acceptbutton = new MessageButton()
            .setDisabled()
            .setStyle("SUCCESS")
            .setLabel(options.buttons.accept)
            .setCustomId("accept");
          denybutton = new MessageButton()
            .setDisabled()
            .setStyle("DANGER")
            .setLabel(options.buttons.deny)
            .setCustomId("deny");
          component = new MessageActionRow().addComponents([
            acceptbutton,
            denybutton,
          ]);
          const emd = new Discord.MessageEmbed()
            .setTitle(options.embed.title)
            .setDescription(
              options.cancelMessage.replace("{{opponent}}", oppenent.id)
            )
            .setFooter("Jarvy")
            .setColor(options.embed.color);
          if (options.embed.timestamp) {
            emd.setTimestamp();
          }
          Collector.stop();
          data.delete(options.opponent.id);
          data.delete(options.message.author.id);
          return question.channel.messages.edit(question.id, {
            embeds: [emd],
            components: [component],
          });
        } else if (_btn.customId === "accept") {
          Collector.stop();
          const challengerHealth = 100;
          const oppenentHealth = 100;
          const challengerLastAttack = "heal";
          const oppenentLastAttack = "heal";
          const gameData = [
            {
              member: challenger,
              health: challengerHealth,
              lastAttack: challengerLastAttack,
            },
            {
              member: oppenent,
              health: oppenentHealth,
              lastAttack: oppenentLastAttack,
            },
          ];
          let player = Math.floor(Math.random() * gameData.length);
          let btn1 = new MessageButton()
            .setLabel(options.buttons.hit)
            .setCustomId(id1)
            .setStyle("DANGER");
          let btn2 = new MessageButton()
            .setLabel(options.buttons.heal)
            .setCustomId(id2)
            .setStyle("SUCCESS");
          let btn3 = new MessageButton()
            .setLabel(options.buttons.cancel)
            .setCustomId(id3)
            .setStyle("SECONDARY");
          let row = new MessageActionRow()
            .addComponents(btn1)
            .addComponents(btn2)
            .addComponents(btn3);
          const _embed = new Discord.MessageEmbed()
            .setTitle(options.embed.title)
            .setDescription(
              options.fightMessage.replace(
                "{{player}}",
                gameData[player].member
              )
            )
            .setFooter("Jarvy")
            .setColor(options.embed.color);
          if (options.embed.timestamp) {
            _embed.setTimestamp();
          }
          question.channel.messages.edit(question.id, {
            embeds: [_embed],
            components: [row],
          });
          const checkHealth = (member) => {
            if (gameData[member].health <= 0) return true;
            else return false;
          };
          const gameCollector = question.createMessageComponentCollector(
            (fn) => fn
          );
          gameCollector.on("collect", async (msg) => {
            if (gameData.some((x) => x.member.id === msg.user.id)) {
              if (!checkHealth(player)) {
                const btn = msg.member;
                if (msg.customId === id1) {
                  if (btn.id !== gameData[player].member.id) {
                    return msg.reply({
                      content: options.opponentsTurnMessage,
                      ephemeral: true,
                    });
                  }
                  msg.deferUpdate();
                  let randNumb =
                    Math.floor(Math.random() * parseInt(options.dmgMax)) +
                      parseInt(options.dmgMin) ||
                    Math.floor(Math.random() * 37) + 4;
                  const tempPlayer = (player + 1) % 2;
                  if (gameData[tempPlayer].lastAttack === "heal") {
                    randNumb = Math.floor(randNumb / 2);
                  }
                  gameData[tempPlayer].health -= randNumb;
                  gameData[player].lastAttack = "attack";
                  if (gameData[player].member.id == options.message.author.id) {
                    const __embed = new Discord.MessageEmbed()
                      .setTitle(options.embed.title)
                      .setDescription(
                        `(:punch:) ${gameData[player].member.username} — ${gameData[player].health} HP - **versus** - **${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP`
                      )
                      .setFooter("Jarvy")
                      .setColor(options.embed.color);
                    if (options.embed.timestamp) {
                      __embed.setTimestamp();
                    }
                    question.channel.messages.edit(question.id, {
                      embeds: [__embed],
                      components: [row],
                    });
                  } else if (
                    gameData[player].member.id == options.opponent.id
                  ) {
                    const __embed = new Discord.MessageEmbed()
                      .setTitle(options.embed.title)
                      .setDescription(
                        `**${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP - **versus** - ${gameData[player].member.username} — ${gameData[player].health} HP (:punch:)`
                      )
                      .setFooter("Jarvy")
                      .setColor(options.embed.color);
                    if (options.embed.timestamp) {
                      __embed.setTimestamp();
                    }
                    question.channel.messages.edit(question.id, {
                      embeds: [__embed],
                      components: [row],
                    });
                  }
                  player = (player + 1) % 2;
                } else if (msg.customId === id2) {
                  if (btn.id !== gameData[player].member.id) {
                    return msg.reply({
                      content: options.opponentsTurnMessage,
                      ephemeral: true,
                    });
                  }
                  if (gameData[player].health > 80) {
                    return msg.reply({
                      content: options.highHealthMessage,
                      ephemeral: true,
                    });
                  } else {
                    msg.deferUpdate();
                    let randNumb =
                      Math.floor(Math.random() * parseInt(options.healMax)) +
                        parseInt(options.healMin) ||
                      Math.floor(Math.random() * 37) + 4;
                    const tempPlayer = (player + 1) % 2;
                    if (gameData[tempPlayer].lastAttack === "heal") {
                      randNumb = Math.floor(randNumb / 2);
                    }
                    gameData[player].health += randNumb;
                    gameData[player].lastAttack = "heal";
                    if (
                      gameData[player].member.id == options.message.author.id
                    ) {
                      const __embed = new Discord.MessageEmbed()
                        .setTitle(options.embed.title)
                        .setDescription(
                          `(:hearts:) ${gameData[player].member.username} — ${gameData[player].health} HP - **versus** - **${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP`
                        )
                        .setFooter("Jarvy")
                        .setColor(options.embed.color);
                      if (options.embed.timestamp) {
                        __embed.setTimestamp();
                      }
                      question.channel.messages.edit(question.id, {
                        embeds: [__embed],
                        components: [row],
                      });
                    } else if (
                      gameData[player].member.id == options.opponent.id
                    ) {
                      const __embed = new Discord.MessageEmbed()
                        .setTitle(options.embed.title)
                        .setDescription(
                          `**${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP - **versus** - ${gameData[player].member.username} — ${gameData[player].health} HP (:hearts:)`
                        )
                        .setFooter("Jarvy")
                        .setColor(options.embed.color);
                      if (options.embed.timestamp) {
                        __embed.setTimestamp();
                      }
                      question.channel.messages.edit(question.id, {
                        embeds: [__embed],
                        components: [row],
                      });
                    }
                    player = (player + 1) % 2;
                  }
                } else if (msg.customId === id3) {
                  if (btn.id !== gameData[player].member.id) {
                    return msg.reply({
                      content: options.opponentsTurnMessage,
                      ephemeral: true,
                    });
                  }
                  if (gameData[player].health < 50) {
                    return msg.reply({
                      content: options.lowHealthMessage,
                      ephemeral: true,
                    });
                  } else {
                    msg.deferUpdate();
                    btn1 = new MessageButton()
                      .setLabel(options.buttons.hit)
                      .setCustomId(id1)
                      .setStyle("DANGER")
                      .setDisabled();
                    btn2 = new MessageButton()
                      .setLabel(options.buttons.heal)
                      .setCustomId(id2)
                      .setStyle("SUCCESS")
                      .setDisabled();
                    btn3 = new MessageButton()
                      .setLabel(options.buttons.cancel)
                      .setCustomId(id3)
                      .setStyle("SECONDARY")
                      .setDisabled();
                    row = new MessageActionRow()
                      .addComponents(btn1)
                      .addComponents(btn2)
                      .addComponents(btn3);
                    gameCollector.stop();
                    data.delete(options.opponent.id);
                    data.delete(options.message.author.id);
                    const __embed = new Discord.MessageEmbed()
                      .setTitle(options.embed.title)
                      .setDescription(
                        options.cancelMessage.replace(
                          "{{opponent}}",
                          gameData[player].member.id
                        )
                      )
                      .setFooter("Jarvy")
                      .setColor(options.embed.color);
                    if (options.embed.timestamp) {
                      __embed.setTimestamp();
                    }
                    question.channel.messages.edit(question.id, {
                      embeds: [__embed],
                      components: [row],
                    });
                  }
                }
                if (checkHealth(player)) {
                  btn1 = new MessageButton()
                    .setLabel(options.buttons.hit)
                    .setCustomId(id1)
                    .setStyle("DANGER")
                    .setDisabled();
                  btn2 = new MessageButton()
                    .setLabel(options.buttons.heal)
                    .setCustomId(id2)
                    .setStyle("SUCCESS")
                    .setDisabled();
                  btn3 = new MessageButton()
                    .setLabel(options.buttons.cancel)
                    .setCustomId(id3)
                    .setStyle("SECONDARY")
                    .setDisabled();
                  row = new MessageActionRow()
                    .addComponents(btn1)
                    .addComponents(btn2)
                    .addComponents(btn3);
                  gameCollector.stop();
                  data.delete(options.opponent.id);
                  data.delete(options.message.author.id);
                  const tempPlayer = (player + 1) % 2;
                  const __embed = new Discord.MessageEmbed()
                    .setTitle(options.embed.title)
                    .setDescription(
                      options.winMessage.replace(
                        "{{winner}}",
                        gameData[tempPlayer].member.id
                      )
                    )
                    .setFooter("Jarvy")
                    .setColor(options.embed.color);
                  if (options.embed.timestamp) {
                    __embed.setTimestamp();
                  }
                  if (options.returnWinner) {
                    if (!options.gameID) {
                      throw new Error(
                        "Error: gameID argument was not specified."
                      );
                    }
                    if (typeof options.gameID !== "string") {
                      throw new TypeError("Error: gameID must be a string.");
                    }
                    db.set(
                      `Fight_${options.message.guild.id}_${options.gameID}`,
                      gameData[tempPlayer].member.id
                    );
                  }
                  question.channel.messages.edit(question.id, {
                    embeds: [__embed],
                    components: [row],
                  });
                }
              } else {
                btn1 = new MessageButton()
                  .setLabel(options.buttons.hit)
                  .setCustomId(id1)
                  .setStyle("DANGER")
                  .setDisabled();
                btn2 = new MessageButton()
                  .setLabel(options.buttons.heal)
                  .setCustomId(id2)
                  .setStyle("SUCCESS")
                  .setDisabled();
                btn3 = new MessageButton()
                  .setLabel(options.buttons.cancel)
                  .setCustomId(id3)
                  .setStyle("grey")
                  .setDisabled();
                gameCollector.stop();
                data.delete(options.opponent.id);
                data.delete(options.message.author.id);
                const tempPlayer = (player + 1) % 2;
                const __embed = new Discord.MessageEmbed()
                  .setTitle(options.embed.title)
                  .setDescription(
                    options.winMessage.replace(
                      "{{winner}}",
                      gameData[tempPlayer].member.id
                    )
                  )
                  .setFooter("Jarvy")
                  .setColor(options.embed.color);
                if (options.embed.timestamp) {
                  __embed.setTimestamp();
                }
                if (options.returnWinner) {
                  if (!options.gameID) {
                    throw new Error(
                      "Error: gameID argument was not specified."
                    );
                  }
                  if (typeof options.gameID !== "string") {
                    throw new TypeError("Error: gameID must be a string.");
                  }
                  db.set(
                    `Fight_${options.message.guild.id}_${options.gameID}`,
                    gameData[tempPlayer].member.id
                  );
                }
                question.channel.messages.edit(question.id, {
                  embeds: [__embed],
                  components: [row],
                });
              }
            } else {
              return msg.reply({
                content: options.othersMessage.replace(
                  "{{author}}",
                  `<@${challenger.id}> and <@${oppenent.id}>`
                ),
                ephemeral: true,
              });
            }
          });
        }
      });
      Collector.on("end", async (msg, reason) => {
        if (reason === "time") {
          acceptbutton = new MessageButton()
            .setDisabled()
            .setStyle("SUCCESS")
            .setLabel(options.buttons.accept)
            .setCustomId("accept");
          denybutton = new MessageButton()
            .setDisabled()
            .setStyle("DANGER")
            .setLabel(options.buttons.deny)
            .setCustomId("deny");
          component = new MessageActionRow().addComponents([
            acceptbutton,
            denybutton,
          ]);
          const _embed = new Discord.MessageEmbed()
            .setTitle(options.embed.title)
            .setDescription(
              options.endMessage.replace("{{opponent}}", oppenent.id)
            )
            .setFooter("Jarvy")
            .setColor(options.embed.color);
          if (options.embed.timestamp) {
            _embed.setTimestamp();
          }
          data.delete(options.opponent.id);
          data.delete(options.message.author.id);
          return question.edit({
            embeds: [_embed],
            components: [component],
          });
        }
      });
    };

    await fight({
      message: message,
      opponent: message.mentions.users.first(),
      embed: {
        title: "Fight",
        color: "RANDOM",
        timestamp: true,
      },
      buttons: {
        hit: "Hit",
        heal: "Heal",
        cancel: "Stop",
        accept: "Accept",
        deny: "Deny",
      },
      acceptMessage:
        "<@{{challenger}}> has challenged <@{{opponent}}> for a fight!",
      winMessage: "GG, <@{{winner}}> won the fight!",
      endMessage:
        "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
      cancelMessage: "<@{{opponent}}> refused to have a fight with you!",
      fightMessage: "{{player}} you go first!",
      opponentsTurnMessage: "Please wait for your opponents move!",
      highHealthMessage: "You cannot heal if your HP is above 80!",
      lowHealthMessage: "You cannot cancel the fight if your HP is below 50!",
      returnWinner: false,
      ongoingMessage:
        "A game is already runnning in <#{{channel}}>. You can't start a new one!",
      othersMessage: "Only {{author}} can use the buttons!",
      healMax: 20,
      healMin: 5,
      dmgMax: 40,
      dmgMin: 10,
    });
  },
};
