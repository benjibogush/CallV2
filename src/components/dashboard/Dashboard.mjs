import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bcrypt from 'bcryptjs';
import { sanitize, validate } from './utils.mjs';

const Dashboard = () => {
  const [weatherReport, setWeatherReport] = useState({});
  const [topFiveNews, setTopFiveNews] = useState([]);
  const [guestText, setGuestText] = useState('');
  const [guestTextEntries, setGuestTextEntries] = useState([]);

  useEffect(() => {
    const fetchWeatherReport = async () => {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        setWeatherReport(result.data.main);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTopFiveNews = async () => {
      try {
        const result = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setTopFiveNews(result.data.articles.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherReport();
    fetchTopFiveNews();
  }, []);

  const handleGuestTextChange = (event) => {
    setGuestText(event.target.value);
  };

  const handleGuestTextSubmit = (event) => {
    event.preventDefault();
    if (validate(guestText)) {
      const maskedText = Bcrypt.hashSync(sanitize(guestText), 10);
      setGuestTextEntries([...guestTextEntries, maskedText]);
      setGuestText('');
    }
  };

  return (
    <div className="dashboard" style={{ marginTop: '60px' }}>
    
      <div className="cursor-tail-animation"></div>
      
      <h2>Top 5 News</h2>
      {topFiveNews.length ? (
        <ul>
          {topFiveNews.map((news, index) => (
            <li key={index}>{news.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading news...</p>
      )}
      
      <h2>Weather Report</h2>
      {Object.keys(weatherReport).length ? (
        <p>Temperature: {weatherReport.temp}</p>
      ) : (
        <p>Loading weather report...</p>
      )}
      <h2>Guest Text Box</h2>
      <form onSubmit={handleGuestTextSubmit}>
        <input type="text" value={guestText} onChange={handleGuestTextChange} />
        <button type="submit">Submit</button>
</form>
      
<h2>Guest Text Entries</h2>
<ul>
{guestTextEntries.map((entry, index) => (
<li key={index}>{entry}</li>
))}
</ul>

  </div>
);

}

export default Dashboard;
