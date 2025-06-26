const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Oyun",
data: new SlashCommandBuilder()
  .setName("ilk-yazan-kazanır")
  .setDescription("Klavye hızı yarışı yaparsınız.")
.addUserOption(option =>
option.setName("kişi")
.setDescription("Yarış yapacağınız kişi.")
.setRequired(true)
)
,execute: async(interaction, client) => { 
let x = ["Sevmek","Nefret","Hız","Yarış","Sıkıntı","Eğlenmek","Kodlama","Yarışmacı","Harf","Kelime","Cümle","Kazanmak","Kaybetmek","Şans","Olay"]
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kelime = x[Math.floor(Math.random() * x.length)] 
let rakip = interaction.options.getUser("kişi") 
if(rakip.id == interaction.user.id ||rakip.bot) return err("Rakibiniz kendiniz veya bir bot olamaz.")
let yes = new Discord.ButtonBuilder().setStyle("Success").setLabel("Kabul Et").setCustomId("yes")
let no = new Discord.ButtonBuilder().setStyle("Danger").setLabel("Reddet").setCustomId("no")
let row = new Discord.ActionRowBuilder().addComponents(yes).addComponents(no)
interaction.reply({content: rakip.toString(),embeds: [Embed(rakip.tag + " Sana bir klavye hızı yarışı isteği gönderildi. Butonlara basıp işlem yapabilirsin.","Kabul etmek veya reddetmek için 60 saniyen var.","info")], components: [row], ephemeral: false}).catch(err => {})
const filter = (i) => (i.customId === "yes" || i.customId === "no") && i.user.id === rakip.id
interaction.channel.awaitMessageComponent({ filter: filter, time: 60000 })
.then(int => {
if(int.customId == "yes"){
interaction.editReply({content: interaction.user.toString(), embeds: [Embed("İşlem başarıyla kabul edildi.", "Yarış başlamak üzere kelime seçiliyor. Kelimeyi en hızlı şekilde kanala yazmanız gerek.", "info")], components: []}).catch(err => {})
setTimeout(() => {
interaction.editReply({content: interaction.user.toString() + "&" + rakip.toString() + "\nYarış başladı. Yazmanız gereken kelime: **" + kelime + "**", embeds: []}).catch(err => {})
interaction.channel.awaitMessages({filter: (i) => (i.author.id == rakip.id || i.author.id == interaction.user.id) && i.content.toLocaleLowerCase("tr") == kelime.toLocaleLowerCase("tr"), time: 60000, max: 1, errors: ["time"]}).then(collected => {
let kazanan = collected.first().author.toString()
setTimeout(() => {
interaction.editReply({content: " ", embeds: [Embed("Oyun tamamlandı.","Kelimeyi ilk " + kazanan + " yazıp oyunu kazandı.","info")]}).catch(err => {})
}, 1000)
}).catch(err => {interaction.editReply({embeds: [], content: "İkinizde kelimeyi yazmadığınız için yarış iptal edildi."}).catch(err => {})})
}, 4000)
} else if(int.customId == "no"){
interaction.editReply({content: " ", embeds: [Embed("Ne yazıkki yarış reddedildi.","Sanırım başka birini bulman gerek :(","warn")], components: []}).catch(err => {})
}



}).catch(err => {interaction.editReply({embeds: [], content: "Rakibiniz 1 dakika içinde cevap vermediği için reddetmiş sayıldı."}).catch(err => {})});
}
}