const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("slowmode")
  .setDescription("Kanal yavaşmodunu ayarlarsınız.")
  .addStringOption(option => 
    option.setName("süre")
      .setDescription("Yavaşmodu ne kadar yapmak istediğiniz.")
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("ManageChannels")) return err("Bu komutu kullanabilmen için benim `Kanalları Yönet` yetkisine sahip olmam gerek.")
if(!interaction.member.permissions.has("ManageChannels")) return err("Bu komutu kullanabilmek için `Kanalları Yönet` yetkisine sahip olmalısınız.")
let süre = interaction.options.getString("süre")
if(isNaN(ms(süre))) return err("Lütfen süreyi ingilizce formatında giriniz. Örnekler: 6h/3m/10s")
süre = (ms(süre)/1000)
interaction.channel.setRateLimitPerUser(süre)
interaction.reply({embeds: [Embed("Kanal yavaş modu başarıyla ayarlandı.","Bundan sonra üyeler her " + moment.duration(süre * 1000).format("h [saat], m [dakika], s [saniyede bir mesaj atabilecek.]"),"info")]})
}
}