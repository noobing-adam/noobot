const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
var translate = require('node-google-translate-skidz');
const axios = require("axios")
module.exports = {
category: "Genel",
data: new SlashCommandBuilder()
  .setName("çeviri")
  .setDescription("Bir cümleyi başka bir dile çevirirsiniz.")
.addStringOption(option =>
		option
			.setName('cümle')
			.setDescription('Çevirisini yapmak istediğiniz cümle.')
      .setRequired(true)
)
.addStringOption(option =>
		option
			.setName('dil')
			.setDescription('Yazdığınız yazıyı hangi dile çevirmek istediğiniz.')
      .setRequired(true)
)
.addStringOption(option =>
		option
			.setName('yazı-dili')
			.setDescription('Yazdığınız yazının hangi dilde algılanmasını istediğiniz.')
)

,execute: async(interaction, client) => { 
var dils = {				"ab": "Abhazca",
				"aa": "Afar Dili",
				"af": "Afrika Dili",
				"de": "Almanca",
				"am": "Amhara Dili",
				"ar": "Arapça",
				"an": "Aragonca",
				"sq": "Arnavutça",
				"as": "Assam Dili",
				"ay": "Aymara Dili",
				"az": "Azerice",
				"eu": "Baskça",
				"ba": "Başkurtça",
				"bn": "Bengal Dili",
				"be": "Beyaz Rusça",
				"bh": "Biharice",
				"my": "Birmanca",
				"br": "Bretonca",
				"bg": "Bulgarca",
				"dz": "Butanca",
				"jv": "Cava Dili (Javacıları görelim)",
				"cs": "Çekçe",
				"zh": "Çince",
				"da": "Danimarkaca",
				"id": "Endonezya Dili",
				"in": "Endonezya Dili",
				"hy": "Ermenice",
				"eo": "Esperanto Dili",
				"et": "Estonca",
				"fo": "Faroece",
				"fa": "Farsça",
				"fj": "Fijice",
				"fi": "Fince",
				"nl": "Flemenkçe",
				"fr": "Fransızca",
				"fy": "Frizye Dili",
				"gl": "Galiçya Dili",
				"cy": "Galce",
				"gd": "Galce (İskoç)",
				"gv": "Galce (Manx)",
				"kl": "Grönlandca",
				"gn": "Guarani Dili",
				"gu": "Gucerat Dili",
				"ka": "Gürcüce",
				"ht": "Haiti Dili",
				"ha": "Hausa Dili",
				"hr": "Hırvatça",
				"hi": "Hintçe",
				"iu": "Inuktitut Dili",
				"he": "İbranice",
				"iw": "İbranice",
				"io": "İdo Dili",
				"en": "İngilizce",
				"ik": "İnupiakça",
				"ga": "İrlanda Dili",
				"es": "İspanyolca",
				"sv": "İsveçce",
				"it": "İtalyanca",
				"is": "İzlandaca",
				"ja": "Japonca",
				"km": "Kamboçya Dili",
				"kn": "Kannada Dili",
				"ca": "Katalanca",
				"kk": "Kazakça",
				"qu": "Keçuva Dili",
				"ks": "Keşmirce",
				"ky": "Kırgızca",
				"rw": "Kinyarvanda Dili",
				"rn": "Kirundi Dili",
				"ko": "Korece",
				"co": "Korsika Dili",
				"ku": "Kürtçe",
				"la": "Latince",
				"lv": "Letonca",
				"li": "Limburgca",
				"ln": "Lingala Dili",
				"lt": "Litvanca",
				"lo": "Litvan Dili",
				"hu": "Macarca",
				"mg": "Madagaskar Dili",
				"mk": "Makedonca",
				"ms": "Malay Dili",
				"ml": "Malayalam Dili",
				"mt": "Malta Dili",
				"mi": "Maori Dili",
				"mr": "Marathi Dili",
				"mo": "Moldovca",
				"mn": "Moğolca",
				"na": "Nauru Dili",
				"ne": "Nepal Dili",
				"no": "Norveçce",
				"oc": "Oksitan Dili",
				"or": "Oriya Dili",
				"om": "Oromo Dili",
				"uz": "Özbekçe",
				"bi": "Papua Yeni Ginece",
				"pa": "Pencap Dili",
				"ps": "Peştuca",
				"pl": "Polonyaca",
				"pt": "Portekizce",
				"rm": "Romansça",
				"ro": "Romence",
				"ru": "Rusça",
				"sm": "Samoa Dili",
				"sg": "Sangro",
				"sa": "Sanskritçe",
				"tn": "Setsvana Dili",
				"si": "Seylanca",
				"sn": "Shona Dili",
				"sr": "Sırpça",
				"sh": "Sırp Hırvatçası",
				"sd": "Sindçe",
				"ss": "Siswati Dili",
				"ii": "Sişuan Yi",
				"st": "Soto Dili",
				"sk": "Slovakça",
				"sl": "Slovence",
				"so": "Somali Dili",
				"su": "Sundanca",
				"sw": "Svahili Dili",
				"tg": "Tacikçe",
				"tl": "Tagalog Dili",
				"ta": "Tamilce",
				"tt": "Tatarca",
				"th": "Tayca",
				"te": "Telugu Dili",
				"bo": "Tibetçe",
				"ti": "Tigrinya Dili",
				"ts": "Tsonga Dili",
				"tr": "Türkçe",
				"tk": "Türkmence",
				"tw": "Tvi Dili",
				"uk": "Ukraynaca",
				"ur": "Urdu Dili",
				"ug": "Uygurca",
				"vi": "Vietnamca",
				"vo": "Volapük Dili",
				"wo": "Volof Dili",
				"wa": "Wallon Dili",
				"yi": "Yidce",
				"ji": "Yidce",
				"yo": "Yoruba Dili",
				"xh": "Zosa Dili"
           }
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
let vote = await db.get("vote_" + interaction.user.id)
if(!vote) return err(`Ne yazıkki bu komutu kullanmak için oy vermeniz gerekmektedir. [Oy Ver](https://top.gg/bot/990588829255745568/vote)`)
if(vote.time < Date.now()) return err(`Ne yazıkki en son oy verişinizin üzerinden 12 saatten fazla geçmiş bu komutu kullanmak için oy vermeniz gerekiyor. [Oy Ver](https://top.gg/bot/990588829255745568/vote)`)
let yazdil = dils[interaction.options.getString("yazı-dili")] ? interaction.options.getString("yazı-dili") : "auto"
let dil = interaction.options.getString("dil")
let dil2 = dils[interaction.options.getString("dil")] 
if(!dil2) return err(interaction.options.getString("dil") + " kısaltmasıyla bir dil bulunamadı. " + `Dil kısaltmalarını öğrenmek için: [tıkla](https://www.deepbilgi.com/tum-ulkelerin-iso-dil-kodlari.html)`)
let cümle = interaction.options.getString("cümle")
translate({
  text: cümle,
  source: yazdil,
  target: dil

}, function(result) {
let embed = Embed(client.user.username + " Çeviri Sistemi", "Girdiğiniz cümle başarıyla " + dil2 + " diline çevrildi.", "info")  
embed.addFields([{name: "Girdiğiniz Cümle: ", value: cümle},{name: dil2 + " Dilinde:", value: result.sentences[0].trans}])
interaction.reply({embeds: [embed]})
}).catch(err2 => console.log(err2))



}
}