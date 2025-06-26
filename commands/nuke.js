const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const Embed = require("../tools/embed.js")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("nuke")
  .setDescription("Kanaldaki bütün mesajları silersiniz.")
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("MANAGE_CHANNELS")) return err("Bu komutu kullanabilmen için benim `Kanalları Yönet` yetkisine sahip olmam gerek.")
if(!interaction.member.permissions.has("ManageMessages")) return err("Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine sahip olmalısınız.")
interaction.channel.clone().then(cop => {
if(interaction.channel.parentId) cop.setParent(interaction.channel.parentId, {lockPermissions: false})
cop.setPosition(interaction.channel.position)
interaction.channel.delete()
cop.send({embeds: [Embed("Bu kanal patlatıldı.",interaction.user.toString() + " kişisi bu kanala nuke attı.","warn").setImage("https://c.tenor.com/WJZhnnnFKCUAAAAS/explosion-boom.gif")]})
})
}
}