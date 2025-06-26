const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const axios = require("axios").default
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("bitcoin-bilgi")
  .setDescription("Bitcoinin tl bazından değerini gösterir.")
,execute: async(interaction, client) => { 
function bin(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
interaction.deferReply()
axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&ids=bitcoin", {headers: {"Accept-Encoding": "*"}}).then(dat => {
let data = dat.data[0]
let price = bin(data.current_price)
let embed = Embed("NOOBOT Bitcoin Bilgi", "Bitcoin'in tl cinsinden değeri şuanda: **" + price + "TL**", "info")
let h24h = data.price_change_24h.toString().includes("-") ? "**" + bin(data.price_change_24h.toFixed(0)).toString().replace("-","") + "TL** düştü." : "**" + bin(data.price_change_24h.toFixed(0)) + "TL** arttı."
embed.addFields({name: "Son 24 saatteki değişim:", value: h24h})
embed.setThumbnail("https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579")
interaction.editReply({embeds: [embed]}).catch(err => {
setTimeout(() => {
interaction.editReply({embeds: [embed]}).catch(err => {})
}, 1000)
})
})
}
}