const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
const axios = require("axios").default
module.exports = {
category: "Resim",
data: new SlashCommandBuilder()
  .setName("tilki")
  .setDescription("Rastgele bir tilki resmi gösterir.")
,execute: async(interaction, client) => { 
const animals = require('random-animals-api'); 
let res = await animals.fox()
interaction.reply({embeds: [Embed(client.user.username + " Resim Sistemi","Başarıyla bir tilki resmi bulundu. Aşağıda gösteriliyor:","info").setImage(res)]}).catch(err2 => {})
}
}