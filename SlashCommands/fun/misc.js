const { MessageEmbed, MessageActionRow } = require("discord.js");
const { default: fetch } = require("node-fetch");
const unirest = require("unirest");
module.exports = {
  name: "misc",
  description: "Miscellaneous commands",
  type: "CHAT_INPUT",
  options: [
    {
      name: "clap",
      description: "Adds the clap emoji between all the words",
      type: 1,
      options: [
        {
          name: "string",
          description: "The string to clapify",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "cowsay",
      description: "Cow say!",
      type: 1,
      options: [
        {
          name: "string",
          description: "The string to cowsayify",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "dadjoke",
      description: "Get a dad joke!",
      type: 1,
    },
    {
      name: "flip",
      description: "Flip the text",
      type: 1,
      options: [
        {
          name: "string",
          description: "The string to flip",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "hack",
      description: "Hacks a user",
      type: 1,
      options: [
        {
          name: "user",
          description: "The user to hack. Defaults to you",
          type: "USER",
          required: false,
        },
      ],
    },
    {
      name: "hidetext",
      description:
        "Send a text with a part hidden to desktop users. Can be used to hide pings or invite links.",
      type: 1,
      options: [
        {
          name: "text",
          description: "The text to show",
          type: "STRING",
          required: true,
        },
        {
          name: "hide",
          description: "The text to hide",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "mock",
      description: "Mocks the given text",
      type: 1,
      options: [
        {
          name: "text",
          description: "The text to mock",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "clap") {
      const string = interaction.options.getString("string");
      interaction.reply({ content: string.split(" ").join(":clap:") });
    } else if (interaction.options.getSubcommand() === "cowsay") {
      const splitMessage = interaction.options.getString("string");
      var req = unirest(
        "GET",
        "http://cowsay.morecode.org/say?message=" +
          encodeURIComponent(splitMessage) +
          "&format=text"
      );

      req.end((res) => {
        if (res.error) {
          errorMessage();
          throw new Error(res.error);
        }
        try {
          interaction
            .reply({ content: "```" + res.body + "```" })
            .catch((err) => {
              console.log("cow error " + err);
            });
        } catch (error) {
          console.log("intr error " + error);
        }
      });
    } else if (interaction.options.getSubcommand() === "dadjoke") {
      fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      }).then(async (res) => {
        const body = await res.json();
        if (res.error) {
          throw new Error(res.error);
        }
        try {
          interaction.reply({ content: body.joke });
        } catch (error) {
          console.log("intr error " + error);
        }
      });
    } else if (interaction.options.getSubcommand() === "flip") {
      const string = interaction.options.getString("string");
      const flip = {
        a: "\u0250",
        b: "q",
        c: "\u0254",
        d: "p",
        e: "\u01dd",
        f: "\u025f",
        g: "\u0253",
        h: "\u0265",
        i: "\u0131",
        j: "\u027e",
        k: "\u029e",
        l: "l",
        m: "\u026f",
        n: "u",
        r: "\u0279",
        t: "\u0287",
        v: "\u028c",
        w: "\u028d",
        y: "\u028e",
        A: "\u2200",
        B: "\u1660",
        C: "\u0186",
        D: "\u15e1",
        E: "\u018e",
        F: "\u2132",
        G: "\u2141",
        J: "\u017f",
        K: "\u22ca",
        L: "\u02e5",
        M: "W",
        P: "\u0500",
        Q: "\u038c",
        R: "\u1d1a",
        T: "\u22a5",
        U: "\u2229",
        V: "\u039b",
        Y: "\u2144",
        1: "\u21c2",
        2: "\u1105",
        3: "\u0190",
        4: "\u3123",
        5: "\u078e",
        6: "9",
        7: "\u3125",
        "&": "\u214b",
        ".": "\u02d9",
        '"': "\u201e",
        ";": "\u061b",
        "[": "]",
        "(": ")",
        "{": "}",
        "?": "\u00bf",
        "!": "\u00a1",
        "'": ",",
        "<": ">",
        "\u203e": "_",
        "\u00af": "_",
        "\u203f": "\u2040",
        "\u2045": "\u2046",
        "\u2234": "\u2235",
        "\r": "\n",
        ß: "\u1660",
        "\u0308": "\u0324",
        ä: "\u0250\u0324",
        ö: "o\u0324",
        ü: "n\u0324",
        Ä: "\u2200\u0324",
        Ö: "O\u0324",
        Ü: "\u2229\u0324",
        "\u00b4": " \u0317",
        é: "\u01dd\u0317",
        á: "\u0250\u0317",
        ó: "o\u0317",
        ú: "n\u0317",
        É: "\u018e\u0317",
        Á: "\u2200\u0317",
        Ó: "O\u0317",
        Ú: "\u2229\u0317",
        "`": " \u0316",
        è: "\u01dd\u0316",
        à: "\u0250\u0316",
        ò: "o\u0316",
        ù: "n\u0316",
        È: "\u018e\u0316",
        À: "\u2200\u0316",
        Ò: "O\u0316",
        Ù: "\u2229\u0316",
        "^": " \u032e",
        ê: "\u01dd\u032e",
        â: "\u0250\u032e",
        ô: "o\u032e",
        û: "n\u032e",
        Ê: "\u018e\u032e",
        Â: "\u2200\u032e",
        Ô: "O\u032e",
        Û: "\u2229\u032e",
      };
      const flipword = function (str) {
        const c = [];
        for (let a, d = 0, e = str.length; d < e; d++) {
          (a = str.charAt(d)),
            d > 0 &&
            (a == "\u0324" || a == "\u0317" || a == "\u0316" || a == "\u032e")
              ? ((a = flip[str.charAt(d - 1) + a]), c.pop())
              : ((a = flip[a]), typeof a == "undefined" && (a = str.charAt(d))),
            c.push(a);
        }
        return c.reverse().join("");
      };
      interaction.reply({ content: flipword(string) });
    } else if (interaction.options.getSubcommand() === "hack") {
      let user =
        interaction.options.getUser("user").username ||
        interaction.user.username;

      let text = [
        `Getting ${user}'s **Mobile phone number**..`,
        `Getting ${user}'s **Gmails**..`,
        `Sending **VIRUS** into ${user}`,
        `Stealing ${user}'s **Game acc**..`,
        `**Getting all about ${user}'s information**`,
        `Getting ${user}'s **PHN account**`,
      ];

      let current = 0;
      let count = text.length;
      let editTime = 3000;

      interaction
        .reply({ content: `Checking ${user}'s acc`, fetchReply: true })
        .then(() => {
          let interval = setInterval(() => {
            if (current === count) {
              interaction.editReply({
                content: `**Successfull hacked ${user}'s acc !!**`,
              });
              clearInterval(interval);
              return;
            }

            let hackMsg = text[current];
            interaction.editReply({ content: hackMsg });
            current++;
          }, editTime);
        });
    } else if (interaction.options.getSubcommand() === "hidetext") {
      const strshow = interaction.options.getString("text");
      const strhide = interaction.options.getString("hide");

      interaction.reply(
        `${strshow}  ||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍||‍ ${strhide}`
      );
    } else if (interaction.options.getSubcommand() === "mock") {
      const randomizeCase = (word) =>
        word
          .split("")
          .map((c) => (Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()))
          .join("");
      const string = interaction.options.getString("text");
      const mockEmbed = new MessageEmbed()
        .setColor("#00ff00")
        .setDescription(randomizeCase(string))
        .setImage(
          "https://cdn.discordapp.com/attachments/424889733043191810/425242569325150208/mock.jpg"
        );
      interaction.reply({ embeds: [mockEmbed] });
    }
  },
};
