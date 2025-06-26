const { SlashCommandBuilder } = require("@discordjs/builders");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const axios = require('axios').default
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
  data: new SlashCommandBuilder()
    .setName("tdk")
    .setDescription("Sözlükte kelime aratırsınız.")
.addStringOption(option => 
option.setName("kelime")
.setDescription("Sözlükte aratacağınız kelime.")
.setRequired(true)
)
,  async execute(interaction, client) {
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kelime = interaction.options.getString("kelime")
axios.get(`https://sozluk.gov.tr/gts?ara=${encodeURI(kelime)}`).then(api => {
api = api.data
if(api.error) return err(api.error + ".")
let yazar = api[0].anlamlarListe.values().next().value.orneklerListe ? api[0].anlamlarListe.values().next().value.orneklerListe.values().next().value.yazar.values().next().value.tam_adi : 'yazar yok';
let örnek = api[0].anlamlarListe.values().next().value.orneklerListe ? api[0].anlamlarListe.values().next().value.orneklerListe.values().next().value.ornek : 'Örnek yok'
let lisan = api[0].lisan ? api[0].lisan : 'lisan yok'
let anlam = api[0].anlamlarListe.values().next().value ? api[0].anlamlarListe.values().next().value.anlam : 'Anlamı yok'
let atasözü = api[0].atasozu ? api[0].atasozu.values().next().value.madde : 'Atasözü yok'
const embed = new Discord.EmbedBuilder()
.setColor('#ff0000')
.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/5/51/Türk_Dil_Kurumu_logo.png')
.setTimestamp()
.addFields([
{name: 'Anlam:', value: anlam},
{name: 'Lisan:', value: lisan},
{name: 'Örnek:', value: `${örnek} -**${yazar}**`},
{name: 'Atasözü:', value: atasözü}])
interaction.reply({embeds: [embed]})
})
}
};
