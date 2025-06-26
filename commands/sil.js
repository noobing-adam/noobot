const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("sil")
  .setDescription("Kanaldan belli sayıda mesaj silersiniz.")
  .addIntegerOption(option => 
    option.setName("mesaj-sayısı")
      .setDescription("Kaç mesaj sileceğiniz.")
      .setRequired(true)
      .setMaxValue(400)
      .setMinValue(1)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("ManageMessages")) return err("Bu komutu kullanabilmen için benim `Mesajları Yönet` yetkisine sahip olmam gerek.")
if(!interaction.member.permissions.has("ManageMessages")) return err("Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısınız.")
let num = interaction.options.getInteger("mesaj-sayısı")
interaction.deferReply().catch(err => {})
let deleted = 0
for(let i = 0; i < Math.floor(num/100); i++){
setTimeout(() => {
interaction.channel.bulkDelete(100, true).then(del => {deleted += del.size}).catch(err => {})
}, i * 500)
}
interaction.channel.bulkDelete(num - (Math.floor(num/100)*100), true).then(del => {deleted += del.size}).catch(err => {})
setTimeout(() => {
interaction.channel.send(interaction.user.toString() + " tarafından kanaldan toplam " + deleted + " mesaj silindi.").catch(err => {}).then(x => setTimeout(() => {x.delete().catch(err => {})}, 5000))
}, (4000 * (Math.floor(num/100)) + 1000)) 
}
}