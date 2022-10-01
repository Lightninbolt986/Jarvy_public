const emojiItems = [
  {
    title: "9 to 5",
    artist: ["Dolly Parton"],
    featuredArtist: [],
    emojiImgs: "9️⃣👉5️⃣",
    musicVideo: "https://www.youtube.com/watch?v=UbxUSsFXYo4",
    genres: ["pop"],
    year: 1980,
  },
  {
    title: "The Archer",
    artist: ["Taylor Swift"],
    featuredArtist: [],
    emojiImgs: "🏹💁",
    musicVideo: "https://www.youtube.com/watch?v=8KpKc3C9V3w",
    genres: ["pop"],
    year: 2019,
  },
  {
    title: "A Whole New World",
    artist: ["ZAYN", "Zhavia Ward"],
    featuredArtist: [],
    emojiImgs: "🆕🌎",
    musicVideo: "https://www.youtube.com/watch?v=rg_zwK_sSEY",
    genres: ["disney", "children music"],
    year: 2019,
  },
  {
    title: "American Girl",
    artist: ["Tom Petty & The Heartbreakers"],
    featuredArtist: [],
    emojiImgs: ":flag_us:👧",
    musicVideo: [],
    genres: ["pop rock", "rock"],
    year: 1976,
  },
  {
    title: "American Pie",
    artist: ["Don McLean"],
    featuredArtist: [],
    emojiImgs: ":flag_us:🥧",
    musicVideo: "https://www.youtube.com/watch?v=iX_TFkut1PM",
    genres: ["folk-rock", "classic-rock"],
    year: 1971,
  },
  {
    title: "Bleeding Love",
    artist: ["Leona Lewis"],
    featuredArtist: [],
    emojiImgs: "💉💕👧",
    musicVideo: "https://www.youtube.com/watch?v=7_weSk0BonM",
    genres: ["pop", "r&b"],
    year: 2007,
  },
  {
    title: "Blood Sweat & Tears",
    artist: ["BTS"],
    featuredArtist: [],
    emojiImgs: "💉💦😭",
    musicVideo: "https://www.youtube.com/watch?v=hmE9f-TEutc",
    genres: ["k-pop", "pop"],
    year: 2016,
  },
  {
    title: "...Baby One More Time",
    artist: ["Britney Spears"],
    featuredArtist: [],
    emojiImgs: "👶1️⃣➕⏰",
    musicVideo: "https://www.youtube.com/watch?v=C-u5WLJ9Yk4",
    genres: ["pop"],
    year: 1998,
  },
  {
    title: "Bang Bang",
    artist: ["Jessie J"],
    featuredArtist: ["Ariana Grande & Nicki Minaj"],
    emojiImgs: "👧💥👩💥👩",
    musicVideo: "https://www.youtube.com/watch?v=0HDdjwpPM3Y",
    genres: ["pop"],
    year: 2014,
  },
  {
    title: "Burnin' Up",
    artist: ["Jonas Brothers"],
    featuredArtist: [],
    emojiImgs: "🔥⬆️",
    musicVideo: "https://www.youtube.com/watch?v=5KNEZJ6KkLI",
    genres: ["pop", "rock"],
    year: 2008,
  },
  {
    title: "Bye Bye Bye",
    artist: ["*NSYNC"],
    featuredArtist: [],
    emojiImgs: "👋👋👋",
    musicVideo: "https://www.youtube.com/watch?v=Eo-KmOd3i7s",
    genres: ["pop"],
    year: 2000,
  },
  {
    title: "Call Me Baby",
    artist: ["EXO"],
    featuredArtist: [],
    emojiImgs: "📞⬇️👶",
    musicVideo: "https://www.youtube.com/watch?v=yWfsla_Uh80",
    genres: ["K-pop"],
    year: 2015,
  },
  {
    title: "Call Me Maybe",
    artist: ["Carly Rae Jepsen"],
    featuredArtist: [],
    emojiImgs: "📞⬇️❓",
    musicVideo: "https://www.youtube.com/watch?v=fWNaR-rxAic",
    genres: ["pop"],
    year: 2011,
  },
  {
    title: "Castle on the Hill",
    artist: ["Ed Sheeran"],
    featuredArtist: [],
    emojiImgs: "🏰🏔️",
    musicVideo: "https://www.youtube.com/watch?v=K0ibBPhiaG0",
    genres: ["pop", "singer-songwriter"],
    year: 2017,
  },
  {
    title: "Sing",
    artist: ["Ed Sheeran"],
    featuredArtist: ["Pharrell Williams"],
    emojiImgs: "👨🎤🎼",
    musicVideo: "https://www.youtube.com/watch?v=tlYcUqEPN58",
    genres: ["pop", "singer-songwriter"],
    year: 2014,
  },
  {
    title: "Cherry Bomb",
    artist: ["NCT 127"],
    featuredArtist: [],
    emojiImgs: "🍒💣",
    musicVideo: "https://www.youtube.com/watch?v=WkuHLzMMTZM",
    genres: ["edm", "electro-pop", "hip-hop"],
    year: 2017,
  },
  {
    title: "Circus",
    artist: ["Britney Spears"],
    featuredArtist: [],
    emojiImgs: "🎪",
    musicVideo: "https://www.youtube.com/watch?v=lVhJ_A8XUgc",
    genres: ["dance-pop", "electropop"],
    year: 2008,
  },
  {
    title: "Countdown",
    artist: ["Beyonce"],
    featuredArtist: [],
    emojiImgs: "🔟➡1👒",
    musicVideo: "https://www.youtube.com/watch?v=2XY3AvVgDns",
    genres: ["pop", "r&b"],
    year: 2011,
  },
  {
    title: "Crown",
    artist: ["TXT"],
    featuredArtist: [],
    emojiImgs: "👑",
    musicVideo: "https://www.youtube.com/watch?v=W3iSnJ663II",
    genres: ["k-pop", "pop", "dance"],
    year: 2019,
  },
  {
    title: "Cry Me A River",
    artist: ["Justin Timberlake"],
    featuredArtist: [],
    emojiImgs: "😢⬇️🌊",
    musicVideo: "https://www.youtube.com/watch?v=DksSPZTZES0",
    genres: ["R&B"],
    year: 2002,
  },
  {
    title: "Diamonds",
    artist: ["Rihanna"],
    featuredArtist: [],
    emojiImgs: "💎💎💎",
    musicVideo: "https://www.youtube.com/watch?v=lWA2pjMjpBs",
    genres: ["pop", "rb"],
    year: 2012,
  },
  {
    title: "Drunk",
    artist: ["Ed Sheeran"],
    featuredArtist: [],
    emojiImgs: "🥴🍻",
    musicVideo: "https://www.youtube.com/watch?v=G2fOum_KWQU",
    genres: ["pop", "folk"],
    year: 2011,
  },
  {
    title: "Drunk In Love",
    artist: "Beyonce",
    featuredArtist: "Jay-Z",
    emojiImgs: "🥴🍻💖💃",
    musicVideo: "https://www.youtube.com/watch?v=p1JPKLa-Ofc",
    genres: ["R&B", "hip hop", " trap"],
    year: 2013,
  },
  {
    title: "Everybody Wants To Rule The World",
    artist: ["Tears For Fears"],
    featuredArtist: [],
    emojiImgs: "👩👨🧑👧📏🌏",
    musicVideo: "https://www.youtube.com/watch?v=aGCdLKXNF3w",
    genres: ["Rock", "New wave", "Synth-pop", "Pop"],
    year: 1985,
  },
  {
    title: "Fire",
    artist: ["BTS"],
    featuredArtist: [],
    emojiImgs: "🔥",
    musicVideo: "https://www.youtube.com/watch?v=ALj5MKjy2BU",
    genres: ["k-pop", "pop"],
    year: 2016,
  },
  {
    title: "Firework",
    artist: ["Katy Perry"],
    featuredArtist: [],
    emojiImgs: "🧨💥",
    musicVideo: "https://www.youtube.com/watch?v=QGJuMBdaqIw",
    genres: ["pop"],
    year: 2010,
  },
  {
    title: "Genie in a Bottle",
    artist: ["Christina Aguilera"],
    featuredArtist: [],
    emojiImgs: "🧞👉🍾",
    musicVideo: "https://www.youtube.com/watch?v=kIDWgqDBNXA",
    genres: ["pop"],
    year: 1999,
  },
  {
    title: "Girl On Fire",
    artist: ["Alicia Keys"],
    featuredArtist: [],
    emojiImgs: "👧👉🔥",
    musicVideo: "https://www.youtube.com/watch?v=J91ti_MpdHA",
    genres: ["r&b"],
    year: 2012,
  },
  {
    title: "How Could An Angel Break My Heart",
    artist: ["Tony Braxton"],
    featuredArtist: [],
    emojiImgs: "👼💔😭",
    musicVideo: "https://www.youtube.com/watch?v=qsDJRTzN9FY",
    genres: ["R&B", "‎soul‎", "pop"],
    year: 1997,
  },
  {
    title: "Happy",
    artist: ["Pharrell Williams"],
    featuredArtist: [],
    emojiImgs: "😁",
    musicVideo: "https://www.youtube.com/watch?v=y6Sxv-sUYtM",
    genres: ["pop"],
    year: 2013,
  },
  {
    title: "Hot N Cold",
    artist: ["Katy Perry"],
    featuredArtist: [],
    emojiImgs: "🔥◽️❄️",
    musicVideo: "https://www.youtube.com/watch?v=kTHNpusq654",
    genres: ["pop", "pop-dance"],
    year: 2008,
  },
  {
    title: "I See Fire",
    artist: ["Ed Sheeran"],
    featuredArtist: [],
    emojiImgs: "👀🔥",
    musicVideo: "https://www.youtube.com/watch?v=2fngvQS_PmQ",
    genres: ["folk"],
    year: 2013,
  },
  {
    title: "I Want to Hold Your Hand",
    artist: ["The Beatles"],
    featuredArtist: [],
    emojiImgs: "🙋🤝👩",
    musicVideo: "https://www.youtube.com/watch?v=jenWdylTtzs",
    genres: ["pop rock"],
    year: 1963,
  },
  {
    title: "Ice Ice Baby",
    artist: ["Vanilla Ice"],
    featuredArtist: [],
    emojiImgs: "❄️❄️👶",
    musicVideo: "https://www.youtube.com/watch?v=rog8ou-ZepE",
    genres: ["hip hop"],
    year: 1989,
  },
  {
    title: "Kill This Love",
    artist: ["Blackpink"],
    featuredArtist: [],
    emojiImgs: "🔪👉🏻💔",
    musicVideo: "https://www.youtube.com/watch?v=2S24-y0Ij3Y",
    genres: ["k-pop", "pop"],
    year: 2019,
  },
  {
    title: "Kiss the Girl",
    artist: ["Samuel E. Wright"],
    featuredArtist: [],
    emojiImgs: "💋👉🏻👧",
    musicVideo: "https://www.youtube.com/watch?v=TrRbB-qUJfY",
    genres: ["pop", "calypso"],
    year: 1989,
  },
  {
    title: "Love Yourself",
    artist: ["Justin Bieber"],
    featuredArtist: [],
    emojiImgs: "💜👆",
    musicVideo: "https://www.youtube.com/watch?v=oyEuk8j8imI",
    genres: ["pop", "acoustic pop"],
    year: 2015,
  },
  {
    title: "Man's Not Hot",
    artist: ["Big Shaq"],
    featuredArtist: [],
    emojiImgs: "👨🏾🚫🔥",
    musicVideo: "https://www.youtube.com/watch?v=3M_5oYU-IsU",
    genres: ["hip-hop", "comedy", "rap"],
    year: 2017,
  },
  {
    title: "My First Kiss",
    artist: ["3OH!3"],
    featuredArtist: ["Kesha"],
    emojiImgs: "👆1️⃣💋",
    musicVideo: "https://www.youtube.com/watch?v=N1MMoZ-DLlY",
    genres: ["pop"],
    year: 2010,
  },
  {
    title: "Nine in the Afternoon",
    artist: ["Panic! at the Disco"],
    featuredArtist: [],
    emojiImgs: "9️⃣🕑",
    musicVideo: "https://www.youtube.com/watch?v=yCto3PCn8wo",
    genres: ["emo", "pop", "punk"],
    year: 2008,
  },
  {
    title: "Party in the USA",
    artist: ["Miley Cyrus"],
    featuredArtist: [],
    emojiImgs: "🎉🎊:flag_us:",
    musicVideo: "https://www.youtube.com/watch?v=M11SvDtPBhA",
    genres: ["pop"],
    year: 2009,
  },
  {
    title: "Piano Man",
    artist: ["Billy Joel"],
    featuredArtist: [],
    emojiImgs: "🎹🤵🏻🎶",
    musicVideo: "https://www.youtube.com/watch?v=gxEPV4kolz0",
    genres: ["Soft rock"],
    year: 1973,
  },
  {
    title: "Ring of Fire",
    artist: ["Jay-Z"],
    featuredArtist: ["Johnny Cash"],
    emojiImgs: "💍🔥",
    musicVideo: "https://www.youtube.com/watch?v=ZxgE4MZkJV4",
    genres: ["rock", "country"],
    year: 1963,
  },
  {
    title: "Rocketman",
    artist: ["Elton John"],
    featuredArtist: [],
    emojiImgs: "🚀👨",
    musicVideo: "https://www.youtube.com/watch?v=DtVBCG6ThDk",
    genres: ["soft rock"],
    year: 1972,
  },
  {
    title: "Single Ladies",
    artist: ["Beyonce"],
    featuredArtist: [],
    emojiImgs: "👯‍♀️🚫💍",
    musicVideo: "https://www.youtube.com/watch?v=4m1EFMoRFvY",
    genres: ["pop", "r&b"],
    year: 2008,
  },
  {
    title: "Sleepwalking",
    artist: ["Bring Me The Horizon"],
    featuredArtist: [],
    emojiImgs: "🛌😴🚶",
    musicVideo: "https://www.youtube.com/watch?v=1EA8g4-vEAQ",
    genres: ["rock", "metal"],
    year: 2013,
  },
  {
    title: "Spanish Guitar",
    artist: ["Tony Braxton"],
    featuredArtist: [],
    emojiImgs: "🎸:flag_sp:",
    musicVideo: "https://www.youtube.com/watch?v=bvd3qCnsAaY",
    genres: ["R&B", "‎soul‎", "pop"],
    year: 2000,
  },
  {
    title: "Suit & Tie",
    artist: ["Justin Timberlake"],
    featuredArtist: ["JAY-Z"],
    emojiImgs: "🤵👔",
    musicVideo: "https://www.youtube.com/watch?v=IsUsVbTj2AY",
    genres: ["pop"],
    year: 2013,
  },
  {
    title: "Telephone",
    artist: ["Lady Gaga"],
    featuredArtist: ["Beyonce"],
    emojiImgs: "☎️",
    musicVideo: "https://www.youtube.com/watch?v=EVBsypHzF3U",
    genres: ["dance", "pop"],
    year: 2010,
  },
  {
    title: "Thunderstruck",
    artist: ["ACDC"],
    featuredArtist: [],
    emojiImgs: "⚡🕺😵",
    musicVideo: "https://www.youtube.com/watch?v=v2AC41dglnM",
    genres: ["rock", "classic-rock"],
    year: 1990,
  },
  {
    title: "Umbrella",
    artist: ["Rihanna"],
    featuredArtist: ["JAY-Z"],
    emojiImgs: "☂️☂️☂️",
    musicVideo: "https://www.youtube.com/watch?v=CvBfHwUxHIk",
    genres: ["pop"],
    year: 2008,
  },
  {
    title: "Under The Sea",
    artist: ["Samuel E. Wright"],
    featuredArtist: [],
    emojiImgs: "👇🌊🧜",
    musicVideo: "https://www.youtube.com/watch?v=GC_mV1IpjWA",
    genres: ["pop", "disney", "reggae", "show-tunes"],
    year: 1989,
  },
];
const chalk = require("chalk");
const {
  MessageSelectMenu,
  MessageActionRow,
  MessageEmbed,
  MessageButton,
} = require("discord.js");

