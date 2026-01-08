import { articlesTableStructure } from "@/providers/adminSupabaseClient";
import Card from "../atoms/Card";
import { Carousel as FlowBiteCarousel } from "flowbite-react";
import Link from "next/link";
import descriptions from "@/assets/descriptions";

type NewsCarouselProps = {
  articles: articlesTableStructure[];
};

export default function NewsCarousel({ articles }: NewsCarouselProps) {
  function groupBy(array: articlesTableStructure[], size: number) {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  }

  function getSentimentColor(article: articlesTableStructure): string {
    const neutral_sentiment = 1 - article.pos_sentiment - article.neg_sentiment;
    const highest = Math.max(
      neutral_sentiment,
      article.pos_sentiment,
      article.neg_sentiment,
    );

    const sentiment =
      highest === article.pos_sentiment
        ? "bg-green-500/90"
        : highest === article.neg_sentiment
          ? "bg-red-500/90"
          : "bg-gray-500/90";

    return sentiment;
  }

  const groupedArticles = groupBy(articles, 1);

  return (
    <Card
      title="Stock News with Sentiments"
      height="lg"
      width="md"
      description={descriptions.NewsCarousel}
    >
      <FlowBiteCarousel
        indicators={false}
        className="h-110 justify-center 
        sm:h-120"
      >
        {groupedArticles.map((articles: articlesTableStructure[], key) => (
          <div
            key={key}
            className="flex flex-row h-full pt-5 min-h-fit gap-x-4 w-full justify-center cursor-pointer pb-0
            sm:pb-15"
          >
            {articles.map((article: articlesTableStructure) => (
              <Link
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:-translate-y-2
focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div key={article.id} className="flex flex-col min-h-35 w-60 ">
                  <h1
                    className={`p-2 border-b-2 font-bold min-h-30 rounded-t-2xl border-3 ${getSentimentColor(article)}`}
                  >
                    {article.headline.length > 80
                      ? article.headline.slice(0, 80) + "..."
                      : article.headline}
                  </h1>
                  <p className="p-2 min-h-60 font-semibold border-3 border-t-0 rounded-2xl rounded-t-none">
                    {article.summary.length > 180
                      ? article.summary.slice(0, 180) + "..."
                      : article.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </FlowBiteCarousel>
    </Card>
  );
}
