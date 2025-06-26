const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Koruma",
data: new SlashCommandBuilder()
  .setName("caps-engel")
  .setDescription("Caps engeli açıp kapatırsınız.")
  .addStringOption(option =>
		option.setName('işlem')
			.setDescription('Yapacağınız işlem.')
			.setRequired(true)
      .addChoices({name:"aç",value:"aç"},{name:"kapat",value:"kapat"})
      )
  .addIntegerOption(option => 
    option.setName("yüzde")
      .setDescription("Mesaj yüzde kaçtan fazla büyük harf içerince algılayacağı.")
)
,execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
    let işlem = interaction.options.getString("işlem")
if(!interaction.member.permissions.has("Administrator")) return err("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.")
if(işlem == "aç"){
if(await db.get("capsengel_" + interaction.guild.id)) return err("Zaten caps engel sistemi açık.")
let yüzde = interaction.options.getInteger("yüzde") ? interaction.options.getInteger("yüzde") : 70
if(yüzde > 99) return err("%99'dan yüksek bir değer ayarlayamazsınız.") 
if(yüzde < 1) return err("%1'den düşük bir değer ayarlayamazsınız.") 
db.set("capsengel_" + interaction.guild.id, yüzde)
interaction.reply({embeds:[Embed("İşlem başarılı.",`Caps engel sistemi başarıyla açıldı. Artık bir mesaj %${yüzde}'dan daha fazla büyük harf içerirse mesaj silinecek.`, "info")]})
} else if(işlem == "kapat"){
if(!await db.get("capsengel_" + interaction.guild.id)) return err("Zaten caps engel sistemi kapalı.")
db.delete("capsengel_" + interaction.guild.id)
interaction.reply({embeds:[Embed("İşlem başarılı.","Caps engel sistemi başarıyla kapatıldı.","info")]})
}
}
}