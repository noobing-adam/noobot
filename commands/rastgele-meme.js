const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
let Embed = require("../tools/embed.js")
const axios = require("axios").default
module.exports = {
category: "Eğlence",
data: new SlashCommandBuilder()
  .setName("rastgele-meme")
  .setDescription("Rastgele bir meme(meem) gösterir.")
.addStringOption(option =>
		option
			.setName('dil')
			.setDescription('Hangi dilde bir meme istediğiniz. Eğer seçmezsen en son seçtiğin dilde verilir.')
.addChoices({name: "Türkçe/TR", value: "tr"} , {name: "English/EN", value: "memes"})
)
,execute: async(interaction, client) => { 
let türkçedilsayfası = ["burdurland", "ZargoryanGalaksisi", "ShitpostTC"][Math.round(Math.random() * 2)]
let dil = interaction.options.getString("dil") ? interaction.options.getString("dil") : (await db.get("memedil_" + interaction.user.id) ? await db.get("memedil_" + interaction.user.id) : "memes")
db.set("memedil_" + interaction.user.id, dil)
if(dil == "tr") dil = türkçedilsayfası;
let err = (e) => interaction.reply({embeds:[Embed(":x: Bir hata ile karşılaşıldı. :x:",e,"error")],ephemeral:true}).catch(err => {})
  const token = await getToken();

  const response = await axios.get(`https://oauth.reddit.com/r/${dil}/hot?limit=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": user_agent,
    },
  });

  const posts = response.data.data.children;
  const random = posts[Math.floor(Math.random() * posts.length)].data;
    const embed = new Discord.EmbedBuilder()
        .setTitle(`Rastgele Meme`)
        .setDescription(`Bu meme r/${dil}'den alınmıştır. ([Posta Git](https://reddit.com${random.permalink}))\n**${random.title}**`)
        .setImage(random.url)
      interaction.reply({ embeds: [embed] });
}
}
const client_id = "1_viVMbDZcX2NqJzUb_Uxg";
const client_secret = "bVkX7Prdx44inC9lZIb2m4tEDc4bHQ";
const user_agent = "NoobingScriptBot/1.0 by u/your_reddit_username";

async function getToken() {
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "User-Agent": user_agent,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
}
