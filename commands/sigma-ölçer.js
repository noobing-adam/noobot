const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("sigma-ölçer")
  .setDescription("Sigmalık yüzdenize bakarsınız.")
.addUserOption(option =>
option.setName("kişi")
.setDescription("Sigmalık yüzdesine bakmak istediğiniz kişi.")
)
,execute: async(interaction, client) => { 
let luckCalc = () => {
if((Math.random() * 101) >= 75){
return String(Math.floor(eval((Math.random() * 26) + 75)) + "%")
} else if((Math.random() * 76) >= 50){
return String(Math.floor(eval((Math.random() * 26) + 50)) + "%")
} else if((Math.random() * 51) >= 25){
return String(Math.floor(eval((Math.random() * 1) + 25)) + "%")
} else if((Math.random() * 26) >= 10){
return String(Math.floor(eval((Math.random() * 10) + 10)) + "%")
} else {
return String("0% Sigma, %100 Gay")
}
}
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
if(kişi == interaction.user){
interaction.reply({embeds: [Embed(client.user.username + " Sigma Ölçer","**Sigmalık yüzden:**\n**%" + luckCalc() + "**","info")]})
} else {
interaction.reply({embeds: [Embed(client.user.username + " Sigma Ölçer","**" + kişi.toString() + " kişisinin sigmalık yüzdesi:**\n**" + luckCalc() + "**","info")]})
}
}
}