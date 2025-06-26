const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("keko-ölçer")
  .setDescription("Kekoluk yüzdenize bakarsınız.")
.addUserOption(option =>
option.setName("kişi")
.setDescription("Kekoluk yüzdesine bakmak istediğiniz kişi.")
)
,execute: async(interaction, client) => { 
let luckCalc = () => {
if((Math.random() * 101) >= 75){
return String(Math.floor(eval((Math.random() * 26) + 75)) + "% ||Instada kelebekli story'de paylaşıyorsundur sen||")
} else if((Math.random() * 76) >= 50){
return String(Math.floor(eval((Math.random() * 26) + 50)) + "% ||Cepte kelebek hazırdır kesin||")
} else if((Math.random() * 51) >= 25){
return String(Math.floor(eval((Math.random() * 1) + 25)) + "% ||Olmaya çalışmışsın da olamamışsın gibi||")
} else if((Math.random() * 26) >= 10){
return String(Math.floor(eval((Math.random() * 10) + 10)) + "% ||Daha taşşak kılın yok kekoluk testi yapıyorsun||")
} else {
return String("0% Ne kekosu olm meyve suyusun sen")
}
}
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
if(kişi == interaction.user){
interaction.reply({embeds: [Embed(client.user.username + " Keko Ölçer","**Kekoluk yüzden:**\n**%" + luckCalc() + "**","info")]})
} else {
interaction.reply({embeds: [Embed(client.user.username + " Keko Ölçer","**" + kişi.toString() + " kişisinin kekoluk yüzdesi:**\n**" + luckCalc() + "**","info")]})
}
}
}