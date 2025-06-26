const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
category: "Moderasyon",
data: new SlashCommandBuilder()
  .setName("mute")
  .setDescription("Bir kişiyi mutelersiniz.")
  .addUserOption(option =>
		option.setName('kişi')
			.setDescription('Muteleyeceğiniz kişi.')
			.setRequired(true)
      )

  .addStringOption(option => 
    option.setName("süre")
      .setDescription("Muteleyeceğiniz süre.")
			.setRequired(true)
)
  .addStringOption(option => 
    option.setName("sebep")
      .setDescription("Muteleme sebebiniz.")
)
,execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("MuteMembers")) return err("Bu komutu kullanabilmen için benim `Üyelere Zaman Aşımı Uygula` yetkisine sahip olmam gerek.")
let kişi = interaction.guild.members.cache.get(interaction.options.getUser("kişi").id)
let süre = interaction.options.getString("süre")
if(!interaction.member.permissions.has("MuteMembers")) return err("Bu komutu kullanabilmek için `Üyelere Zamana Aşımı Uygula` yetkisine sahip olmalısınız.")
let sebep = interaction.options.getString("sebep") ? interaction.options.getString("sebep") : "Sebep belirtilmedi"
let x = "`"
if(ms(süre) == "NaN") return err("Lütfen süreyi ingilizce formatta giriniz. Örnekler: 1d/2h/14m/10s/1w")
if(kişi.user.id == client.user.id) return err("Beni bana muteletemezsin.")
if(kişi.user.id == interaction.user.id) return err("Kendini muteleyemezsin.")
if(kişi.permissions.has("Administrator")) return err("Kişi `Yönetici` iznine sahip olduğu için mutelenemez.")
if(interaction.member.roles.highest.position <= kişi.roles.highest.position) return err("Mutelemeye çalıştığın kişinin rolü senden yüksek veya sana eşit.")
interaction.reply({embeds:[Embed("İşlem başarılı.",`${kişi.user.toString()} kişisi ${x}${sebep}${x} sebebiyle, ${moment.duration(ms(süre)).format("w [hafta], d [gün], h [saat], m [dakika], s [saniye]")} süresince başarıyla mutelendi.`, "info")]})
kişi.timeout(ms(süre), interaction.user.tag + " tarafından mutelendi. Sebep: " + sebep).catch(err => {interaction.channel.send({ephemeral: true, content: "Hmm sanırım bir sorun çıktı muteleyemedim."})})
}
}