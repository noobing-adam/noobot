const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
let Embed = require("../tools/embed.js");
this.xox = new Set();
module.exports = {
  category: "Oyun",
  data: new SlashCommandBuilder()
    .setName("xox")
    .setDescription("Biriyle xox oynarsınız.")
    .addUserOption((option) =>
      option
        .setName("kişi")
        .setDescription(
          "Oynamak istediğiniz kişi. (Seçmezseniz yapayzeka ile oynarsınız.)"
        )
    ),
  execute: async (interaction, client) => {
let zero = {
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
    };

    let xox = {
      1: ":one:",
      2: ":two:",
      3: ":three:",
      4: ":four:",
      5: ":five:",
      6: ":six:",
      7: ":seven:",
      8: ":eight:",
      9: ":nine:",
    };
    let zerot = {
      1: xox[1],
      2: xox[2],
      3: xox[3],
      4: xox[4],
      5: xox[5],
      6: xox[6],
      7: xox[7],
      8: xox[8],
      9: xox[9],
    };
    let findwin = (psby, xo) => {
      let good = [];
      let makeit = Object.create(xox)
      psby.forEach((x) => {
        makeit[x] = xo;
        if (win(makeit) == xo) {
          good.push({ win: 1, move: x });
        }
        makeit[x] = zerot[x];
      });
      good = good.find((x) => x.win == 1)
        ? good.filter((x) => x.win == 1)[0]
        : good;
      good = good.win
        ? good
        : { move: psby[Math.floor(Math.random() * psby.length)] };
      return good;
    };
    let doubleAttack = (psb2, xo) => {
      let good = [];
        let rakip = xo == "x" ? "o" : "x";
      psb2.forEach((x) => {
      let makeit = Object.create(xox)
        makeit[x] = xo;
        let psb3 = psb2.filter((y) => y !== x);
        if (findwin(psb3, xo).win) {
          let move2 = findwin(psb3, xo).move;
          makeit[move2] = rakip;
          if (
            findwin(
              psb3.filter((y) => y !== move2),
              xo
            ).win
          ) {
            good.push({ win: 1, move: x });
          }
          makeit[move2] = zerot[move2];
          makeit[x] = zerot[x];
        }
      });
      if (good.length >= 1) return good[0];
      else return { no: 1 };
    };
    let next = (psb3) => {
      let win = findwin(psb3, "o");
      let lose = findwin(psb3, "x");
      if (win.win) {
        return win.move;
      } else if (lose.win) {
        return lose.move;
      } else {
        let da = doubleAttack(psb3, "o");
        let movey = [lose.move, win.move];
        if (!da.no && da.win) movey = da.move;
        else movey = movey[Math.floor(Math.random() * 2)];
        return movey;
      }
    };

    let end;
    let end2;
    let win = (x) => {
      if (x["1"] == x["2"] && x["2"] == x["3"]) {
        end2 = x["1"];
        return end2;
      }
      if (x["4"] == x["5"] && x["5"] == x["6"]) {
        end2 = x["4"];
        return end2;
      }
      if (x["7"] == x["8"] && x["8"] == x["9"]) {
        end2 = x["7"];
        return end2;
      }
      if (x["1"] == x["5"] && x["5"] == x["9"]) {
        end2 = x["1"];
        return end2;
      }
      if (x["3"] == x["5"] && x["5"] == x["7"]) {
        end2 = x["3"];
        return end2;
      }
      if (x["1"] == x["4"] && x["4"] == x["7"]) {
        end2 = x["1"];
        return end2;
      }
      if (x["2"] == x["5"] && x["5"] == x["8"]) {
        end2 = x["2"];
        return end2;
      }
      if (x["3"] == x["6"] && x["6"] == x["9"]) {
        end2 = x["3"];
        return end2;
      }
    };
    let err = (e) =>
      interaction
        .reply({
          embeds: [Embed(":x: Bir hata ile karşılaşıldı. :x:", e, "error")],
          ephemeral: true,
        })
        .catch((err) => {});
    let dön;
    let rakip = interaction.options.getUser("kişi");
    if (rakip) {
      if (rakip.id == interaction.user.id || rakip.bot)
        return err("Rakibiniz kendiniz veya bir bot olamaz.");
      if (this.xox.has(interaction.user.id) || this.xox.has(rakip.id))
        err("Sen veya rakibin zaten bir oyundasınız.");
      let yes = new Discord.ButtonBuilder()
        .setStyle("Success")
        .setLabel("Kabul Et")
        .setCustomId("yes");
      let no = new Discord.ButtonBuilder()
        .setStyle("Danger")
        .setLabel("Reddet")
        .setCustomId("no");
      let row = new Discord.ActionRowBuilder()
        .addComponents(yes)
        .addComponents(no);
      interaction
        .reply({
          content: rakip.toString(),
          embeds: [
            Embed(
              rakip.tag +
                " Sana bir xox isteği gönderildi. Butonlara basıp işlem yapabilirsin.",
              "Kabul etmek veya reddetmek için 60 saniyen var.",
              "info"
            ),
          ],
          components: [row],
          ephemeral: false,
        })
        .catch((err) => {});
      const filter2 = (i) =>
        (i.customId === "yes" || i.customId === "no") && i.user.id === rakip.id;
      let int = await interaction.channel
        .awaitMessageComponent({ filter: filter2, time: 60000 })
        .catch((err) => {
          dön = 1;
          return interaction.editReply({
            components: [],
            content: "1 dakika dolduğu için oyun isteği iptal edildi.",
            embeds: [],
          });
        });
      if (int.customId == "no") {
        return interaction.editReply({
          components: [],
          content: "Oyun isteği reddedildi.",
          embeds: [],
        });
      }
      if (dön == 1) return;
      interaction.channel.send("Oyun isteği kabul edildi. xox başlıyor.");
      this.xox.add(rakip.id);
    } else {
      interaction.reply("Oyun başlatılıyor.").then((x) =>
        setTimeout(() => {
          interaction.deleteReply();
        }, 1000)
      );
    }
    this.xox.add(interaction.user.id);
    let imageit = (x) => {
      let i = 0;
      let text = "";
      Object.values(x).forEach((y) => {
        text +=
          y == "x"
            ? ":regional_indicator_x:"
            : y == "o"
            ? ":regional_indicator_o:"
            : y;
        i++;
        if (!String(i / 3).includes(".")) text += "\n";
      });
      return text;
    };
    let sybtn = (x) => {
      let btn = new Discord.ButtonBuilder().setStyle("Secondary");
      if (xox[x] !== "x" && xox[x] !== "o") btn.setLabel(x);
      if (xox[x] == "x") {
        btn.setEmoji("❌");
      }
      if (xox[x] == "o") {
        btn.setEmoji("🇴");
      }
      if (xox[x] == zero[x]) btn.setCustomId(x);
      if (xox[x] !== zero[x]) btn.setCustomId(String(eval(Number(x) + 100)));
      return btn;
    };
    let sy123 = new Discord.ActionRowBuilder()
      .addComponents(sybtn("1"))
      .addComponents(sybtn("2"))
      .addComponents(sybtn("3"));
    let sy456 = new Discord.ActionRowBuilder()
      .addComponents(sybtn("4"))
      .addComponents(sybtn("5"))
      .addComponents(sybtn("6"));
    let sy789 = new Discord.ActionRowBuilder()
      .addComponents(sybtn("7"))
      .addComponents(sybtn("8"))
      .addComponents(sybtn("9"));
    let btns = [sy123, sy456, sy789];
    let z = rakip ? rakip.id : "Yapayzeka";
    let z2 = z == "Yapayzeka" ? "Yapayzeka" : `<@${z}>`;
    let sıra = [interaction.user.id, z][Math.floor(Math.random() * 2)];
    let mesag = sıra == interaction.user.id ? `<@${sıra}>` : z2;
    let msg = await interaction.channel.send({
      embeds: [
        Embed(
          "GameBot XOX",
          `Sıra ${mesag} kullanıcısında.\n` + imageit(xox),
          "info"
        ),
      ],
      components: btns,
    });
    while (!end) {
      if (rakip) {
        const filter = (i) =>
          !isNaN(i.customId) && Number(i.customId) < 10 && i.user.id === sıra;
        let turn = await interaction.channel
          .awaitMessageComponent({ filter: filter, time: 60000 })
          .catch((err) => {
            return;
          });
        if (!turn) {
          const choices = Object.values(xox).filter(
            (x) => x !== "x" && x !== "o"
          );
          turn = choices[Math.floor(Math.random() * choices.length)];
          await interaction.channel.send(
            `Üzgünüm ama, süre doldu! Ratgele yer seçildi. yer: ` + turn
          );
        }
        if (turn && turn.customId) turn.deferUpdate().catch((err) => {});
        if (turn) turn = turn.customId;
        xox[turn] = sıra == interaction.user.id ? "x" : "o";
      } else if (sıra == interaction.user.id) {
        const filter = (i) =>
          !isNaN(i.customId) && Number(i.customId) < 10 && i.user.id === sıra;
        let turn = await interaction.channel
          .awaitMessageComponent({ filter: filter, time: 60000 })
          .catch((err) => {
            return;
          });
        if (!turn) {
          const choices = Object.values(xox).filter(
            (x) => x !== "x" && x !== "o"
          );
          turn = choices[Math.floor(Math.random() * choices.length)];
          await interaction.channel.send(
            `Üzgünüm ama, süre doldu! Ratgele yer seçildi. yer: ` + turn
          );
        }
        if (turn && turn.customId) turn.deferUpdate().catch((err) => {});
        if (turn) turn = turn.customId;
        xox[turn] = sıra == interaction.user.id ? "x" : "o";
      } else {
  let psb = [];
        for (let i = 1; i < 10; i++) {
          if (xox[String(i)] !== "x" && xox[String(i)] !== "o") {
            psb.push(String(i));
          }
        }
        let ne = next(psb);
        let typo = sıra == interaction.user.id ? "x" : "o";
        xox[ne] = typo;
}
      sy123 = new Discord.ActionRowBuilder()
        .addComponents(sybtn("1"))
        .addComponents(sybtn("2"))
        .addComponents(sybtn("3"));
      sy456 = new Discord.ActionRowBuilder()
        .addComponents(sybtn("4"))
        .addComponents(sybtn("5"))
        .addComponents(sybtn("6"));
      sy789 = new Discord.ActionRowBuilder()
        .addComponents(sybtn("7"))
        .addComponents(sybtn("8"))
        .addComponents(sybtn("9"));
      btns = [sy123, sy456, sy789];
      let sıra2 = rakip ? rakip.id : "Yapayzeka";
      let sıra3 = sıra2 == "Yapayzeka" ? "Yapayzeka" : `<@${sıra2}>`;
      sıra = sıra == interaction.user.id ? sıra2 : interaction.user.id;
      let mesagey =
        sıra == interaction.user.id ? `<@${interaction.user.id}>` : sıra3;
      await msg.edit({
        embeds: [
          Embed(
            "GameBot XOX",
            `Sıra ${mesagey} kullanıcısında.\n` + imageit(xox),
            "info"
          ),
        ],
        components: btns,
      });
      if (!Object.values(xox).find((x) => x !== "o" && x !== "x")) {
        end = "Berabere";
      }
      if (win(xox)) {
        end = win(xox);
      }
    }
    if (end == "Berabere") {
      msg.edit({
        embeds: [
          Embed(
            "GameBot XOX",
            `Oyun Bitti. Oyun Berabere olarak sonuçlandı.\n${imageit(xox)}`,
            "info"
          ),
        ],
      //  components: [],
      });
      if (rakip) this.xox.delete(rakip.id);
      this.xox.delete(interaction.user.id);
    } else {
      let kazanan1 = rakip ? `<@${rakip.id}>` : "Yapayzeka";
      let kazanan = end.toLowerCase().includes("x")
        ? "<@" + interaction.user.id + ">"
        : kazanan1;
      msg.edit({
        embeds: [
          Embed(
            "GameBot XOX",
            `Oyun Bitti. ` + kazanan + ` oyunu kazandı.\n${imageit(xox)}`,
            "info"
          ),
        ],
     //   components: [],
      });

      if (rakip) this.xox.delete(rakip.id);
      this.xox.delete(interaction.user.id);
    }
  },
};
