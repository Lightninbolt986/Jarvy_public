module.exports = (client, Discord) => {
  const glob = require("glob");
  glob(`${__dirname}/../commands/**/*.js`, async (err, filePaths) => {
    if (err) return console.log(err);
    filePaths.forEach((file) => {
      delete require.cache[require.resolve(file)];
      const pull = require(file);
      if (pull.name) {
        client.commands.set(pull.name, pull);
        console.log(`✅ ${pull.name} loaded`)
      }
    });
  });
}