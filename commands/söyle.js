const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const Embed = require("../tools/embed.js");
const googleTTS = require("google-tts-api");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
} = require("@discordjs/voice");
module.exports = {
  category: "Genel",
  data: new SlashCommandBuilder()
    .setName("söyle")
    .setDescription("Bota istediğiniz cümleyi seslide söyletirsiniz.")
    .addStringOption((option) =>
      option
        .setName("cümle")
        .setDescription("Botun seslide söylemesini istediğiniz cümle.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("dil")
        .setDescription("yazıyı okutacağınız dili seçersiniz.")
        .addChoices({ name: "İngilizce", value: "en" })
        .addChoices({ name: "Fransızca", value: "fr" })
        .addChoices({ name: "İspanyolca", value: "es" })
        .addChoices({ name: "İtalyanca", value: "it" })
    ),
  execute: async (interaction, client) => {
    let err = (e) =>
      interaction
        .reply({
          embeds: [Embed(":x: Bir hata ile karşılaşıldı. :x:", e, "error")],
          ephemeral: true,
        })
        .catch((err) => {});
    let vote = await db.get("vote_" + interaction.user.id);
    if (!vote)
      return err(
        `Ne yazıkki bu komutu kullanmak için oy vermeniz gerekmektedir. [Oy Ver](https://top.gg/bot/990588829255745568/vote)`
      );
    if (vote.time < Date.now())
      return err(
        `Ne yazıkki en son oy verişinizin üzerinden 12 saatten fazla geçmiş bu komutu kullanmak için oy vermeniz gerekiyor. [Oy Ver](https://top.gg/bot/990588829255745568/vote)`
      );
    if (!interaction.member.voice.channel)
      return err(
        "Bu komutu kullanabilmek için önce  bir ses kanalına bağlanmalısınız."
      );
    let dil = interaction.options.getString("dil") || "tr";
    let cümle = interaction.options.getString("cümle");
    if (cümle.length > 200)
      return err(
        "Girdiğin metin çok uzun olduğu için söylenemez. Metin en fazla 200 karakteri içerebilir."
      );

    const link = googleTTS.getAudioUrl(cümle, {
      lang: dil,
      slow: false,
      host: "https://translate.google.com",
    });
    let channel = interaction.member.voice.channel;
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
    let embed = Embed(
      "Girdiğiniz cümle hazırlandı.",
      "Bot ses kanalın girip söylemeye başlıyor.",
      "info"
    );
    interaction.reply({ embeds: [embed] });
    setTimeout(async () => {
      const player = createAudioPlayer();
      const resource = createAudioResource(link);
      await player.play(resource);
      connection.subscribe(player);
      setTimeout(() => {
        try{
        connection.destroy();
        } catch {
          
        }
      }, 62000);
    }, 2000);
  },
};
