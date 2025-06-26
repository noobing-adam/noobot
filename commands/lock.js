const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("lock")
  .setDescription("Kanalı yazı yazmaya kapatırsınız.")
,execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("ManageRoles")) return err("Bu komutu kullanabilmen için benim `Rolleri Yönet` yetkisine sahip olmam gerek.")
if(!interaction.member.permissions.has("ManageRoles")) return err("Bu komutu kullanabilmek için `Rolleri Yönet` yetkisine sahip olmalısınız.")
interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
SendMessages: false
})
interaction.reply({embeds: [Embed("İşlem başarılı.","@everyone rolünün kanala yazı yazma yetkisi kesildi.","info")]})
}
}