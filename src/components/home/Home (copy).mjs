

import React, { useState, useEffect } from 'react';
import './home.css';

const Home = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('#000');
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const reutersUrl = 'https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=${process.env.newsApiKey}';
      const reutersResponse = await fetch(reutersUrl);
      if (reutersResponse.ok) {
        const reutersData = await reutersResponse.json();
        const reutersArticles = reutersData.articles.slice(0, 5).map((article) => {
          return {
            title: article.title,
            description: article.description,
            link: article.url,
            source: 'Reuters'
          };
        });
        setNews(prevNews => [...prevNews, ...reutersArticles]);
      }

      const aljazeeraUrl = 'https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${process.env.newsApiKey}';
      const aljazeeraResponse = await fetch(aljazeeraUrl);
      if (aljazeeraResponse.ok) {
        const aljazeeraData = await aljazeeraResponse.json();
        const aljazeeraArticles = aljazeeraData.articles.slice(0, 5).map((article) => {
          return {
            title: article.title,
            description: article.description,
            link: article.url,
            source: 'Al Jazeera'
          };
        });
        setNews(prevNews => [...prevNews, ...aljazeeraArticles]);
      }

      const bbcUrl = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.newsApiKey}';
      const bbcResponse = await fetch(bbcUrl);
      if (bbcResponse.ok) {
        const bbcData = await bbcResponse.json();
        const bbcArticles = bbcData.articles.slice(0, 5).map((article) => {
          return {
            title: article.title,
            description: article.description,
            link: article.url,
            source: 'BBC'
          };
        });
        setNews(prevNews => [...prevNews, ...bbcArticles]);
      }
    }

    fetchNews();
  }, []);
   
  const handleClick = () => {
    setCount(count + 1);
  };

  const handleHover = () => {
    const colors = ['red', 'green', 'blue', 'purple', 'orange', 'pink'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  return (
    <div className="container">
      <h1 className="title" style={{ color: color }}>
        Welcome to my project!
      </h1>
  <div style={{ overflow: 'scroll', maxHeight: '500px' }}>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.source}</p>
            <p>{article.description}</p>
            <p><a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a></p>
            {article.source === 'Reuters' && <p><small>Attribution: <a href="https://www.reuters.com/" target="_blank" rel="noopener noreferrer">Reuters</a></small></p>}
            {article.source === 'Al Jazeera' && <p><small>Attribution: <a href="https://www.aljazeera.com/" target="_blank" rel="noopener noreferrer">Al Jazeera</a></small></p>}
            {article.source === 'BBC' && <p><small>Attribution: <a href="https://www.bbc.com/" target="_blank" rel="noopener noreferrer">BBC</a></small></p>}
          </li>
        ))}
      </ul>
    </div>


      
      <div className="counter">
        <p>Click Count: {count}</p>
        <button onClick={handleClick}>Click Me</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <div
        className="box"
        onMouseEnter={handleHover}
        onMouseLeave={() => setColor('#000')}
        style={{ backgroundColor: color }}
      >
        Hover Over Me
      </div>
      
      <div className="tree-container">
       
      </div>
    </div>
  );
};

export default Home;


/*
import React, { useState, useEffect } from 'react';

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const reutersUrl = 'https://www.reuters.com/rss/topNews'; 
      const aljazeeraUrl = 'https://www.aljazeera.com/xml/rss/all.xml';
      const bbcUrl = 'http://feeds.bbci.co.uk/news/rss.xml';

      const reutersResponse = await fetch(reutersUrl);
      const reutersData = await reutersResponse.text();
      const parser = new DOMParser();
      const reutersXml = parser.parseFromString(reutersData, 'text/xml');
      const reutersArticles = Array.from(reutersXml.querySelectorAll('item')).slice(0, 5).map((item) => {
        return {
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          link: item.querySelector('link').textContent,
          source: 'Reuters'
        };
      });

      const aljazeeraResponse = await fetch(aljazeeraUrl);
      const aljazeeraData = await aljazeeraResponse.text();
      const aljazeeraXml = parser.parseFromString(aljazeeraData, 'text/xml');
      const aljazeeraArticles = Array.from(aljazeeraXml.querySelectorAll('item')).slice(0, 5).map((item) => {
        return {
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          link: item.querySelector('link').textContent,
          source: 'Al Jazeera'
        };
      });

      const bbcResponse = await fetch(bbcUrl);
      const bbcData = await bbcResponse.text();
      const bbcXml = parser.parseFromString(bbcData, 'text/xml');
      const bbcArticles = Array.from(bbcXml.querySelectorAll('item')).slice(0, 5).map((item) => {
        return {
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          link: item.querySelector('link').textContent,
          source: 'BBC'
        };
      });

      const allArticles = [...reutersArticles, ...aljazeeraArticles, ...bbcArticles];

      setNews(allArticles);
    }

    fetchNews();
  }, []);

  return (
    <div style={{ overflow: 'scroll', maxHeight: '500px' }}>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.source}</p>
            <p>{article.description}</p>
            <p><a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a></p>
            {article.source === 'Reuters' && <p><small>Attribution: <a href="https://www.reuters.com/" target="_blank" rel="noopener noreferrer">Reuters</a></small></p>}
            {article.source === 'Al Jazeera' && <p><small>Attribution: <a href="https://www.aljazeera.com/" target="_blank" rel="noopener noreferrer">Al Jazeera</a></small></p>}
            {article.source === 'BBC' && <p><small>Attribution: <a href="https://www.bbc.com/" target="_blank" rel="noopener noreferrer">BBC</a></small></p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;




*/



/*
import React, { useState, useEffect } from 'react';

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const apiKey = process.env.REACT_APP_API_KEY; // Replace with your own environment variable name
      const reutersUrl = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`;
      const apUrl = `https://api.ap.org/v2/topnews?apiKey=${apiKey}`;
      const bbcUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;
      const nytimesUrl = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${apiKey}`;
      const aljazeeraUrl = `https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=${apiKey}`;

      const reutersResponse = await fetch(reutersUrl);
      const reutersData = await reutersResponse.json();
      const reutersArticles = reutersData.articles.slice(0, 5);

      const apResponse = await fetch(apUrl);
      const apData = await apResponse.json();
      const apArticles = apData.results.slice(0, 5);

      const bbcResponse = await fetch(bbcUrl);
      const bbcData = await bbcResponse.json();
      const bbcArticles = bbcData.articles.slice(0, 5);

      const nytimesResponse = await fetch(nytimesUrl);
      const nytimesData = await nytimesResponse.json();
      const nytimesArticles = nytimesData.articles.slice(0, 5);

      const aljazeeraResponse = await fetch(aljazeeraUrl);
      const aljazeeraData = await aljazeeraResponse.json();
      const aljazeeraArticles = aljazeeraData.articles.slice(0, 5);

      const allArticles = [...reutersArticles, ...apArticles, ...bbcArticles, ...nytimesArticles, ...aljazeeraArticles];

      setNews(allArticles);
    }

    fetchNews();
  }, []);

  return (
    <div style={{ overflow: 'scroll', maxHeight: '500px' }}>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.source.name}</p>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;



*/