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
  .setName("user-info")
  .setDescription("Girdiğiniz kişi hakkında bilgi verir.")
.addUserOption(option =>
		option
			.setName('kişi')
			.setDescription('Bilgilerine bakmak istediğiniz kişi.')
)
,execute: async(interaction, client) => { 
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let kişi = interaction.options.getUser("kişi") ? interaction.options.getUser("kişi") : interaction.user
let üye = interaction.guild.members.cache.get(kişi.id)
let embed = Embed("Kişinin bilgileri çekildi.", "**Kullanıcı adı:**\n" + kişi.tag, "info")
embed.setThumbnail(kişi.displayAvatarURL({dynamic: true}))
.addFields([{name: "Botmu:", value: kişi.bot ? "Evet" : "Hayır"}])
let rozet = interaction.user.flags.toArray().join("\n") ? interaction.user.flags.toArray().join("\n").replace("HypeSquadOnlineHouse1", "Bravery").replace("HypeSquadOnlineHouse2", "Brilliance").replace("HypeSquadOnlineHouse3", "Balance").replace("VERIFIED_DEVELOPER", "Onaylı Developer").replace("STAFF", "Discord Çalışanı").replace("PARTNER", "Discord Partneri").replace("HYPESQUAD_EVENTS", "Events Rozeti").replace("BUGHUNTER_LEVEL_1", "Bug Avcısı LvL 1").replace("EARLY_SUPPORTER", "Erken Dönem Destekcisi").replace("TEAM_USER", "Takım Üyesi").replace("SYSTEM", "Sistem").replace("BUGHUNTER_LEVEL_2", "Bug Avcısı LvL 2").replace("VERIFIED_BOT", "Onaylı Bot") : `Rozeti  Yok`
embed.addFields([{name: "Oluşturma tarihi:", value: sc.date(kişi.createdTimestamp,"tr-TR")},
{name: "Sunucuya katılma tarihi:",value: sc.date(üye.joinedTimestamp, "tr-TR")},
{name: "Rolleri:", value: (!üye.roles || üye.roles.cache.size < 2) ? "Rolü yok" : üye.roles.cache.filter(x=> x.name !== "@everyone").map(x => x).join(",")},
{name: "Rozetleri:", value: rozet}])

interaction.reply({embeds: [embed]})
}
}