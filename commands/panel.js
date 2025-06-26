const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("panel")
  .setDescription("Sunucu panelini açıp kapatırsınız.")
  .addStringOption(option =>
		option.setName('işlem')
			.setDescription('Yapacağınız işlem.')
			.setRequired(true)
      .addChoices({name:"aç",value:"aç"},{name:"kapat",value:"kapat"})
      ),
execute: async(interaction, client) => { 
let dibi = await db.get("panelsws")
let Embed = require("../tools/embed.js")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
    let işlem = interaction.options.getString("işlem")
if(!interaction.guild.members.cache.get(client.user.id).permissions.has("MANAGE_CHANNELS")) return err("Bu komutu kullanabilmen için benim `Kanalları Yönet` yetkisine sahip olmam gerek.")
if(!interaction.member.permissions.has("Administrator")) return err("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısınız.")
if(işlem == "aç"){
if(dibi.some(x => typeof x == "object" && x.id == interaction.guild.id)) return err("Zaten sunucu panel sistemi açık.")
interaction.guild.channels.create({
  name: "Sunucu Panel",
  type: 4,
  position: 1,
  permissionOverwrites: [
     {
       id: interaction.guild.id,
       deny: [Discord.PermissionsBitField.Flags.Connect],
       accept: [Discord.PermissionsBitField.Flags.ViewChannel]
    },
  ],
}).then(chn => {
interaction.guild.channels.create({
  name:"Toplam Üye Sayısı • " + interaction.guild.memberCount,
  type: 2,
  position: 1,
  parent: chn.id,
  lockPermissions: true
}).then(üyechn => {
interaction.guild.channels.create({
  name:"Bot Sayısı • " + interaction.guild.members.cache.filter(x => x.user.bot).size,
  type: 2,
  position: 2,
  parent: chn.id,
  lockPermissions: true
}).then(botchn => {


               
db.push("panelsws", {id: interaction.guild.id, açan: interaction.user, üyechn: üyechn.id, botchn: botchn.id})
interaction.reply({embeds:[Embed("İşlem başarılı.","Sunucu panel sistemi başarıyla açıldı.","info")]})
})
})
})
} else if(işlem == "kapat"){
if(!dibi || !dibi.some(x => typeof x == "object" && x.id == interaction.guild.id)) return err("Zaten sunucu panel sistemi kapalı.")
let kanals = dibi.find(x => typeof x == "object" && x.id == interaction.guild.id)
db.pull("panelsws", (i) => typeof i == "object" && i.id == interaction.guild.id)

client.channels.cache.get(client.channels.cache.get(kanals.üyechn).parentId).delete().catch(err => {})
client.channels.cache.get(kanals.üyechn).delete().catch(err => {})
client.channels.cache.get(kanals.botchn).delete().catch(err => {})
interaction.reply({embeds:[Embed("İşlem başarılı.","Sunucu panel sistemi başarıyla kapatıldı.","info")]})
}
}
}