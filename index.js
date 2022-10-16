const Discord = require("discord.js");

const client = new Discord.Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },

  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
  ],
  partials: ["CHANNEL"],
});
require("dotenv").config();
const token = process.env.token;
const { Collection } = require("discord.js");
const Errorhandler = require("discord-error-handler");
client.handle = new Errorhandler(client, {
  webhook: {
    id: process.env.error_webhook_id,
    token: process.env.error_webhook_token,
  },
});
process.on("unhandledRejection", (error) => {
  client.handle.createrr(client, undefined, undefined, error);
});
mongoose = require("mongoose");
const { DiscordUNO } = require(`discord-uno`);
client.discordUNO = new DiscordUNO("BLURPLE");
client.queue = new Map();
const { DiscordTogether } = require("discord-together");

client.discordTogether = new DiscordTogether(client);
Nuggies = require("nuggies");
Nuggies.connect(process.env.MONGODB_srv);
Nuggies.giveaways.startAgain(client);
Nuggies.handleInteractions(client);

Nuggies.Messages(client, {
  giveawayOptions: {
    dmWinner: true,
    editParticipants: true,
    giveaway:
      "<a:jarvy_gaw:893702902072377425> **GIVEAWAY!** <a:jarvy_gaw:893702902072377425>",
    giveawayDescription:
      "<:jarvy_gw:893216817147961374> Prize: **{prize}**\n<:jarvy_replycont:893214149004390460> Hosted by: {hostedBy}\n<:jarvy_replycont:893214149004390460> Participants: `{totalParticipants}`\n<:jarvy_reply:893214082457550889> Winner(s): `{winners}`\n\nRequirements: {requirements}",
    endedGiveawayDescription:
      "<:jarvy_gw:893216817147961374> Prize: **{prize}**\n<:jarvy_replycont:893214149004390460> Hosted by: {hostedBy}\n<:jarvy_reply:893214082457550889> Winner(s): {winners}",
    giveawayFooterImage:
      "https://media.discordapp.net/attachments/892704135244283916/893702003241418833/ezgif-2-4fb5c8791af4.gif",
    winMessage:
      "Congrats {winners}! You won `{prize}`!! Total `{totalParticipants}` members participated and your winning percentage was `{winPercentage}%`",
    rerolledMessage: "Rerolled! {winner} is the new winner of the giveaway!", // only {winner} placeholder
    toParticipate: "**Click the Enter button to enter the giveaway!**",
    newParticipant:
      "You have successfully entered for this giveaway! your win percentage is `{winPercentage}%` among `{totalParticipants}` other participants", // no placeholders | ephemeral
    alreadyParticipated: "You've already entered this giveaway!", // no placeholders | ephemeral
    noParticipants: "There are not enough people in the giveaway!", // no placeholders
    noRole:
      "You do not have the required role(s)\n{requiredRoles}\n for the giveaway!", // only {requiredRoles} | ephemeral
    dmMessage:
      "You have won a giveaway in **{guildName}**!\nPrize: [{prize}]({giveawayURL})",
    noWinner: "Not enough people participated in this giveaway.", // no {winner} placerholder
    alreadyEnded: "The giveaway has already ended!", // no {winner} placeholder
    dropWin: "{winner} Won The Drop!!",
  },
});
mongoose
  .connect(process.env.MONGODB_srv, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongoosedb");
  })
  .catch((err) => {
    console.log(err);
  });
const { Client } = require("dagpijs");
client.dagpi = new Client(process.env.dagpi_token);
client.events = new Discord.Collection();
client.snipes = [];
client.slashCommands = new Collection();
client.commands = new Discord.Collection();
["command_handler", "event_handler", "slash_command_handler"].forEach(
  (handler) => {
    require(`./handlers/${handler}`)(client, Discord);
  }
);
client.login(token);

