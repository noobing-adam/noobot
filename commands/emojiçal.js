const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
const parseEmoji = require("../tools/parseEmoji.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
    .setName("emojiçal")
    .setDescription("Bir emojiyi kopyalarsınız.")
    .addStringOption(option => option.setName("emojiler").setDescription("kopyalanacak emojiler.").setRequired(true)),
execute(interaction, client) {

let emoj = parseEmoji(interaction.options.getString("emojiler"))
let cont = interaction.options.getString("emojiler").split(" ").join("")
if(!interaction.member.permissions.has("ManageEmojisAndStickers")) return interaction.reply({embeds: [Embed("Yetersiz yetki","Bu komutu kullanabilmek için `emojileri ve stickerları yönet` iznine sahip olmalısın","error")],ephemeral: true})
if(!emoj.id) return interaction.reply({embeds: [Embed("Girdiğin şey bir emoji değil","lütfen bir emoji girdiğine emin ol","warn")], ephemeral: true})
let array = []
for(let i = 0; cont && cont !== "" && parseEmoji(cont).id; i++){
let emoji = parseEmoji(cont)
if(!emoji.animated){
if(array.includes("<:" + emoji.name + ":" + emoji.id + ">"))return
array.push("<:" + emoji.name + ":" + emoji.id + ">")
cont = cont.split("<:" + emoji.name + ":" + emoji.id + ">").join("")
} else {
if(array.includes("<a:" + emoji.name + ":" + emoji.id + ">"))return
array.push("<a:" + emoji.name + ":" + emoji.id + ">")
cont = cont.split("<a:" + emoji.name + ":" + emoji.id + ">").join("")
}
}
let array2 = []
setTimeout(() => {
array.forEach(emoji => {
emoji = parseEmoji(emoji)
interaction.guild.emojis.create({attachment: emoji.url, name: emoji.name}).then(emocay => {
if(!array2.some(x => x == emocay)) array2.push(emocay)
}).catch(err => {})
})
interaction.deferReply()
setTimeout(() => {
interaction.editReply({ embeds: [Embed(`${client.emoji("tik")} | Başarılı!`, `Girdiğin emojiler başarıyla oluşturuldu ${array2}(fazla emoji girdiysen bot oluşturmuş olsa bile gösteremiyebilir.)`)]}).catch(err => {})
}, 5000)
}, 50)
} 
}  