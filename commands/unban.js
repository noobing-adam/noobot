const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("unban")
  .setDescription("Bir kişinin banını kaldırırsınız.")
  .addStringOption(option =>
		option.setName('kişi')
			.setDescription("Banını kaldıracağınız kişinin id'si.")
			.setRequired(true)
      )
,execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("BanMembers")) return err("Bu komutu kullanabilmen için benim `Üyeleri Yasakla` yetkisine sahip olmam gerek.")
let kişi = interaction.options.getString("kişi")
if(isNaN(Number(kişi))) return err("Lütfen düzgün bir kişi id'si giriniz.")
if(kişi.length !== 18) return err("Lütfen düzgün bir kişi id'si giriniz.")
if(!interaction.member.permissions.has("BanMembers")) return err("Bu komutu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmalısınız.")
if(kişi == client.user.id) return err("Bir şey yapmaya karar vermeden önce onda bir mantık aramak lazım.")
if(kişi == interaction.user.id) return err("Bir şey yapmaya karar vermeden önce onda bir mantık aramak lazım.")
interaction.guild.fetchOwner().then(owner => {
if(interaction.guild.members.cache.get(kişi)) return err("Bir şey yapmaya karar vermeden önce onda bir mantık aramak lazım.")
if(kişi == owner.id) return err("Bir şey yapmaya karar vermeden önce onda bir mantık aramak lazım.")
interaction.reply({embeds:[Embed("İşlem başarılı.",`${kişi} id'li kişinin banı kaldırıldı.`, "info")]})
interaction.guild.bans.remove(kişi).catch(err => {setTimeout(() => {interaction.followUp({ephemeral: true, content: "Hmm sanırım sahte bir id girdin veya girdiğin id'ye sahip kişi banlı değil.."})}, 3000)})
})}
}