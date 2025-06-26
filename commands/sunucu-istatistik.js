const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const moment = require("moment") 
require("moment-duration-format")
const sc = require("starcode.js")
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("sunucu-istatistik")
  .setDescription("Sunucunun istatistiklerini gösterir.")
,execute: async(interaction, client) => { 
interaction.guild.fetchOwner().then(owner => {
const embed = new Discord.EmbedBuilder() 
.setTitle("Sunucu İstatistikleri")
.setColor("#FF0000") 
.addFields([{name: "Oluşturulma Tarihi:", value: `${sc.date(interaction.guild.createdAt, "tr-TR")}`},
{name: "Kurucu:", value: `${owner.toString()}`},
{name: "👤 Üye:", value: `${interaction.guild.memberCount}`},
{name: "Kanal:", value: `${interaction.guild.channels.cache.size}`},
{name: "Rol:", value: `${interaction.guild.roles.cache.size}`}])
interaction.reply({ embeds: [embed] })
})
}
}