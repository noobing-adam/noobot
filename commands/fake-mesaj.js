const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("fake-mesaj")
  .setDescription("Bir kişiyi bir mesajı atmış gibi gösterirsiniz.")
.addUserOption(option =>
option.setName("kişi")
.setDescription("Mesajı atmış gibi göstereceğiniz kişi.")
.setRequired(true)
)
.addStringOption(option =>
option.setName("yazı")
.setDescription("Sahte mesajda ne yazmasını istediğiniz.")
.setRequired(true)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kişi = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
let yazı = interaction.options.getString("yazı")
if(yazı.includes("@")) return err("Mesajınız herhangi bir etiket içeremez.")
if(yazı.length > 1000) return err("1000 karakterden uzun bir mesaj gönderilemez.")
interaction.channel.createWebhook({name: kişi.nickname ? kişi.nickname : kişi.user.username})
    .then(webhook2 => {
const {  WebhookClient } = require('discord.js');

let webhook = new WebhookClient({ id: webhook2.id, token: webhook2.token });
if(!webhook) return;
webhook.send({
    content: yazı,
    username: kişi.nickname ? kişi.nickname : kişi.user.username,
    avatarURL: kişi.user.avatarURL({dynamic: true}),
}).catch(err2 => {}).then(x => {
interaction.reply({ephemeral: true, content: "İşlem başarılı."}).catch(err2 => {})
})
setTimeout(() => {
webhook2.delete().catch(err2 => {})
}, 1000)
}).catch(err2 => {console.log(err2)});
}
}