const translate = require("@khalyomede/translate");
module.exports = async (func) => {
const randomWords = await import("random-words")
  let word = ".";
  while (!func(word)) {
    let trans = await translate(randomWords.generate(), { from: "en", to: "tr" });
    if (func(trans)) word = trans;
  }
  return word;
};
