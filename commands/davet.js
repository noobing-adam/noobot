const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("davet")
  .setDescription("Botun davet linkini gösterir.")
,execute: async(interaction, client) => { 
let em = Embed(client.user.username + " Davet Linkleri","Aşağıdaki yazılara tıklayarak botu davet edebilirsin.","info")
em.addFields([
{name: "Botun Davet Linki:", value: `[Davet etmek için tıkla](https://discord.com/oauth2/authorize?client_id=990588829255745568&scope=bot%20applications.commands&permissions=8)\n(Botun hakkımdasındaki butonuda kullanabilirsin.)`},
{name: "Destek Sunucusu: ", value: `[Katılmak için tıkla](https://discord.gg/qcWGqhnYbR)`},
{name: "Oy:", value: "[Oy vermek için tıkla](https://top.gg/bot/990588829255745568/vote)"}
])
interaction.reply({embeds: [em]})
}
}