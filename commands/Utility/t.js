module.exports = {
  name: "t",
  async execute(message, args, cm, client) {
    function getCommands(comd) {
      const output = [];
      comd.forEach((cmd) => {
        if (
          !cmd.options?.some((option) => option.type === 1 || option.type === 2)
        )
          output.push({
            name: `/${cmd.name}`,
            description: cmd.description || "No description",
          });
        else {
          cmd.options.forEach((option) => {
            if (option.type === 1) {
              output.push({
                name: `/${cmd.name} ${option.name}`,
                description: option.description || "No description",
              });
            } else if (option.type === 2) {
              option.options.forEach((subOption) => {
                if (subOption.type === 1) {
                  output.push({
                    name: `/${cmd.name} ${option.name} ${subOption.name}`,
                    description: subOption.description || "No description",
                  });
                }
              });
            }
          });
        }
      });
    }
    console.log(getCommands(client.SlashCommands));
  },
};
