const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const rastgele = require("rastgele-modul")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("random-atasözü")
  .setDescription("Random bir atasözü verir.")
,execute: async(interaction, client) => {
rastgele.atasözü().then(atasözü => {
let embed = Embed("Random atasözü oluşturuldu.","Atasözü: **" + atasözü + "**","info")
interaction.reply({embeds: [embed]}) 
})
}
}