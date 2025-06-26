const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Botun pingini gösterir.")
,execute: async(interaction, client) => { 
const embed = Embed("✅ NOOBOT Daima Düşük Pinglidir. ✅", "**Pingim:** \n**" + client.ws.ping + "** ms", "info") 
interaction.reply({ embeds: [embed] })
}
}