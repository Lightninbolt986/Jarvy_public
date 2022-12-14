const fs = require("fs");
const categories = fs.readdirSync("./SlashCommands/");
module.exports = (client) => {
  const arrayOfSlashCommands = [];
  for (const category of categories) {
    const slash_command_Files = fs
      .readdirSync(`./SlashCommands/${category}`)
      .filter((File) => File.endsWith(".js"));

    for (const file of slash_command_Files) {
      const command = require(`../SlashCommands/${category}/${file}`);
      if (command.name) {
        client.slashCommands.set(command.name, command);
        if (["MESSAGE", "USER"].includes(command.type))
          delete command.description;
        arrayOfSlashCommands.push(command);
      } else {
        continue;
      }
    }
  }
  client.once("ready", async () => {
    await client.application.commands.set(arrayOfSlashCommands);
  });
};
