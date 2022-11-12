module.exports = {
  name: "giberr",
  description: "View errors",
  async execute(message) {
    await message.reply("caused an error successfully");

    throw new Error("eeeee");
  },
};
