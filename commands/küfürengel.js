const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Koruma",
data: new SlashCommandBuilder()
  .setName("küfür-engel")
  .setDescription("Küfür engeli açıp kapatırsınız.")
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
if(!interaction.member.permissions.has("Administrator")) return err("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.")
if(işlem == "aç"){
if(await db.get("küfürengel_" + interaction.guild.id)) return err("Zaten küfür engel sistemi açık.")
db.set("küfürengel_" + interaction.guild.id, "açık")
interaction.reply({embeds:[Embed("İşlem başarılı.","Küfür engel sistemi başarıyla açıldı.","info")]})
} else if(işlem == "kapat"){
if(!await db.get("küfürengel_" + interaction.guild.id)) return err("Zaten küfür engel sistemi kapalı.")
db.delete("küfürengel_" + interaction.guild.id)
interaction.reply({embeds:[Embed("İşlem başarılı.","Küfür engel sistemi başarıyla kapatıldı.","info")]})
}
}
}