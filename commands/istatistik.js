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
  .setName("istatistik")
  .setDescription("Botun istatistiklerini gösterir.")
,execute: async(interaction, client) => { 
const embed = new Discord.EmbedBuilder() 
.setTitle(client.user.username + " İstatistikleri")
.setColor("#FF0000") 
.addFields([
{name: "Oluşturulma Tarihi:", value: `${sc.date(client.user.createdAt, "tr-TR")}`},
{name: "Toplam Komut Sayısı:", value: `${client.commands.size}`},
{name: "Ram Kullanma Oranı:", value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** MB`},
{name: "Bot Yapımcısı:", value: `<@829778241396408360>`},
{name: "Sunucu:", value: `${client.guilds.cache.size}`},
{name: "👤 Kullanıcı:", value: `${client.guilds.cache.reduce((a,b)=> a + b.memberCount, 0)}`},
{name: "🚀 Ping", value: `${client.ws.ping}ms`},
{name: "🕐 Aktiflik", value: `**${moment.duration(client.uptime).format("h [saat], m [dakika], s [saniye]")}**`}
  ])
interaction.reply({ embeds: [embed] })
}
}