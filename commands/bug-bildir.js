const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("bug-bildir")
  .setDescription("Bug bildirirsiniz.")
.addStringOption(option =>
		option
			.setName('bug')
			.setDescription('Bildirmek istediğin bug.')
      .setRequired(true)
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let timeout = await db.get("timeout_" + interaction.user.id)
if(timeout && timeout.time > Date.now()) return err("Bug bildirmek için "  + moment.duration(timeout.time - Date.now()).format("m [dakika], s [saniye daha beklemelisin.]"))
let bug = interaction.options.getString("bug")
await db.set("timeout_" + interaction.user.id, {time: (Date.now() + (15 * 60 * 1000)), bug: bug})
client.channels.cache.get("998931688589635695").send({embeds: [Embed("Yeni bir bug bildirildi.","Bilgiler aşağıda verildi.","info").addFields([{name: "Bildirdiği bug:", value: bug},{name: "Bildiren:", value: `${interaction.user.toString()} (${interaction.user.tag} , ${interaction.user.id})`}])]})
interaction.reply({embeds: [Embed("Bug başarıyla bildirildi.","Bildirdiğin bug bot ownerı tarafından gözden geçirilecek. Bildirdiğin için teşekkürler.","info")]})
}
}