const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Oyun",
data: new SlashCommandBuilder()
  .setName("click-test")
  .setDescription("Reflekslerinizi test edersiniz.")
,execute: async(interaction, client) => { 
await interaction.reply({embeds: [Embed("Rastgele bir süre sonra bu mesajın altında çıkacak butonlardan doğru olana basmalısın.","Basman gereken butonda `✅` işareti olacak.","info")]})
let y = await interaction.fetchReply()
let btn = (x,y) => new Discord.ButtonBuilder().setStyle("Primary").setEmoji(x).setCustomId(y)
let row = new Discord.ActionRowBuilder()
let others = ["❌","❌","❌","❌","❌"]
others[Math.floor(Math.random() * 5)] = "✅"
let i = 0
others.forEach(ot => {
i++
if(ot !== "✅") row.addComponents(btn(ot,"no" + i))
if(ot == "✅") row.addComponents(btn(ot,"yes"))
})
setTimeout(() => {
interaction.editReply({embeds: [Embed("Bu mesajın altında çıkan butonlardan doğru olana basmalısın.","Hadi hızlı ol.","info")], components: [row]})
let süre = Date.now()
const filter = (i) => i.customId === "yes" && i.user.id === interaction.user.id && i.message.id == y.id;
interaction.channel.awaitMessageComponent({ filter: filter, time: 60000 })
  .then(async int => {
if(!await db.get("personal_" + interaction.user.id)) db.set("personal_" + interaction.user.id, ((Date.now() - süre)/1000).toFixed(3))
if(await db.get("personal_" + interaction.user.id) > ((Date.now() - süre)/1000).toFixed(3)) db.set("personal_" + interaction.user.id, ((Date.now() - süre)/1000).toFixed(3))
let rekor = (await db.get("personal_" + interaction.user.id) > ((Date.now() - süre)/1000).toFixed(3)) ? "Butona tam " + ((Date.now() - süre)/1000).toFixed(3) + " saniyede basıp kendi rekorunu kırdın." : "Butona tam " + ((Date.now() - süre)/1000).toFixed(3) + " saniyede bastın."
interaction.editReply({embeds: [Embed("Click-test tamamlandı.",rekor,"info")], components: []})
})
  .catch(err => {interaction.editReply("1 dakikadır tıklamadığın için click-test iptal edildi.")});
}, 5000 + (Math.random() * 2000))
}
}