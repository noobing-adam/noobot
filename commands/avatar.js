const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Bilgi",
data: new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Profil fotoğrafınızı gösterir.")
.addUserOption(option =>
		option
			.setName('kişi')
			.setDescription('Profil fotoğrafına bakmak istediğiniz kişi.')
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
if(!kişi.displayAvatarURL() && kişi.id == interaction.user.id) return err("Bir profil fotoğrafınız yok.")
if(!kişi.displayAvatarURL() && kişi.id !== interaction.user.id) return err(kişi.toString() + " kişisinin bir fotoğrafı yok.")
let yazı = kişi == interaction.user.id ? "Profil fotoğrafınız çekildi aşağıda gösteriliyor." : kişi.tag + " kişisinin profil fotoğrafı çekildi aşağıda gösteriliyor."
let embed = Embed(yazı,"","info")
embed.setImage(kişi.displayAvatarURL({dynamic: true}))
interaction.reply({embeds: [embed]})
}
}