const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("v13tov14")
  .setDescription("V13 bir kodu v14'e çevirir.")
.addStringOption(option =>
		option
			.setName('kod')
			.setDescription("V14'e çevirmek istediğiniz v13 kod.")
      .setRequired(true)
)
,execute: async(interaction, client) => { 
String.prototype.perms = function (find) {
var str = this;
let find2 = find.includes("_") ? find.split("_") : [find]
let find3 = ""
find2.forEach(x => {
let newşey= ""
let şey = x.toLowerCase()
şey = şey.split("")
for(let i =0; i < şey.length; i++){
if(i == 0){
newşey = newşey + şey[i].toUpperCase()
} else {
newşey = newşey + şey[i]
}
}
find3 = find3 + newşey
})
return str.split(find).join(find3)
};
let cmd = interaction.options.getString("kod")
let cmd2 = cmd.split("MessageEmbed").join("EmbedBuilder").split(`PRIMARY`).join("Primary").split(`SUCCESS`).join("Success").split(`DANGER`).join("Danger").split(`link`).join("Link").split(".isText()").join(".type == Discord.ChannelType.GuildText").split(".isVoice()").join(".type == Discord.ChannelType.GuildVoice").split(".isDM()").join(".type == Discord.ChannelType.DM").split("Flags()").join("FlagsBitField()").split("Intents").join("IntentsBitField").split("MessageButton").join("ButtonBuilder").split("MessageSelectMenu").join("SelectMenuBuilder").split("MessageActionRow").join("ActionRowBuilder").split("TextInputComponent").join("TextInputBuilder").split("apiRequest").join("request").split("apiResponse").join("response").split("rateLimit").join("rateLimited").split("PLAYING").join("Discord.ActivityType.Playing").split("WATCHING").join("Discord.ActivityType.Watching").split("LISTENING").join("Discord.ActivityType.Listening").split(".addField").join(".addFields").perms("CREATE_INSTANT_INVITE").perms("KICK_MEMBERS").perms("BAN_MEMBERS").perms("ADMINISTRATOR").perms("MANAGE_CHANNELS").perms("MANAGE_GUILD").perms("ADD_REACTIONS").perms("VIEW_AUDIT_LOG").perms("PRIORITY_SPEAKER").perms("STREAM").perms("VIEW_CHANNEL").perms("SEND_MESSAGES").perms("SEND_TTS_MESSAGES").perms("MANAGE_MESSAGES").perms("EMBED_LINKS").perms("ATTACH_FILES").perms("READ_MESSAGE_HISTORY").perms("MENTION_EVERYONE").perms("USE_EXTERNAL_EMOJIS").perms("VIEW_GUILD_INSIGHTS").perms("CONNECT").perms("SPEAK").perms("MUTE_MEMBERS").perms("DEAFEN_MEMBERS").perms("MOVE_MEMBERS").perms("USE_VAD").perms("CHANGE_NICKNAME").perms("MANAGE_NICKNAMES").perms("MANAGE_ROLES").perms("MANAGE_WEBHOOKS").perms("MANAGE_EMOJIS_AND_STICKERS").perms("USE_APPLICATION_COMMANDS").perms("REQUEST_TO_SPEAK").perms("MANAGE_EVENTS").perms("MANAGE_THREADS").perms("CREATE_PUBLIC_THREADS").perms("CREATE_PRIVATE_THREADS").perms("USE_EXTERNAL_STICKERS").perms("SEND_MESSAGES_IN_THREADS").perms("USE_EMBEDDED_ACTIVITIES").perms("MODERATE_MEMBERS").split(".isCommand()").join(".type == 2").split("isAutocomplete()").join(".type == 4").split(".isMessageComponent()").join(".type == 3").split(".isModalSubmit()").join(".type == 5")
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let vote = await db.get("vote_" + interaction.user.id)
if(!vote) return err(`Ne yazıkki bu komutu kullanmak için oy vermeniz gerekmektedir. [Oy Ver](https://top.gg/bot/990588829255745568/vote)`)
if(vote.time < Date.now()) return err(`Ne yazıkki en son oy verişinizin üzerinden 12 saatten fazla geçmiş bu komutu kullanmak için oy vermeniz gerekiyor. [Oy Ver](https://top.gg/bot/990588829255745568/vote)`)
if(cmd.length > 1000) return err("Ne yazıkki girdiğiniz kod çok uzun o nedenle tek seferde çevrilemez lütfen parça parça giriniz.")
if(cmd2 == cmd) return err("Girdiğiniz kod zaten v14 uyumlu veya v13 değil.")
let embed = Embed("NOOBOT V13toV14", "Kodunuz başarıyla v14'e çevrildi.", "info")
if(cmd2.includes(".addFields")) embed.setFooter({text: "Kodunuz çoğu kısmı v14'e geçirildi fakat .addField kısmı geçirilemedi o kısım için noobing.js'den yardım alınız."})
embed.addFields([
{name: "v13 kod:", value:"```" + cmd +"```"},
{name: "V14 kod:", value:"```" + cmd2 +"```"}
])
interaction.reply({embeds: [embed]})
}
}