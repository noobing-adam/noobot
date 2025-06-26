const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Bir kişiyi kicklersiniz.")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Kickleyeceğiniz kişi.')
			.setRequired(true)
      )
  .addStringOption(option => 
    option.setName("sebep")
      .setDescription("Kickleme sebebiniz.")
)
,execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("KickMembers")) return err("Bu komutu kullanabilmen için benim `Üyeleri At` yetkisine sahip olmam gerek.")
let kişi = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
if(!interaction.member.permissions.has("KickMembers")) return err("Bu komutu kullanabilmek için `Üyeleri At` yetkisine sahip olmalısınız.")
let sebep = interaction.options.getString("sebep") ? interaction.options.getString("sebep") : "Sebep belirtilmedi"
let x = "`"
if(kişi.user.id == client.user.id) return err("Beni bana kickletemezsin.")
if(kişi.user.id == interaction.user.id) return err("Kendini kickleyemezsin.")
interaction.guild.fetchOwner().then(owner => {
if(kişi.user.id == owner.id) return err("Sunucu kurucusunu kickleyemezsin.")
if(interaction.user.id !== owner.id && interaction.member.roles.highest.position <= kişi.roles.highest.position) return err("Kicklemeye çalıştığın kişinin rolü senden yüksek veya sana eşit.")
if(!kişi.kickable) return err("Kicklemeye çalıştığın kişinin rolü benden yüksek veya bana eşit.")
interaction.reply({embeds:[Embed("İşlem başarılı.",`${kişi.user.toString()} kişisi ${x}${sebep}${x} sebebiyle başarıyla kicklendi.`, "info")]})
kişi.kick({reason: interaction.user.tag + " tarafından kicklendi. Sebep: " + sebep}).catch(err => {interaction.followUp({ephemeral: true, content: "Hmm sanırım bir sorun çıktı kickleyemedim."})})
})}
}