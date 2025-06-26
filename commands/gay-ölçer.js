const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("gay-ölçer")
  .setDescription("Gaylik yüzdenize bakarsınız.")
.addUserOption(option =>
option.setName("kişi")
.setDescription("Gaylik yüzdesine bakmak istediğiniz kişi.")
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
return String("0% Gay, %100 Sigma")
}
}
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
if(kişi == interaction.user){
interaction.reply({embeds: [Embed(client.user.username + " Gay Ölçer 🏳️‍🌈","**Gaylik yüzden:**\n**%" + luckCalc() + "**","info").setThumbnail("https://some-random-api.ml/canvas/gay?avatar=" + kişi.displayAvatarURL({format: "png"}))]})
} else {
interaction.reply({embeds: [Embed(client.user.username + " Gay Ölçer 🏳️‍🌈","**" + kişi.toString() + " kişisinin gaylik yüzdesi:**\n**" + luckCalc() + "**","info").setThumbnail("https://some-random-api.ml/canvas/gay?avatar=" + kişi.displayAvatarURL({format: "png"}))]})
}
}
}