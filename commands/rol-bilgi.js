const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const moment = require("moment")
require("moment-duration-format")
const sc = require("starcode.js")
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("rol-bilgi")
  .setDescription("Girdiğiniz rol hakkında bilgi verir.")
.addRoleOption(option =>
		option
			.setName('rol')
			.setDescription('Bilgilerine bakmak istediğiniz rol.')
      .setRequired(true)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let rol = interaction.options.getRole("rol")
let embed = Embed("Rolün bilgileri çekildi.", "**Adı:**\n" + rol.name, "info")
embed.addFields([{name: "Oluşturma tarihi:", value: sc.date(rol.createdTimestamp,"tr-TR")},
{name: "Role sahip kişi sayısı:", value: rol.members.size.toString()},
{name: "Rolün konumu:", value: (interaction.guild.roles.cache.size - rol.position) + ". sıra"}])
interaction.reply({embeds: [embed]})
}
}