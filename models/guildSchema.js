const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
  GuildID: { type: String, unique: true },
  Prefix: { type: String, default: "j!" },
  raffle: {
    type: Object,
  },
  giveaways: { type: Object },
});

module.exports = mongoose.model("guilds", GuildSchema);
