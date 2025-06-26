const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("kuş-dili")
  .setDescription("Bir yazıyı kuş diline çevirirsiniz.")
.addStringOption(option =>
option.setName("yazı")
.setDescription("Kuş diline çevirmek istediğiniz yazı.")
.setRequired(true)
)
,execute: async(interaction, client) => { 
String.prototype.replaceAll = function (find, replace) {
var str = this;
let news = str.split(find).join(replace)
return news
};

let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let yazı = interaction.options.getString("yazı")
let sonuç = yazı.replaceAll('a', 'aga').replaceAll('e', 'ege').replaceAll('ı', 'ıgı').replaceAll('i', 'igi').replaceAll('u', 'ugu').replaceAll('ü', 'ügü').replaceAll('o', 'ogo').replaceAll('ö', 'ögö').replaceAll('A', 'Aga').replaceAll('E', 'Ege').replaceAll('I', 'Igı').replaceAll('İ', 'İgi').replaceAll('U', 'Ugu').replaceAll('Ü', 'Ügü').replaceAll('O', 'Ogo').replaceAll('Ö', 'Ögö');
if(yazı == sonuç) return err("Girdiğin yazı kuş diline çevrilemedi.")
interaction.reply({embeds: [Embed("Girdiğin yazı başarıyla kuş diline çevrildi.","**Girdiğin Yazı:** \n" + yazı,"info").addFields([{name: "Çevrilmiş Hali:", value: sonuç}])]})
}
}
