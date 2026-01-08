const descriptions = {
  marketStatus:
    "This section provides relevant information about the current market status on the short term. A bull icon indicates a positive market trend, while a bear icon signifies a negative trend. ",
  SentimentGraph:
    "This graph illustrates the sentiment analysis of articles related to the selected company. It categorizes sentiments into Positive, Neutral, and Negative, providing insights into public perception. It uses a the Hugging Face Model 'ProsusAI/finbert' for classification.",
  MostBoughtStrikes:
    "This section displays the strikes prices with the highest purchase volume for options related to the selected company. It provides insights into market trends and investor preferences based on recent trading activity.",
  NewsCarousel:
    "This carousel showcases the latest news articles related to the selected company. They are colored based on their sentiment analysis: green for positive sentiment, red for negative sentiment, and gray for neutral sentiment. This feature helps users quickly gauge the overall news sentiment surrounding the company. It uses a the Hugging Face Model 'ProsusAI/finbert' for classification.",
};

export default descriptions;
