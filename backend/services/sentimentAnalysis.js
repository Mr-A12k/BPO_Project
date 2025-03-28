const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

exports.analyzeSentiment = (text) => {
  const tokens = tokenizer.tokenize(text);
  return analyzer.getSentiment(tokens);
};