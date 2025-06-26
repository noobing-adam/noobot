const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("icon")
  .setDescription("Sunucunun iconunu gösterir.")
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.icon) return err("Sunucunun bir iconu bulunamadı.")
let embed = Embed("Sunucu iconu bulundu.","aşağıda gösteriliyor.","info")
embed.setImage(interaction.guild.iconURL({dynamic: true}))
interaction.reply({embeds: [embed]})
}
}