const { AsyncQueue } = require("@sapphire/async-queue");
const { default: axios } = require("axios");
const amariQueue = new AsyncQueue();
module.exports = {
  paginate: async function (embeds, message) {
    const Discord = require("discord.js");
    let first = new Discord.MessageButton()
      .setEmoji("<:first2:926539374546542622>")
      .setStyle("SECONDARY")
      .setCustomId(`first`);

    let previous = new Discord.MessageButton()
      .setEmoji("<:back2:926539569623613472>")
      .setStyle("SECONDARY")
      .setCustomId(`previous`);

    let next = new Discord.MessageButton()
      .setEmoji(`<:next2:926539617350611005>`)
      .setStyle("SECONDARY")
      .setCustomId(`next`);

    let last = new Discord.MessageButton()
      .setEmoji(`<:last2:926539452371857438>`)
      .setStyle("SECONDARY")
      .setCustomId(`last`);

    let dfirst = new Discord.MessageButton()
      .setEmoji("<:first2:926539374546542622>")
      .setStyle("SECONDARY")
      .setCustomId(`dfirst`)
      .setDisabled(true);

    let dprevious = new Discord.MessageButton()
      .setEmoji("<:back2:926539569623613472>")
      .setStyle("SECONDARY")
      .setCustomId(`dprevious`)
      .setDisabled(true);

    let dnext = new Discord.MessageButton()
      .setEmoji(`<:next2:926539617350611005>`)
      .setStyle("SECONDARY")
      .setCustomId(`dnext`)
      .setDisabled(true);

    let dlast = new Discord.MessageButton()
      .setEmoji(`<:last2:926539452371857438>`)
      .setStyle("SECONDARY")
      .setCustomId(`dlast`)
      .setDisabled(true);

    let currentPage = 1;

    let page = new Discord.MessageButton()
      .setStyle("SECONDARY")
      .setCustomId(`page`)
      .setLabel(`${currentPage}/${embeds.length}`)
      .setDisabled(true);
    let butts = [dfirst, dprevious, page, next, last];
    let m;
    if (!message.replied && !message.deferred) {
      m = await message.reply({
        embeds: [embeds[0]],
        components: [new Discord.MessageActionRow().addComponents(butts)],
        fetchReply: true,
      });
    } else {
      m = await message.editReply({
        embeds: [embeds[0]],
        components: [new Discord.MessageActionRow().addComponents(butts)],
        fetchReply: true,
      });
    }
    message.author = message.user;
    const filter = (b) => {
      if (b.user.id === message.author.id) return true;
      return b.reply({
        content: "<:nx_cross:914921124670890064> These are not for you.",
        ephemeral: true,
      });
    };
    const collector = await m.createMessageComponentCollector({
      filter: filter,
      time: 300000,
    });

    collector.on("collect", async (i) => {
      i.deferUpdate();
      if (i.customId === "first") {
        currentPage = 1;

        let page = new Discord.MessageButton()
          .setStyle("SECONDARY")
          .setCustomId(`page`)
          .setLabel(`${currentPage}/${embeds.length}`)
          .setDisabled(true);

        const buttons = [dfirst, dprevious, page, next, last];
        const components = new Discord.MessageActionRow().addComponents(
          buttons
        );

        m.edit({
          embeds: [embeds[currentPage - 1]],
          components: [components],
        }).catch(() => {});
      }

      if (i.customId === "previous") {
        currentPage--;

        let page = new Discord.MessageButton()
          .setStyle("SECONDARY")
          .setCustomId(`page`)
          .setLabel(`${currentPage}/${embeds.length}`)
          .setDisabled(true);

        const dbuttons = [dfirst, dprevious, page, next, last];
        const dcomponents = new Discord.MessageActionRow().addComponents(
          dbuttons
        );
        const buttons = [first, previous, page, next, last];
        const components = new Discord.MessageActionRow().addComponents(
          buttons
        );

        m.edit({
          embeds: [embeds[currentPage - 1]],
          components: currentPage > 1 ? [components] : [dcomponents],
        }).catch(() => {});
      }

      if (i.customId === "next") {
        currentPage++;

        let page = new Discord.MessageButton()
          .setStyle("SECONDARY")
          .setCustomId(`page`)
          .setLabel(`${currentPage}/${embeds.length}`)
          .setDisabled(true);

        const dbuttons = [first, previous, page, dnext, dlast];
        const dcomponents = new Discord.MessageActionRow().addComponents(
          dbuttons
        );
        const buttons = [first, previous, page, next, last];
        const components = new Discord.MessageActionRow().addComponents(
          buttons
        );

        m.edit({
          embeds: [embeds[currentPage - 1]],
          components:
            currentPage < embeds.length ? [components] : [dcomponents],
        }).catch(() => {});
      }

      if (i.customId === "last") {
        currentPage = embeds.length;

        let page = new Discord.MessageButton()
          .setStyle("SECONDARY")
          .setCustomId(`page`)
          .setLabel(`${currentPage}/${embeds.length}`)
          .setDisabled(true);

        const buttons = [first, previous, page, dnext, dlast];
        const components = new Discord.MessageActionRow().addComponents(
          buttons
        );

        m.edit({
          embeds: [embeds[currentPage - 1]],
          components: [components],
        }).catch(() => {});
      }
    });

    collector.on("end", (mes, r) => {
      if (r == "time") {
        let lpage = new Discord.MessageButton()
          .setStyle("SECONDARY")
          .setCustomId(`page`)
          .setLabel(`${currentPage}/${embeds.length}`)
          .setDisabled(true);

        const dbutts = [dfirst, dprevious, lpage, dnext, dlast];
        m.edit({
          embeds: [embeds[currentPage - 1]],
          components: [new Discord.MessageActionRow().addComponents(dbutts)],
        });
      }
    });
  },
  getNumbers: function (num, max = 100, min = 0) {
    var arr = [];
    while (arr.length < num) {
      var r = Math.floor(Math.random() * max) + 1;
      if (arr.indexOf(r) === -1 && r > min) arr.push(r);
    }
    return arr;
  },
  shuffleArray: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  getBingos: function (nums) {
    let bingos = 0;
    //1st column
    if (
      nums[0].includes(" ") &&
      nums[1].includes(" ") &&
      nums[2].includes(" ") &&
      nums[3].includes(" ") &&
      nums[4].includes(" ")
    ) {
      bingos++;
    }
    //2nd column
    if (
      nums[5].includes(" ") &&
      nums[6].includes(" ") &&
      nums[7].includes(" ") &&
      nums[8].includes(" ") &&
      nums[9].includes(" ")
    ) {
      bingos++;
    }
    //3rd column
    if (
      nums[10].includes(" ") &&
      nums[11].includes(" ") &&
      nums[12].includes(" ") &&
      nums[13].includes(" ")
    ) {
      bingos++;
    }
    // 4th column
    if (
      nums[14].includes(" ") &&
      nums[15].includes(" ") &&
      nums[16].includes(" ") &&
      nums[17].includes(" ") &&
      nums[18].includes(" ")
    ) {
      bingos++;
    }
    //5th column
    if (
      nums[19].includes(" ") &&
      nums[20].includes(" ") &&
      nums[21].includes(" ") &&
      nums[22].includes(" ") &&
      nums[23].includes(" ")
    ) {
      bingos++;
    }

    //1st row
    if (
      nums[0].includes(" ") &&
      nums[5].includes(" ") &&
      nums[10].includes(" ") &&
      nums[14].includes(" ") &&
      nums[19].includes(" ")
    ) {
      bingos++;
    }

    //2nd row
    if (
      nums[1].includes(" ") &&
      nums[6].includes(" ") &&
      nums[11].includes(" ") &&
      nums[15].includes(" ") &&
      nums[20].includes(" ")
    ) {
      bingos++;
    }

    //3rd row
    if (
      nums[2].includes(" ") &&
      nums[7].includes(" ") &&
      nums[16].includes(" ") &&
      nums[21].includes(" ")
    ) {
      bingos++;
    }

    //4th row
    if (
      nums[3].includes(" ") &&
      nums[8].includes(" ") &&
      nums[12].includes(" ") &&
      nums[17].includes(" ") &&
      nums[22].includes(" ")
    ) {
      bingos++;
    }

    //5th row
    if (
      nums[4].includes(" ") &&
      nums[9].includes(" ") &&
      nums[13].includes(" ") &&
      nums[18].includes(" ") &&
      nums[23].includes(" ")
    ) {
      bingos++;
    }

    //top left to bottom right diagnal
    if (
      nums[0].includes(" ") &&
      nums[6].includes(" ") &&
      nums[17].includes(" ") &&
      nums[23].includes(" ")
    ) {
      bingos++;
    }

    //top right to bottom left diagnol
    if (
      nums[19].includes(" ") &&
      nums[15].includes(" ") &&
      nums[2].includes(" ") &&
      nums[8].includes(" ") &&
      nums[4].includes(" ")
    ) {
      bingos++;
    }

    return bingos;
  },
  formatArray: function (arr) {
    var outStr = "";
    if (arr.length === 1) {
      outStr = arr[0];
    } else if (arr.length === 2) {
      //joins all with "and" but no commas
      //example: "bob and sam"
      outStr = arr.join(" and ");
    } else if (arr.length > 2) {
      //joins all with commas, but last one gets ", and" (oxford comma!)
      //example: "bob, joe, and sam"
      outStr = arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
    }
    return outStr;
  },
  arrayEquals: function (a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  },
  ttsNumber: function (number) {
    if (parseInt(number).toString().length === 1) {
      return `Single digit ${number}.`;
    } else
      return `${number.toString()[0]} and ${number.toString()[1]}, ${number}.`;
  },
  generateArray: (n) => [...Array(n).keys()].map((foo) => foo + 1),
  SongEmoji: () => {
    const Emojiobj = emojiItems[Math.floor(Math.random() * emojiItems.length)];
    return Emojiobj;
  },
  create_mh: (array) => {
    if (!array)
      throw new Error(
        chalk.red.bold(
          "The options were not provided! Make sure you provide all the options!"
        )
      );
    if (array.length < 0)
      throw new Error(
        chalk.red.bold(`The array has to have atleast one thing to select!`)
      );
    let select_menu;

    let id = "help-menus";

    let menus = [];

    const emo = {
      utility: {
        name: "jarvy_util",
        id: "893217287522357279",
      },
      nsfw: {
        name: "jarvy_nsfw",
        id: "893216903907135548",
      },
      fun: {
        name: "jarvy_fun",
        id: "893216745551196191",
      },
      animations: {
        name: "jarvy_animation",
        id: "893216666777956412",
      },
      autoposting: {
        name: "jarvy_auto",
        id: "893217211823587390",
      },
      music: {
        name: "jarvy_moosic",
        id: "893217343193382988",
      },
      giveaway: {
        name: "jarvy_gw",
        id: "893216817147961374",
      },
      image: {
        name: "jarvy_img",
        id: "893216970307149904",
      },
      facts: {
        name: "jarvy_fax",
        id: "893217154034466827",
      },
      uno: {
        name: "jarvy_uno",
        id: "893217104310960178",
      },
      roleplay: {
        name: "jarvy_rp",
        id: "893217028691881994",
      },
      under_maintainance: {
        name: "broken",
        id: "879049755865514024",
      },
    };

    array.forEach((cca) => {
      let name = cca;
      let sName = `${name.toUpperCase()}`;
      let tName = name.charAt(0).toUpperCase() + name.slice(1);
      let fName = name.toUpperCase();
      let emoji = emo[name.toLowerCase()];

      return menus.push({
        label: sName,
        description: `${tName} commands!`,
        value: fName,
        emoji: emoji,
      });
    });

    let chicken = new MessageSelectMenu()
      .setCustomId(id)
      .setPlaceholder("Choose the command category")
      .addOptions(menus);

    select_menu = new MessageActionRow().addComponents(chicken);

    return {
      smenu: [select_menu],
      sid: id,
    };
  },
  getMultipleRandom: (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  },
  giveawayStart: async function (msgId, client) {
    const { fetchAmari, giveawayEnd } = require("./functions.js");
    const guildSchema = require("./models/guildSchema");
    let gaw = await guildSchema.findOne({ "giveaways.giveaways.id": msgId });
    let giveaway = gaw.giveaways.giveaways.find((e) => e.id === msgId);
    const msg = client.channels.cache
      .get(giveaway.channel)
      .messages.cache.get(giveaway.id);
    const collector = msg.createMessageComponentCollector({
      time: giveaway.time - Date.now(),
      componentType: "BUTTON",
    });
    collector.on("collect", async (i) => {
      if (i.customId === "gaw-join") {
        //Fetch member from i.user
        await i.deferReply({ ephemeral: true });
        gaw = await guildSchema.findOne({
          "giveaways.giveaways.id": i.message.id,
        });
        giveaway = gaw.giveaways.giveaways.find((e) => e.id === msgId);
        const member = await i.guild.members.fetch(i.user.id);
        if (!giveaway.entries.includes(i.user.id)) {
          if (giveaway.requirements.bypassroles) {
            if (
              !giveaway.requirements.bypassroles.some((el) =>
                member.roles.cache.has(el)
              )
            ) {
              if (giveaway.requirements.roles) {
                if (
                  !giveaway.requirements.roles.every((role) =>
                    member.roles.cache.has(role)
                  )
                ) {
                  return i.editReply(
                    "You do not have the required roles to enter!"
                  );
                }
              }
              if (giveaway.requirements.blacklistroles) {
                if (
                  giveaway.requirements.blacklistroles.some((role) =>
                    member.roles.cache.get(role)
                  )
                ) {
                  return i.editReply(
                    "You are blacklisted from entering the giveaway!"
                  );
                }
              }
              //amari
              if (giveaway.requirements.amari || giveaway.requirements.wamari) {
                amariData = await fetchAmari(i.user.id, i.guild.id);
                if (!amariData)
                  return i.editReply("Error fetching amari data!");
                if (giveaway.requirements.amari) {
                  if (amariData.level < giveaway.requirements.amari) {
                    return i.editReply(
                      `Your amari level is too low to enter! You need ${giveaway.requirements.amari} but you have ${amariData.level}`
                    );
                  }
                }
                if (giveaway.requirements.wamari) {
                  if (amariData.weeklyExp < giveaway.requirements.wamari) {
                    return i.editReply(
                      `Your amari weekly exp is too low to enter! You need ${giveaway.requirements.wamari} but you have ${amariData.weeklyExp}`
                    );
                  }
                }
              }
            }
          }
          await guildSchema.findOneAndUpdate(
            { "giveaways.giveaways.id": msgId },
            {
              $push: {
                "giveaways.giveaways.$.entries": i.user.id,
              },
            }
          );
          i.editReply("You have successfully entered the giveaway!");
          const row = i.message.components[0].components;
          const button = row.find((e) => e.customId === i.customId);
          row
            .find((e) => e.customId === i.customId)
            .setLabel(`${parseInt(button.label) + 1}`);

          i.message.edit({
            components: [new MessageActionRow().addComponents(row)],
          });
        } else {
          i.editReply("You have already entered the giveaway!");
        }
      }
    });
    collector.on("end", async () => {
      await giveawayEnd(msg.id, client);
    });
  },
  fetchAmari: async function (userID, guildID) {
    try {
      amariQueue.wait();
      const options = {
        url: `https://amaribot.com/api/v1/guild/${guildID}/member/${userID}`,
        method: "GET",
        headers: {
          Authorization: process.env.amariApiKey,
          "Content-Type": "application/json",
        },
      };

      const res = await axios.request(options);
      if (!res.statusCode == 200) {
        return "ERROR_CODE";
      } else {
        return res.data;
      }
    } catch (e) {
      console.log(e);
      return "ERROR_CODE";
    } finally {
      amariQueue.shift();
    }
  },
  giveawayEnd: async function (msgId, client) {
    const { getMultipleRandom } = require("./functions.js");
    const guildSchema = require("./models/guildSchema");
    let gaw = await guildSchema.findOne({ "giveaways.giveaways.id": msgId });
    let giveaway = gaw.giveaways.giveaways.find((e) => e.id === msgId);
    const msg = client.channels.cache
      .get(giveaway.channel)
      .messages.cache.get(giveaway.id);
    if (!msg) {
      await guildSchema.findOneAndDelete(
        { GuildID: interaction.guild.id },
        {
          $pull: {
            "giveaways.giveaways": giveaway,
          },
        },
        { upsert: true }
      );
    }
    if (giveaway.time < Date.now()) {
      const entries = giveaway.entries;
      let winners = "";
      let win = false;
      if (!entries.length) {
        winners = "None";
      } else if (entries.length < giveaway.winners) {
        win = entries;
        winners = `<@${win.join(">, <@")}>`;
      } else {
        win = getMultipleRandom(entries, giveaway.winners);
        winners = `<@${win.join(">, <@")}>`;
      }

      //const winner = entries[Math.floor(Math.random() * entries.length)];
      //incorporate settings
      const desc1 = msg.embeds[0].description.split(
        "<:bp_reply:905405401946783804>Requirements:"
      );
      msg.edit({
        embeds: [
          new MessageEmbed()
            .setTitle(`<:bp_gift:923106198906093619> ${giveaway.prize}`)
            .setThumbnail(msg.guild.iconURL())
            //TODO: add settings
            .setDescription(
              desc1[0].replace("ends", "ended") +
                `<:bp_replycont:905405321277763624>Winner(s): ${winners}\n` +
                "<:bp_reply:905405401946783804>Requirements:" +
                desc1[1]
            )
            .setFooter({ text: "Started" })
            .setTimestamp(msg.embeds[0].timestamp)
            .setColor("#5865F2"),
        ],
        components: [
          new MessageActionRow().addComponents(
            msg.components[0].components[0].setDisabled(),
            new MessageButton()
              .setLabel("Reroll")
              .setCustomId("gaw-reroll")
              .setStyle("SECONDARY"),

            msg.components[0].components[2]
          ),
        ],
      });
      msg.reply({
        embeds: [
          new MessageEmbed()
            .setTitle("The giveaway has ended!")
            .setDescription(
              `${winners} won the giveaway for ${giveaway.prize}`
            ),
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("JUMP to giveaway")
              .setURL(msg.url)
              .setStyle("LINK")
          ),
        ],
      });
      const gi = await guildSchema.findOne({ GuildID: msg.guild.id });
      gi.giveaways.giveaways.find((e) => e.id === msgId).ended = true;
      gi.giveaways.giveaways.find((e) => e.id === msgId).winner = win;
      gi.save();
    } else {
      return;
    }
  },
  TextSmall: function (text, length) {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  },
};
