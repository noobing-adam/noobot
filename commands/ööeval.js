const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
module.exports = {
category: "owner-özel",
data: new SlashCommandBuilder()
  .setName("eval")
  .setDescription("Ownera özel kod test etme komutudur.")
  .addStringOption(option =>
		option.setName('kod')
			.setDescription('Test etmek istediğiniz kod.')
			.setRequired(true)
      ),
execute: async(interaction, client) => { 
interaction.deferReply().catch(err => {})
let Embed = require("../tools/embed.js")
const sc = require("starcode.js")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")

 if (interaction.user.id !== "829778241396408360") return interaction.editReply("knk bunu sadece sahibim kullanabilir")
try { 
    let codein = interaction.options.getString("kod").split("message.author").join("interaction.user").split("message.user").join("interaction.user").split("message.reply").join("interaction.reply")
    let code = eval(codein)
    if(code !== undefined && code !== null && code.length > 2000) return interaction.reply({embeds: [Embed("Bu kodun sonucu çok büyük çıktı.","Kodun sonucu çok uzun çıktığı için sonuç konsola yazdırıldı.","warn")]})
    if (codein.length < 1) return interaction.reply('Bir kod girmelisin !')
    if (typeof code !== 'string')    
code = require('util').inspect(code, { depth: 0 });
code = code.split(process.env.token).join("Token")
    let embed = new Discord.EmbedBuilder()
    .setColor('#4876ff')
    .addFields([{name: 'Kod', value: `\`\`\`js\n${codein}\n\`\`\``},{name: 'Sonuç', value: `\`\`\`js\n${code}\n\`\`\``}])
    interaction.reply({embeds: [embed]}).catch(err => {
    interaction.editReply({embeds: [embed]}).catch(err => {
interaction.followUp({embeds: [embed]}).catch(err => {
interaction.channel.send({embeds: [embed]})
})
})
})
  } catch(e) {
    let embed2 = new Discord.EmbedBuilder()
    .setColor('#8b4513')
    .addFields([{name: 'Hata', value:" ``\`js\n"+e+"\n\`\`\`"}])
    interaction.reply({embeds: [embed2]}).catch(err => {
    interaction.editReply({embeds: [embed2]}).catch(err => {
interaction.followUp({embeds: [embed2]}).catch(err => {
interaction.channel.send({embeds: [embed2]})
})
})
})

  }

}
}