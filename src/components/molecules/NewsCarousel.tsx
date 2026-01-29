"use client";
import { articlesTableStructure } from "@/providers/adminSupabaseClient";
import Card from "../atoms/Card";
import Link from "next/link";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const locales: Record<string, typeof en> = {
  en,
  es,
};

type NewsCarouselProps = {
  articles: articlesTableStructure[];
  locale: string;
};

export default function NewsCarousel({ articles, locale }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const text = locales[locale] ?? en;
  const currentArticle = articles[currentIndex];

  if (!currentArticle) return null;

  return (
    <Card
      title={text["Articles Sentiment"].Title}
      height="lg"
      width="lg"
      description={text["Articles Sentiment"].Description}
    >
      <div className="relative flex h-full w-full items-center justify-center pt-5 pb-5">
        <button
          onClick={goToPrevious}
          className="absolute left-2 z-10 rounded-full bg-gray-300 p-2 hover:bg-gray-400 transition"
          aria-label="Previous article"
        >
          <FaChevronLeft size={20} />
        </button>

        <Link
          href={currentArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex flex-col min-h-35 w-60">
            <h1
              className={`p-2 border-b-2 font-bold min-h-30 rounded-t-2xl border-3 ${getSentimentColor(currentArticle)}`}
            >
              {currentArticle.headline.length > 80
                ? currentArticle.headline.slice(0, 80) + "..."
                : currentArticle.headline}
            </h1>
            <p className="p-2 min-h-60 font-semibold border-3 border-t-0 rounded-2xl rounded-t-none">
              {currentArticle.summary.length > 180
                ? currentArticle.summary.slice(0, 180) + "..."
                : currentArticle.summary}
            </p>
          </div>
        </Link>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          className="absolute right-2 z-10 rounded-full bg-gray-300 p-2 hover:bg-gray-400 transition"
          aria-label="Next article"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2 pt-4 pb-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition ${
              index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-gray-400"
            }`}
            aria-label={`Go to article ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
}
