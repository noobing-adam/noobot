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
  .setName("kanal-bilgi")
  .setDescription("Girdiğiniz kanal hakkında bilgi verir.")
.addChannelOption(option =>
		option
			.setName('kanal')
			.setDescription('Bilgilerine bakmak istediğiniz kanal.')
      .setRequired(true)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kanal = interaction.options.getChannel("kanal")
let embed = Embed("Kanalın bilgileri çekildi.", "**Adı:**\n" + kanal.name, "info")
embed.addFields([
{name: "Kanalın kategorisi:", value: kanal.parentId ? client.channels.cache.get(kanal.parentId).name : "Yok"},
{name: "Kanalın türü:", value: kanal.type == 0 ? "Metin Kanalı" : (kanal.type == 4 ? "Kategori" : (kanal.type == 2) ? "Ses Kanalı" : "Alt Başlık")},
{name: "Oluşturma tarihi:", value: sc.date(kanal.createdTimestamp,"tr-TR")},
{name: "Kanalı Görebilen kişi sayısı:", value: kanal.bitrate ? "Ses kanalını görebilen kişi sayısı algılanamaz." : (kanal.type == 11 || kanal.type == 12 ? kanal.memberCount.toString() : kanal.members.size.toString())}])
if(kanal.type !== 11 && kanal.type !== 12) embed.addFields([{name: "Kanalın konumu:", value: eval(kanal.position+1) + ". sıra"}])
if(kanal.type == 11 || kanal.type == 12) embed.addFields([{name: "Arşivlenmişmi:", value: kanal.archived ? "Evet" : "Hayır"}])

interaction.reply({embeds: [embed]})
}
}