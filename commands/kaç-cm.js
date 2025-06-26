const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("kaç-cm")
  .setDescription("Malafatınızın uzunluğunu gösterir.")
  .addUserOption(option =>
option.setName("kişi")
.setDescription("Malafatının uzunluğuna bakmak istediğiniz kişi.")
)
,execute: async(interaction, client) => { 
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
let mesajlar = [
"rand",
"1 cm ||Olmasa daha iyi||",
"5 cm ||Fazla kısa sanki||",
"7 cm ||Kısa ama idare eder||",
"10 cm ||Ortalama sayılır||",
"rand",
"15 cm ||Ortalamanın üstünde bu bir başarı||",
"21 cm ||Senle olmayı çok kişi ister||",
"23 cm ||İyi iyi||",
"rand",
"25 cm ||Arkadan girip önden çıkar||",
"29 cm ||Oha knk naptın||",
"31 cm ||Tam uygun bir sayı||",
"rand",
"36 cm ||Tek bir sorum var pantolonuna sığıyormu||",
"40 cm ||Seçilmiş kişi||",
"rand",
"43 cm ||Geleceğin Jhonny Sins'i||",
"47 cm ||Şaka yaptım 17||",
"rand",
"51 cm ||İmkansıza yakın||",
"55 cm ||Guiness'e girersin. (İki anlamdada)||"
]
let mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)]
if(mesaj == "rand") mesaj = Math.floor(Math.random() * 40) + " cm ||Dicek şey bulamadım||"
if(kişi == interaction.user){
let embed = Embed("Malafatının uzunluğu ölçüldü.","Senin malafatın " + mesaj,"info")
interaction.reply({embeds: [embed]})
} else {
let embed = Embed("Kişinin malafatının uzunluğu ölçüldü.",kişi.toString() + " kişisinin malafatı " + mesaj,"info")
interaction.reply({embeds: [embed]})
}
}
}