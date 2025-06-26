const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("yenilikler")
  .setDescription("Bot hakkındaki yenilikleri öğrenirsiniz.")
,execute: async(interaction, client) => { 
let news = [
{short: "Yeni oyun komutları.", long: "/blackjack, /xox oyunları eklendi."},
{short: "Yardım menüsünde düzenleme.", long: "Kategori kısmındaki hata düzeltildi ve kategorizasyon düzeltildi."},
{short:"Yeni Ölçerler.",long: "Sigma ve Keko ölçer eklendi, gay ölçerde minik düzenlemeler yapıldı."},
{short:"Meme komutu düzeldi.",long: "/rastgele-meme komutu düzeltildi, artık çalışıyor."},
{short: "Noobing geri döndü.", long: "Bot uzun süre ardından yeniden güncellendi."}
]
let embed = Embed(client.user.username + " Yenilikleri","**En yeni şey: " + news[0].short + "**\nAçıklama: " + news[0].long + "\n**Diğer yenilikler:**","info")
news.forEach(n => {
if(n == news[0]) return;
embed.addFields([{name: "Yenilik: " + n.short, value: "Açıklama: " + n.long}])
})
interaction.reply({embeds: [embed]})
}
}