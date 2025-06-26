const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const doviz = require('tcmb-doviz');
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("döviz-bilgi")
  .setDescription("Döviz kurlarına bakarsınız.")
.addStringOption(option =>
		option
			.setName('kur')
			.setDescription('Hakkında bilgi almak istediğiniz kur.')
.addChoices({name: "Abd Doları", value: "USD"})
.addChoices({name: "Avusturayla Doları", value: "AUD"})
.addChoices({name: "Danimarka Kronu", value: "DKK"})
.addChoices({name: "Euro", value: "EUR"})
.addChoices({name: "İngiliz Sterlimi", value: "GBP"})
.addChoices({name: "İsviçre Frangı", value: "CHF"})
.addChoices({name: "İsveç Kronu", value: "SEK"})
.addChoices({name: "Kanada Doları", value: "CAD"})
.addChoices({name: "Kuveyt Dinarı", value: "KWD"})
.addChoices({name: "Norveç Kronu", value: "NOK"})
.addChoices({name: "Suudi Arabistan Riyali", value: "SAR"})
.addChoices({name: "Japon Yeni", value: "JPY"})
.addChoices({name: "Bulgar Levası", value: "BGN"})
.addChoices({name: "Rumen Leyi", value: "RON"})
.addChoices({name: "Rus Rublesi", value: "ROB"})
.addChoices({name: "İran Riyali", value: "IRR"})
.addChoices({name: "Çin Yuanı", value: "CNY"})
.addChoices({name: "Pakistan Rupisi", value: "PKR"})
.addChoices({name: "Katar Riyali", value: "KAR"})
.addChoices({name: "Güney Kore Wonu", value: "KRW"})
.addChoices({name: "Azerbaycan Yeni Manatı", value: "AZN"})
.addChoices({name: "Birleşik Arap Emirlikleri Dirhemi", value: "AED"})
)
,execute: async(interaction, client) => { 
const { createPages } = await require("../tools/epages.js")(client)
if(!interaction.options.getString("kur")){
let embeds = []
 
let data = await doviz.getData()
let i = 0
let sayf = 1
let embed = Embed("TRY Birimiyle Kur bilgileri","Kur bilgileri aşağıda gösteriliyor. Sayfa: " + sayf,"info").setFooter({text: "Son Güncelleme:" + data.date.split(" (GMT+3)", "")})
data.exchanges.forEach(kur => {
if(i >= 5){
sayf ++
i = 0
embeds.push(embed)
embed = Embed("NOOBOT Yardım Menüsü","Kur bilgileri aşağıda gösteriliyor. Sayfa: " + sayf,"info").setFooter({text: "Son Güncelleme: " + data.date.split(" (GMT+3)").join("")})
}
embed.addFields([{name: kur.name, value: `Alış: ` + kur.buying + "\nSatış: " + kur.selling}])
i++
})
embeds.push(embed)
interaction.reply("Kur bilgileri çekildi.").then(() => {
interaction.fetchReply().then(msg => {
createPages(interaction, embeds, "➡️", "⬅️", "❌", msg)
})})
} else {
let embed = Embed("NOOBOT Yardım Menüsü",interaction.options.getString("kur").split("_").join(" ") + " kurunun bilgileri aşağıda gösterildi.","info")
let data2 = await doviz.getData()
let data = data2.exchanges.find(x => x.code == interaction.options.getString("kur"))
embed.addFields([
{name: "Kısaltma:", value: data.code},
{name: "Alış:", value: data.buying.toString()},
{name: "Satış:", value: data.selling.toString()}
])
embed.setFooter({text: "Son Güncelleme: " + data2.date.split(" (GMT+3)").join("")})
interaction.reply({embeds: [embed]})
}
}
}