const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Bir kişiyi banlarsınız.")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Banlayacağınız kişi.')
			.setRequired(true)
      )
  .addStringOption(option => 
    option.setName("sebep")
      .setDescription("Banlama sebebiniz.")
)
,execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("BanMembers")) return err("Bu komutu kullanabilmen için benim `Üyeleri Yasakla` yetkisine sahip olmam gerek.")
let kişi = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
if(!interaction.member.permissions.has("BanMembers")) return err("Bu komutu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmalısınız.")
let sebep = interaction.options.getString("sebep") ? interaction.options.getString("sebep") : "Sebep belirtilmedi"
let x = "`"
if(kişi.user.id == client.user.id) return err("Beni bana banlatamazsın.")
if(kişi.user.id == interaction.user.id) return err("Kendini banlayamazsın.")
interaction.guild.fetchOwner().then(owner => {
if(kişi.user.id == owner.id) return err("Sunucu kurucusunu banlayamazsın.")
if(interaction.user.id !== owner.id && interaction.member.roles.highest.position <= kişi.roles.highest.position) return err("Banlamaya çalıştığın kişinin rolü senden yüksek veya sana eşit.")
if(!kişi.bannable) return err("Banlamaya çalıştığın kişinin rolü benden yüksek veya bana eşit.")
interaction.reply({embeds:[Embed("İşlem başarılı.",`${kişi.user.toString()} kişisi ${x}${sebep}${x} sebebiyle başarıyla banlandı.`, "info")]})
kişi.ban({reason: interaction.user.tag + " tarafından banlandı. Sebep: " + sebep}).catch(err => {interaction.followUp({ephemeral: true, content: "Hmm sanırım bir sorun çıktı banlayamadım."})})
})}
}