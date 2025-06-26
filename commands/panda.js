const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Resim",
data: new SlashCommandBuilder()
  .setName("panda")
  .setDescription("Rastgele bir panda resmi gösterir.")
,execute: async(interaction, client) => { 
const animals = require('random-animals-api'); 
let res = await animals.panda()
interaction.reply({embeds: [Embed(client.user.username + " Resim Sistemi","Başarıyla bir panda resmi bulundu. Aşağıda gösteriliyor:","info").setImage(res)]}).catch(err2 => {})
}
}