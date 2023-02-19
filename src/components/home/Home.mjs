
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const bbcUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.newsApiKey}`;
        const aljazeeraUrl = `https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${process.env.newsApiKey}`;
        const reutersUrl = `https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=${process.env.newsApiKey}`;

        const bbcResponse = await fetch(bbcUrl);
        const aljazeeraResponse = await fetch(aljazeeraUrl);
        const reutersResponse = await fetch(reutersUrl);

        const bbcData = await bbcResponse.json();
        const aljazeeraData = await aljazeeraResponse.json();
        const reutersData = await reutersResponse.json();

        const allArticles = bbcData.articles.concat(
          aljazeeraData.articles,
          reutersData.articles
        );
        const topArticles = allArticles
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
          .slice(0, 3);

        setArticles(topArticles);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Top 3 News Articles</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Failed to fetch news articles: {error}</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.url}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h2>{article.title}</h2>
              </a>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;



/* Good but fails to fetch, good error handling

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = process.env.newsApiKey;

  const bbcUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;
  const aljazeeraUrl = `https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${apiKey}`;
  const reutersUrl = `https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=${apiKey}`;

  const fetchArticles = async () => {
    try {
      const bbcResponse = await fetch(bbcUrl);
      const aljazeeraResponse = await fetch(aljazeeraUrl);
      const reutersResponse = await fetch(reutersUrl);

      if (!bbcResponse.ok || !aljazeeraResponse.ok || !reutersResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const bbcJson = await bbcResponse.json();
      const aljazeeraJson = await aljazeeraResponse.json();
      const reutersJson = await reutersResponse.json();

      const allArticles = [
        ...bbcJson.articles.slice(0, 3),
        ...aljazeeraJson.articles.slice(0, 3),
        ...reutersJson.articles.slice(0, 3)
      ];

      setArticles(allArticles);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch news articles.');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Top News Headlines</h1>
      {error && <p>{error}</p>}
      <ul>
        {articles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2>{article.title}</h2>
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

*/