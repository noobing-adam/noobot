const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Resim",
data: new SlashCommandBuilder()
  .setName("köpek")
  .setDescription("Rastgele bir köpek resmi gösterir.")
,execute: async(interaction, client) => { 
const animals = require('random-animals-api'); 
let res = await animals.dog()
interaction.reply({embeds: [Embed(client.user.username + " Resim Sistemi","Başarıyla bir köpek resmi bulundu. Aşağıda gösteriliyor:","info").setImage(res)]}).catch(err2 => {})
}
}