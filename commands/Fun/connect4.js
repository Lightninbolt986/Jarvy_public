module.exports = {
  name:"connect4",
  aliases:["c4"],
  description:"Play a game of conenct4",
  cooldown: 30000,
  permissions: {
    bot: ["EMBED_LINKS", "SEND_MESSAGES", "EXTERNAL_EMOTES"],
    user: ["SEND_MESSAGES"]
  },
  async execute(message, args, cmd, client, Discord) {

    const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
    if (!message.mentions.users.first()) return message.channel.send("You can't be sooo lonely that u wanna play alone");
    if (message.mentions.users.first().bot) return message.channel.send("How dumb.");
    if (message.mentions.users.first() == message.author) return message.channel.send("Nub");
    const WIDTH = 7;
    const HEIGHT = 6;
    const gameBoard = [];
    const reactions = { "<:jarvy_1:893483641420775497>️": 1, "<:jarvy_2:893483865606344714>️": 2, "<:jarvy_3:893483916852330536>": 3, "<:jarvy_4:893483963539136543>": 4, "<:jarvy_5:893484631322681355>": 5, "<:jarvy_6:893484682879074304>": 6, "<:jarvy_7:893484730056577045>": 7 };
    const reactionNames = { "jarvy_1": 1, "jarvy_2": 2, "jarvy_3": 3, "jarvy_4": 4, "jarvy_5": 5, "jarvy_6": 6, "jarvy_7": 7 };
    class Connect4 {
      constructor(options = {}) {
        if (!options.message) throw new TypeError("NO_MESSAGE: Please provide a message arguement");
        if (typeof options.message !== "object") throw new TypeError("INVALID_MESSAGE: Invalid Discord Message object was provided.");

        if (!options.opponent) throw new TypeError("NO_OPPONENT: Please provide an opponent arguement");
        if (typeof options.opponent !== "object") throw new TypeError("INVALID_OPPONENT: Invalid Discord User object was provided.");

        if (!options.embed) options.embed = {};
        if (!options.embed.title) options.embed.title = "Connect 4";
        if (typeof options.embed.title !== "string") throw new TypeError("INVALID_TITLE: Embed Title must be a string.");

        if (!options.embed.color) options.embed.color = "#5865F2";
        if (typeof options.embed.color !== "string") throw new TypeError("INVALID_COLOR: Embed Color must be a string.");

        if (!options.emojis) options.emojis = {};
        if (!options.emojis.player1) options.emojis.player1 = "🔵";
        if (typeof options.emojis.player1 !== "string") throw new TypeError("INVALID_EMOJI: Player1 Emoji must be a string.");

        if (!options.emojis.player2) options.emojis.player2 = "🟡";
        if (typeof options.emojis.player2 !== "string") throw new TypeError("INVALID_EMOJI: Player2 Emoji must be a string.");

        if (!options.askMessage) options.askMessage = "Hey {opponent}, {challenger} challenged you for a game of Connect 4!";
        if (typeof options.askMessage !== "string") throw new TypeError("ASK_MESSAGE: Ask Message must be a string.");

        if (!options.cancelMessage) options.cancelMessage = "Looks like they refused to have a game of Connect4. \:(";
        if (typeof options.cancelMessage !== "string") throw new TypeError("CANCEL_MESSAGE: Cancel Message must be a string.");

        if (!options.timeEndMessage) options.timeEndMessage = "Since the opponent didnt answer, i dropped the game!";
        if (typeof options.timeEndMessage !== "string") throw new TypeError("TIME_END_MESSAGE: Time End Message must be a string.");

        if (!options.turnMessage) options.turnMessage = "{emoji} | Its now **{player}** turn!";
        if (typeof options.turnMessage !== "string") throw new TypeError("TURN_MESSAGE: Turn Message must be a string.");

        if (!options.gameEndMessage) options.gameEndMessage = "The game went unfinished :(";
        if (typeof options.gameEndMessage !== "string") throw new TypeError("GAME_END_MESSAGE: Game End Message must be a string.");
        if (!options.winMessage) options.winMessage = "{emoji} | **{winner}** won the game!";
        if (typeof options.winMessage !== "string") throw new TypeError("WIN_MESSAGE: Win Message must be a string.");
        if (!options.drawMessage) options.drawMessage = "It was a draw!";
        if (typeof options.drawMessage !== "string") throw new TypeError("DRAW_MESSAGE: Draw Message must be a string.");
        if (!options.othersMessage) options.othersMessage = "You are not allowed to use buttons for this message!";
        if (typeof options.othersMessage !== "string") throw new TypeError("INVALID_OTHERS_MESSAGE: Others Message must be a string.");


        this.message = options.message;
        this.opponent = options.opponent;
        this.emojis = options.emojis;
        this.options = options;
        this.gameEmbed = null;
        this.inGame = false;
        this.redTurn = true;
        // red => author, yellow => opponent

      }

      getGameBoard() {
        let str = "";
        str += "<:jarvy_1:893483641420775497><:jarvy_2:893483865606344714><:jarvy_3:893483916852330536><:jarvy_4:893483963539136543><:jarvy_5:893484631322681355><:jarvy_6:893484682879074304><:jarvy_7:893484730056577045>\n";
        for (let y = 0; y < HEIGHT; y++) {
          for (let x = 0; x < WIDTH; x++) {
            str += "" + gameBoard[y * WIDTH + x];
          }
          str += "\n";
        }
        return str;

      }

      async startGame() {
        if (this.inGame) return;
        const author = this.message.author;
        const opponent = this.opponent;
        const emoji = this.options.emoji ? this.options.emoji : "";

        if (opponent.bot) return this.message.channel.send(`**${emoji} You can't play with bots!**`);
        if (opponent.id === author.id) return this.message.channel.send(`**${emoji} You cannot play with yourself!**`);

        const embed = new MessageEmbed()
          .setTitle(this.options.embed.title)
          .setDescription(this.options.askMessage
            .replace("{challenger}", "<@!" + this.message.author.id + ">")
            .replace("{opponent}", "<@!" + this.opponent.id + ">"))
          .setColor(this.options.green || this.options.embed.color);

        const btn1 = new MessageButton().setLabel("Accept").setStyle("SUCCESS").setCustomId("accept");
        const btn2 = new MessageButton().setLabel("Reject").setStyle("DANGER").setCustomId("reject");
        const row = new MessageActionRow().addComponents(btn1, btn2);
        const askMsg = await this.message.channel.send({ embeds: [embed], components: [row] });


        const filter = (interaction) => interaction === interaction;
        const interaction = askMsg.createMessageComponentCollector({
          filter, time: 60000
        });

        interaction.on("collect", async (btn) => {
          if (btn.user.id !== this.opponent.id) {
            return btn.reply({ content: this.options.othersMessage, ephemeral: true });
          }

          await btn.deferUpdate();
          if (btn.customId === "reject") {
            for (let y = 0; y < askMsg.components[0].components.length; y++) {
              askMsg.components[0].components[y].disabled = true;
            }

            if (this.options.red) askMsg.embeds[0].color = this.options.red;
            askMsg.embeds[0].description = this.options.cancelMessage.replace("{opponent}", "<@!" + this.opponent.id + ">").replace("{challenger}", "<@!" + this.message.author.id + ">");
            return askMsg.channel.messages.edit(askMsg.id, { embeds: askMsg.embeds, components: askMsg.components });

          } else if (btn.customId === "accept") {
            askMsg.delete().catch();
            for (let y = 0; y < HEIGHT; y++) {
              for (let x = 0; x < WIDTH; x++) {
                gameBoard[y * WIDTH + x] = "<:jarvy_blank_checker:893482620216815647>";
              }
            }
            this.inGame = true;

            this.message.channel.send({ embeds: [this.GameEmbed()] }).then(msg => {
              this.gameEmbed = msg;
              Object.keys(reactions).forEach(reaction => {
                this.gameEmbed.react(reaction);
              });

              this.checkReactions();
            });
          }
        });

        interaction.on("end", (c, r) => {
          if (r !== "time") return;
          for (let y = 0; y < askMsg.components[0].components.length; y++) {
            askMsg.components[0].components[y].disabled = true;
          }

          if (this.options.red) askMsg.embeds[0].color = this.options.red;
          askMsg.embeds[0].description = this.options.timeEndMessage.replace("{opponent}", "<@!" + this.opponent.id + ">").replace("{challenger}", "<@!" + this.message.author.id + ">");
          return askMsg.channel.messages.edit(askMsg.id, { embeds: askMsg.embeds, components: askMsg.components });
        });
      }

      GameEmbed() {
        const status = this.options.turnMessage.replace("{emoji}", this.getChip()).replace("{player}", this.redTurn ? this.message.author.username : this.opponent.username);

        return new MessageEmbed()
          .setColor(this.options.embed.color)
          .setTitle(this.options.embed.title)
          .setDescription(this.getGameBoard())
          .addField("Status", status)
          .setFooter(`${this.message.author.username} vs ${this.opponent.username}`, this.message.guild.iconURL({ dynamic: true }));
      }


      gameOver(result) {
        this.inGame = false;

        const editEmbed = new MessageEmbed()
          .setColor(this.options.embed.color)
          .setTitle(this.options.embed.title)
          .setDescription(this.getGameBoard())
          .addField("Status", this.getResultText(result))
          .setFooter(`${this.message.author.username} vs ${this.opponent.username}`, this.message.guild.iconURL({ dynamic: true }));

        this.gameEmbed.channel.messages.edit(this.gameEmbed.id, { embeds: [editEmbed] });
        this.gameEmbed.reactions.removeAll();
      }


      checkReactions() {
        const filter = (reaction, user) => Object.keys(reactionNames).includes(reaction.emoji.name) && user.id === this.message.author.id || user.id === this.opponent.id;

        this.gameEmbed.awaitReactions({ filter, max: 1, time: 120000, errors: ["time"] })
          .then(async collected => {
            const reaction = collected.first();
            const user = reaction.users.cache.filter(user => user.id !== this.gameEmbed.author.id).first();

            // Get the turn of the user.
            const turn = this.redTurn ? this.message.author.id : this.opponent.id;

            if (user.id !== turn) {
              reaction.users.remove(user.id);
              return this.checkReactions();
            }

            const column = reactionNames[reaction.emoji.name] - 1;
            let placedX = -1;
            let placedY = -1;

            for (let y = HEIGHT - 1; y >= 0; y--) {
              const chip = gameBoard[column + (y * WIDTH)];
              if (chip === "<:jarvy_blank_checker:893482620216815647>") {
                gameBoard[column + (y * WIDTH)] = this.getChip();
                placedX = column;
                placedY = y;
                break;
              }
            }

            reaction.users.remove(user.id).then(() => {
              if (placedY == 0)
                this.gameEmbed.reactions.cache.get(reaction.emoji.name).remove();

              if (this.hasWon(placedX, placedY)) {
                this.gameOver({ result: "winner", name: user.username, emoji: this.getChip() });
              } else if (this.isBoardFull()) {
                this.gameOver({ result: "tie" });
              } else {
                this.redTurn = !this.redTurn;
                this.gameEmbed.channel.messages.edit(this.gameEmbed.id, { embeds: [this.GameEmbed()] });
                this.checkReactions();
              }
            });
          })
          .catch(collected => {
            console.log(collected);
            this.gameOver({ result: "timeout" });
          });

      }


      hasWon(placedX, placedY) {
        const chip = this.getChip();

        //Horizontal Check
        const y = placedY * WIDTH;
        for (var i = Math.max(0, placedX - 3); i <= placedX; i++) {
          var adj = i + y;
          if (i + 3 < WIDTH) {
            if (gameBoard[adj] === chip && gameBoard[adj + 1] === chip && gameBoard[adj + 2] === chip && gameBoard[adj + 3] === chip)
              return true;
          }
        }
        //Verticle Check
        for (var i = Math.max(0, placedY - 3); i <= placedY; i++) {
          var adj = placedX + (i * WIDTH);
          if (i + 3 < HEIGHT) {
            if (gameBoard[adj] === chip && gameBoard[adj + WIDTH] === chip && gameBoard[adj + (2 * WIDTH)] === chip && gameBoard[adj + (3 * WIDTH)] === chip)
              return true;
          }
        }
        //Ascending Diag
        for (var i = -3; i <= 0; i++) {
          var adjX = placedX + i;
          var adjY = placedY + i;
          var adj = adjX + (adjY * WIDTH);
          if (adjX + 3 < WIDTH && adjY + 3 < HEIGHT) {
            if (gameBoard[adj] === chip && gameBoard[adj + WIDTH + 1] === chip && gameBoard[adj + (2 * WIDTH) + 2] === chip && gameBoard[adj + (3 * WIDTH) + 3] === chip)
              return true;
          }
        }
        //Descending Diag
        for (var i = -3; i <= 0; i++) {
          var adjX = placedX + i;
          var adjY = placedY - i;
          var adj = adjX + (adjY * WIDTH);
          if (adjX + 3 < WIDTH && adjY - 3 >= 0) {
            if (gameBoard[adj] === chip && gameBoard[adj - WIDTH + 1] === chip && gameBoard[adj - (2 * WIDTH) + 2] === chip && gameBoard[adj - (3 * WIDTH) + 3] === chip)
              return true;
          }
        }
        return false;
      }

      getChip() {
        return this.redTurn ? this.emojis.player1 : this.emojis.player2;
      }

      isBoardFull() {
        for (let y = 0; y < HEIGHT; y++)
          for (let x = 0; x < WIDTH; x++)
            if (gameBoard[y * WIDTH + x] === "<:jarvy_blank_checker:893482620216815647>")
              return false;
        return true;
      }

      getResultText(result) {
        if (result.result === "tie")
          return this.options.drawMessage;
        else if (result.result === "timeout")
          return this.options.gameEndMessage;
        else if (result.result === "error")
          return "ERROR: " + result.error;
        else
          return this.options.winMessage.replace("{emoji}", result.emoji).replace("{winner}", result.name);
      }
    }
    new Connect4({
      message: message,
      opponent: message.mentions.users.first(),
      embed: {
        title: "Connect 4",
        color: "#5865F2",
      },
      emojis: {
        player1: "<a:jarvy_red_checked:893482353710743592>",
        player2: "<a:jarvy_purp_checked:893482635903533066>"
      },
      turnMessage: "{emoji} | Its now **{player}** turn!",
      winMessage: "{emoji} | **{winner}** won the game!",
      gameEndMessage: "The game went unfinished :(",
      drawMessage: "It was a draw!",
      askMessage: "Hey {opponent}, {challenger} challenged you for a game of Connect 4!",
      cancelMessage: "Looks like they refused to have a game of Connect4. \:(",
      timeEndMessage: "Since the opponent didnt answer, i dropped the game!",
    }).startGame();

  }
};