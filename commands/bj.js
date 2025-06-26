const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
let Embed = require("../tools/embed.js");
module.exports = {
  category: "Oyun",
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Blackjack oynarsınız."),
  execute: async (interaction, client) => {
let games = []
function findActiveGameForPlayer(playerName) {
return games.find(game => game.players.find(x => x.name == playerName))
}

function findPlayerInGame(game, playerName) {
return game.players.find(x => x.name == playerName)
}

class Deck {
  constructor() {
    this.deck = [];
    this.resetDeck();
  }

  resetDeck() {
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const values = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];

    for (const suit of suits) {
      for (const value of values) {
        this.deck.push(`${value} of ${suit}`);
      }
    }
  }

  drawCard() {
    const randomIndex = Math.floor(Math.random() * this.deck.length);
    return this.deck.splice(randomIndex, 1)[0];
  }
}

// Define a class for each player
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  getHandValue() {
    let handValue = 0;
    for (const card of this.hand) {
      const value = parseInt(card.split(' ')[0]);
      if (isNaN(value)) {
        if (card.startsWith('jack') || card.startsWith('queen') || card.startsWith('king')) {
          handValue += 10;
        } else {
          if(handValue+11 > 21) handValue += 1;
          else handValue += 11;
        }
      } else {
        handValue += value;
      }
    }
    return handValue;
  }
}

// Define a class for the game
class BlackjackGame {
  constructor() {
    this.deck = new Deck();
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  dealInitialCards() {
    for (const player of this.players) {
      player.addCardToHand(this.deck.drawCard());
let hand = this.getPlayerStatus(player)
if(hand.value < 7){
player.addCardToHand(this.deck.drawCard());
}
}
  }

  getPlayerStatus(player) {
    return {hand: player.hand.join(', '), value: player.getHandValue()}
  }
}

    const game = new BlackjackGame();
    games.push(game)
    game.addPlayer(new Player(interaction.user.username));
    game.addPlayer(new Player("Rakip"))
    game.dealInitialCards();
    let embed = Embed("GameBot BlackJack", "Elleriniz aşağıda gösteriliyor. Oyunu oynamak için butonları kullanabilirsin.", "info")
let el = game.getPlayerStatus(game.players.find(x => x.name == interaction.user.username))
let el2 = game.getPlayerStatus(game.players.find(x => x.name == "Rakip"))
embed.addFields([
{name: "Sen:", value: `Elin: ${el.hand}\nDeğer: ${el.value}`},
{name: "Rakip:", value: `Eli: ${el2.hand}\nDeğer: ${el2.value}`},
])
        let yes = new Discord.ButtonBuilder()
          .setStyle("Success")
          .setLabel("Kart Çek")
          .setCustomId("yes");
        let no = new Discord.ButtonBuilder()
          .setStyle("Danger")
          .setLabel("Bitir")
          .setCustomId("no");
        let row = new Discord.ActionRowBuilder()
          .addComponents(yes)
          .addComponents(no);

await interaction.reply({embeds: [embed], components: [row]})
let msg = await interaction.fetchReply()
    const filter = (i) => i.customId == 'yes' || i.customId == "no" && i.user.id == interaction.user.id;
let end;
    while(!end){
    let int = await interaction.channel.awaitMessageComponent({ filter, time: 60000 })
await int.deferUpdate({ephemeral: true})
    if (int.customId === 'no') {
      const gamey = findActiveGameForPlayer(interaction.user.username);
      const player = findPlayerInGame(gamey, interaction.user.username);
      const player2 = findPlayerInGame(gamey, "Rakip");
      let el3 = gamey.getPlayerStatus(player2)
if(el3.value < 16){
      player2.addCardToHand(gamey.deck.drawCard());
} else if(el3.value < gamey.getPlayerStatus(player) || Math.random() > (el3.value-15)/6){
      player2.addCardToHand(gamey.deck.drawCard());
  }
      let el = gamey.getPlayerStatus(player)
      let el2 = gamey.getPlayerStatus(player2)
      let embed2 = Embed(msg.embeds[0].title, msg.embeds[0].description, "info")
embed2.addFields([
{name: "Sen:", value: `Elin: ${el.hand}\nDeğer: ${el.value}`},
{name: "Rakip:", value: `Eli: ${el2.hand}\nDeğer: ${el2.value}`},
])
await      interaction.editReply({embeds: [embed2]});
msg = await interaction.fetchReply()
      end = 1
    } else {
      const gamey = findActiveGameForPlayer(interaction.user.username);
      const player = findPlayerInGame(gamey, interaction.user.username);
      const player2 = findPlayerInGame(gamey, "Rakip");
      let el3 = gamey.getPlayerStatus(player2)
      player.addCardToHand(gamey.deck.drawCard());
if(el3.value < 16){
      player2.addCardToHand(gamey.deck.drawCard());
} else if(el3.value < gamey.getPlayerStatus(player) || Math.random() > (el3.value-15)/6){
      player2.addCardToHand(gamey.deck.drawCard());
  }
      let el = gamey.getPlayerStatus(player)
      let el2 = gamey.getPlayerStatus(player2)
      let embed2 = Embed(msg.embeds[0].title, msg.embeds[0].description, "info")
embed2.addFields([
{name: "Sen:", value: `Elin: ${el.hand}\nDeğer: ${el.value}`},
{name: "Rakip:", value: `Eli: ${el2.hand}\nDeğer: ${el2.value}`},
])
      await interaction.editReply({embeds: [embed2]});  
msg = await interaction.fetchReply()
      if(el.value >= 21 || el2.value >= 21) end = 1
}
}
      const gamey = findActiveGameForPlayer(interaction.user.username);
      const pleya = findPlayerInGame(gamey, interaction.user.username);
      const pleya2 = findPlayerInGame(gamey, "Rakip");
      let hand = gamey.getPlayerStatus(pleya)
      let hand2 = gamey.getPlayerStatus(pleya2)
let berabere = (hand.value > 21 && hand2.value > 21) || (hand.value == hand2.value)
let win = (hand.value <= 21 && (hand2.value < hand.value || hand2.value > 21))
let lose = (hand.value > 21 && hand2.value <= 21) || (hand.value <= 21 && hand2.value <= 21 && hand.value < hand2.value)
let embed3 = msg.embeds[0].data
let fields = embed3.fields
    if(win){
embed3 = Embed(embed3.title, "Oyun Bitti. Tebrikler, Oyunu Kazandın. Diğer oyunlarımızada göz atmayı unutma.", "#40eb34")
embed3.setFields(fields)
interaction.editReply({embeds: [embed3], components: []})
} else if(lose){
embed3 = Embed(embed3.title, "Oyun Bitti. Ne Yazık ki Oyunu Kaybettin. Unutma her zaman tekrardan deneyebilirsin.", "#db2814")
embed3.setFields(fields)
interaction.editReply({embeds: [embed3], components: []})
} else if(berabere){
embed3 = Embed(embed3.title, "Oyun Bitti. Ne Yazık ki Berabere Kaldınız. Unutma her zaman tekrardan deneyebilirsin.", "#14dbce")
embed3.setFields(fields)
interaction.editReply({embeds: [embed3], components: []})
  }
  },
};
