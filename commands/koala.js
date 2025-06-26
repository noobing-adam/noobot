const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Resim",
data: new SlashCommandBuilder()
  .setName("bukalemun")
  .setDescription("Rastgele bir bukalemun resmi gösterir.")
,execute: async(interaction, client) => { 
const animals = require('random-animals-api'); 
let res = await animals.lizard()
interaction.reply({embeds: [Embed(client.user.username + " Resim Sistemi","Başarıyla bir bukalemun resmi bulundu. Aşağıda gösteriliyor:","info").setImage(res)]}).catch(err2 => {})
}
}