const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Resim",
data: new SlashCommandBuilder()
  .setName("kedi")
  .setDescription("Rastgele bir kedi resmi gösterir.")
,execute: async(interaction, client) => { 
const animals = require('random-animals-api'); 
let res = await animals.cat()
interaction.reply({embeds: [Embed(client.user.username + " Resim Sistemi","Başarıyla bir kedi resmi bulundu. Aşağıda gösteriliyor:","info").setImage(res)]}).catch(err2 => {})
}
}