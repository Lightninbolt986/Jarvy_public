const mongoose = require(`mongoose`);
const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  hugs: { type: Number, default: 0 },
  kisses: { type: Number, default: 0 },
  insults: { type: Number, default: 0 },
  praises: { type: Number, default: 0 },
  fucks: { type: Number, default: 0 },
  pats: { type: Number, default: 0 },
  slaps: { type: Number, default: 0 },
  winks: { type: Number, default: 0 },
  is_afk: {
    type: Boolean,
  },
  afkreason: {
    type: String,
  },
  afkPings: {
    type: Array,
  },
});

const model = mongoose.model(`ProfileModels`, profileSchema);

module.exports = model;
