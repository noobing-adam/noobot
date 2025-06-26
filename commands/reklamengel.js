const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Koruma",
data: new SlashCommandBuilder()
  .setName("reklam-engel")
  .setDescription("Reklam engeli açıp kapatırsınız.")
  .addStringOption(option =>
		option.setName('işlem')
			.setDescription('Yapacağınız işlem.')
			.setRequired(true)
      .addChoices({name:"aç",value:"aç"},{name:"kapat",value:"kapat"})
      ),
execute: async(interaction, client) => { 
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
    let işlem = interaction.options.getString("işlem")
if(!interaction.member.permissions.has("ADMINISTRATOR")) return err("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.")
if(işlem == "aç"){
if(await db.get("reklamengel_" + interaction.guild.id)) return err("Zaten reklam engel sistemi açık.")
db.set("reklamengel_" + interaction.guild.id, "açık")
interaction.reply({embeds:[Embed("İşlem başarılı.","Reklam engel sistemi başarıyla açıldı.","info")]})
} else if(işlem == "kapat"){
if(!await db.get("reklamengel_" + interaction.guild.id)) return err("Zaten reklam engel sistemi kapalı.")
db.delete("reklamengel_" + interaction.guild.id)
interaction.reply({embeds:[Embed("İşlem başarılı.","Reklam engel sistemi başarıyla kapatıldı.","info")]})
}
}
}