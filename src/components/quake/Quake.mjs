import React, { useState, useEffect } from "react";
import './Quake.css'
const Quake = () => {
  const [quakes, setQuakes] = useState([]);
  const [displayQuakes, setDisplayQuakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [magnitudeFilter, setMagnitudeFilter] = useState(null);
  const quakesPerPage = 15;

  useEffect(() => {
    setLoading(true);
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
      .then(res => res.json())
      .then(data => {
        setQuakes(data.features);
        setTotalPages(Math.ceil(data.features.length / quakesPerPage));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setDisplayQuakes(quakes.slice(page * quakesPerPage, (page + 1) * quakesPerPage));
  }, [page, quakes]);

   const handleLoadMore = () => {
    let startIndex = page * quakesPerPage;
    let endIndex = startIndex + quakesPerPage;
    setDisplayQuakes(quakes.slice(startIndex, endIndex));
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleFilterQuakes = (magnitude) => {
    setMagnitudeFilter(magnitude);
    setQuakes(quakes.filter(quake => quake.properties.mag > magnitude));
    setTotalPages(Math.ceil(quakes.length / quakesPerPage));
  };

  const handleShowLatest = () => {
    setMagnitudeFilter(null);
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
      .then(res => res.json())
      .then(data => {
        setQuakes(data.features);
        setTotalPages(Math.ceil(data.features.length / quakesPerPage));
      });
  };

  return (
  <div className="quake-container" style={{ marginTop: "60px" }}>
    <h1 style={{ textAlign: "center" }}>Latest 15 Quakes</h1>
    <div className="d-flex justify-content-center mb-3">
      <button 
        className="btn btn-primary mr-3"
        onClick={handleShowLatest}
      >
        Show Latest 15 Quakes
      </button>
      <button 
        className="btn btn-secondary mr-3"
        onClick={() => handleFilterQuakes(5)}
      >
        Filter Quakes > 5
      </button>
      <button 
        className="btn btn-success"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </div>
    <div className="quake-list">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        displayQuakes.map((quake, index) => (
          <div key={index} className={`quake-item mb-3 ${quake.properties.mag > 6 ? "quake-item-red" : quake.properties.mag > 4 ? "quake-item-yellow" : "quake-item-green"}`}>
  
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(quake.properties.time).toLocaleString()}
            </p>
            <p><strong>Location:</strong> {quake.properties.place}</p>
            <p><strong>Magnitude:</strong> {quake.properties.mag}</p>
          </div>
        ))
    
      )}
    </div>

    
    <div className="pagination d-flex justify-content-center mt-3">
      <button 
        className="btn btn-secondary mr-3"
        onClick={() => handlePrevPage()}
        disabled={page === 0}
      >
        Prev
      </button>
      <span className="mx-3">Page {page + 1} of {totalPages}</span>
      <button 
        className="btn btn-secondary ml-3"
        onClick={() => handleNextPage()}
        disabled={page === totalPages - 1}
      >
        Next
      </button>
    </div>
  </div>
);


};

export default Quake;









// import React, { useState, useEffect } from 'react';

// // API to fetch the latest quakes data
// const fetchQuakes = async (offset) => {
//   const response = await fetch(
//     `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=15&offset=${offset}`
//   );
//   const data = await response.json();
//   return data.features;
// };

// // Component to display a single quake in a list item
// const Quake = ({ quake }) => {
//   const { properties } = quake;
//   const { time, place, mag } = properties;
//   return (
//     <li>
//       Date-Time: {new Date(time).toLocaleString()} <br />
//       Location: {place} <br />
//       Magnitude: {mag}
//     </li>
//   );
// };

// // Main Quake component
// const QuakeList = () => {
//   const [quakes, setQuakes] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [filtered, setFiltered] = useState(false);

//   // Fetch the initial set of quakes
//   useEffect(() => {
//     (async () => {
//       const quakesData = await fetchQuakes(offset);
//       setQuakes(quakesData);
//     })();
//   }, [offset]);

//   // Load more quakes when the "Load More" button is clicked
//   const handleLoadMore = async () => {
//     const quakesData = await fetchQuakes(offset + 15);
//     setQuakes([...quakes, ...quakesData]);
//     setOffset(offset + 15);
//   };

//   // Refresh the quake list when the "Refresh List" button is clicked
//   const handleRefresh = async () => {
//     const quakesData = await fetchQuakes(0);
//     setQuakes(quakesData);
//     setOffset(0);
//   };

//   // Filter the quakes based on magnitude
//   const handleFilter = () => {
//     setFiltered(!filtered);
//   };

//   // Display the filtered or non-filtered list of quakes
//   const displayedQuakes = filtered
//     ? quakes.filter((quake) => quake.properties.mag > 5)
//     : quakes;

//   return (
//     <div>
//       <button onClick={handleRefresh}>Refresh List</button>
//       <button onClick={handleFilter}>
//         {filtered ? 'Show All Quakes' : 'Filter Quakes > 5'}
//       </button>
//       <button onClick={handleLoadMore}>Load More</button>
//       <ul>
//         {displayedQuakes.map((quake, index) => (
//           <Quake key={index} quake={quake} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default QuakeList;










/*

import React, { useState, useEffect } from "react";
import axios from "axios";


const API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=50";

const Quake = () => {
  const [quakes, setQuakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quakesPerPage, setQuakesPerPage] = useState(10);
  const [filter, setFilter] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
   const [displayEarthquakes, setDisplayEarthquakes] = useState([]);
  const [magnitude, setMagnitude] = useState(5);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("Turkey");
  
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(API_URL);
  //       const data = await response.json();
  //       setQuakeData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       setError(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);
   useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=50&offset=${offset}`
        );
        const result = await response.json();
        setQuakes(result.features);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [offset]);
   const handleNext = () => { setOffset(offset + 100); };
   const handlePrev = () => { setOffset(offset - 100); };
   const handleCountryFilter = country => {setSelectedCountry(country); };
  

  useEffect(() => {
    setTotalPages(Math.ceil(filteredQuakes.length / quakesPerPage));
  }, [filteredQuakes, quakesPerPage]);

  useEffect(() => {
    const filtered = quakes.filter(quake => quake.properties.mag > filter);
    setFilteredQuakes(filtered);
  }, [quakes, filter]);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  
  const handleLoadMore = () => {
    let startIndex = currentPage * quakesPerPage;
    let endIndex = startIndex + 5;
    setDisplayEarthquakes(displayEarthquakes.concat(filteredQuakes.slice(startIndex, endIndex)));
    setCurrentPage(currentPage + 1);
  };

  const handleRefresh = async () => {
     setLoading(true);
  const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson&limit=150');
  const data = await res.json();
  setQuakes(data.features.slice(0, 15));
  setFilteredQuakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, 15));
  setDisplayEarthquakes(filteredQuakes.slice(0, quakesPerPage));
  setCurrentPage(1);
  setLoading(false);
    // setLoading(true);
    // const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    // const data = await res.json();
    // setQuakes(data.features.slice(0, 15));
    // setFilteredQuakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, 15));
    // setDisplayEarthquakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
    // setCurrentPage(1);
    // setLoading(false);
  };

  const indexOfLastQuake = currentPage * quakesPerPage;
  const indexOfFirstQuake = indexOfLastQuake - quakesPerPage;
  const currentQuakes = filteredQuakes.slice(indexOfFirstQuake, indexOfLastQuake);


   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const renderQuakes = displayEarthquakes.map((quake, index) => (
  <div key={index} style={{ margin: "20px" }}>
    <p>
      <strong>Place:</strong> {quake.properties.place}
    </p>
    <p>
      <strong>Magnitude:</strong> {quake.properties.mag}
    </p>
    <p>
      <strong>Time:</strong> {new Date(quake.properties.time).toString()}
    </p>
  </div>
));


  const renderPageNumbers = pageNumbers.map(number => (
    <button key={number} onClick={() => handlePageChange(number)}>
      {number}
    </button>
  ));

   // {loading && (
   //      <div className="d-flex justify-content-center">
   //        <div className="spinner-grow text-primary" role="status">
   //          <span className="sr-only">Loading...</span>
   //        </div>
   //      </div>
   //    )}
      


return (
    <div style={{ marginTop: '60px' }}>
    {loading ? (
      
      <div className="d-flex justify-content-center">
        
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
     
      <div className="container">
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
             <p>Current Page: {currentPage}</p>
        </div>

        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleRefresh}>Refresh List</button>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Prev</button>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
            <button onClick={handleLoadMore}>Load More</button>

            {offset > 0 && (
            <button onClick={handlePrev}>Load previous quake data</button>
            )}
            {offset + 100 < 250 && (
            <button onClick={handleNext}>Load more quake data</button>
            )}
        </div>
        
    
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor="filter">Filter quakes by magnitude > </label>
     
        <input
          type="number"
          id="filter"
          min="1"
          max="10"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
        
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentQuakes.map((quake, index) => (
          <div
            key={quake.id}
            style={{
              width: '19%',
              border: '1px solid black',
              padding: '10px',
              textAlign: 'center',
              backgroundColor:
                quake.properties.mag === 5  ? 'yellow' : quake.properties.mag <= 3 ? 'green' : quake.properties.mag >= 6  ? 'red' : 'transparent'
                
            }}
          >

            
          <h3>{quake.properties.title}</h3>
            <p>Magnitude: {quake.properties.mag}</p>
          <p>
            <strong>Time:</strong> {new Date(quake.properties.time).toString()}
          </p>
                
            
          </div>
        ))}
      </div>
     


         </div>
    )}
    
    </div>
);
};

export default Quake;

*/







/*
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=15";

const Quake = () => {
  const [quakes, setQuakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [showQuakes, setShowQuakes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quakesPerPage, setQuakesPerPage] = useState(5);
  const [filter, setFilter] = useState(5);
   const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setQuakes(result.data.features);
      setFilteredQuakes(result.data.features);
    };
    fetchData();
  }, []);

  const handleRefresh = () => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setQuakes(result.data.features);
      setFilteredQuakes(result.data.features);
    };
    fetchData();
  };

  const handleFilter = () => {
    const minMagnitude = 1;
  
    const filteredQuakes = quakes.filter((quake) => quake["Magnitude"] >= minMagnitude);
    setFilteredQuakes(filteredQuakes);
  };

    const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  useEffect(() => {
  setTotalPages(Math.ceil(filteredQuakes.length / quakesPerPage));
}, [filteredQuakes, quakesPerPage]);

  useEffect(() => {
  const filtered = quakes.filter((quake) => quake.properties.mag > filter);
  setFilteredQuakes(filtered);
}, [quakes, filter]);

  const handleLoadMore = () => {
    const newQuakesPerPage = quakesPerPage + 5;
    setQuakesPerPage(newQuakesPerPage);
  };

 const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
  setPage(newPage);
};

  const indexOfLastQuake = currentPage * quakesPerPage;
  const indexOfFirstQuake = indexOfLastQuake - quakesPerPage;
  const currentQuakes = filteredQuakes.slice(indexOfFirstQuake, indexOfLastQuake);

  const renderQuakes = currentQuakes.map((quake, index) => {
    return (
      <div key={index} style={{ margin: "20px" }}>
        <p>
          <strong>Place:</strong> {quake.properties.place}
        </p>
        <p>
          <strong>Magnitude:</strong> {quake.properties.mag}
        </p>
        <p>
          <strong>Time:</strong> {new Date(quake.properties.time).toString()}
        </p>
      </div>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredQuakes.length / quakesPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button key={number} onClick={() => handlePageChange(number)}>
        {number}
      </button>
    );
  });

return (
    <div style={{ marginTop: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor="filter">Filter quakes > </label>
        <input
          type="number"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentQuakes.map((quake, index) => (
          <div
            key={quake.id}
            style={{
              width: '19%',
              border: '1px solid black',
              padding: '10px',
              textAlign: 'center',
              backgroundColor:
                quake.properties.mag > 5 ? 'red' : 'transparent'
            }}
          >
            <h3>{quake.properties.title}</h3>
            <p>Magnitude: {quake.properties.mag}</p>
            <p>Time: {quake.properties.time}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
Next
</button>
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<button onClick={handleLoadMore}>Load More</button>
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
<button onClick={handleRefresh}>Refresh List</button>
</div>
</div>
);
};

export default Quake;

*/


   















/*
import React, { useState, useEffect } from 'react';
import './Quake.css';

const Quake = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quakesPerPage, setQuakesPerPage] = useState(15);
  const [magnitude, setMagnitude] = useState(5);
  const [displayEarthquakes, setDisplayEarthquakes] = useState([]);

 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
      const data = await res.json();
      setEarthquakes(data.features);
      setFilteredQuakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude));
      setDisplayEarthquakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFilter = (magnitude) => {
    setMagnitude(magnitude);
    setFilteredQuakes(earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude));
    setDisplayEarthquakes(earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
  };

  const handleLoadMore = () => {
    let startIndex = currentPage * quakesPerPage;
    let endIndex = startIndex + 5;
    setDisplayEarthquakes(displayEarthquakes.concat(filteredQuakes.slice(startIndex, endIndex)));
    setCurrentPage(currentPage + 1);
  };

  const refreshQuakes = async () => {
    setLoading(true);
    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    const data = await res.json();
    setEarthquakes(data.features.slice(0, 15));
    setFilteredQuakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, 15));
    setDisplayEarthquakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
    setCurrentPage(1);
    setLoading(false);
  };

*/











/*
import React, { useState, useEffect } from 'react';
import './Quake.css';

const Quake = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quakesPerPage, setQuakesPerPage] = useState(5);
  const [magnitude, setMagnitude] = useState(5);
  const [displayEarthquakes, setDisplayEarthquakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
      const data = await res.json();
      setEarthquakes(data.features);
      setFilteredQuakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude));
      setDisplayEarthquakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFilter = (magnitude) => {
    setMagnitude(magnitude);
    setFilteredQuakes(earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude));
    setDisplayEarthquakes(earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
  };

  const handleLoadMore = () => {
    let startIndex = currentPage * quakesPerPage;
    let endIndex = startIndex + quakesPerPage;
    setDisplayEarthquakes(filteredQuakes.slice(startIndex, endIndex));
    setCurrentPage(currentPage + 1);
  };

  const refreshQuakes = async () => {
    setLoading(true);
    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    const data = await res.json();
    setEarthquakes(data.features.slice(0, 15));
    setFilteredQuakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, 15));
    setDisplayEarthquakes(data.features.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage));
    setCurrentPage(1);
    setLoading(false);
  };

 return (
  <div className="quake-container">
    <div className="quake-header">
      <h2>Last 15 Quakes</h2>
      <button className="refresh-button" onClick={refreshQuakes}>
        Refresh
      </button>
      <button className="filter-button" onClick={() => filterQuakes(magnitude)}>
        Filter Quakes > {magnitude}
      </button>
    </div>
    {loading ? (
      <div className="loading">Loading...</div>
    ) : (
      <ul className="quake-list">
        {displayEarthquakes.map((earthquake) => (
          <li key={earthquake.id} className="quake-item">
            <div className={`quake-bullet magnitude-${earthquake.properties.mag}`} />
            <p>
              <span className="quake-date">{new Date(earthquake.properties.time).toLocaleString()}</span>
              <br />
              <span className="quake-location">{earthquake.properties.place}</span>
              <br />
              <span className="quake-magnitude">Magnitude: {earthquake.properties.mag}</span>
            </p>
          </li>
        ))}
      </ul>
    )}
    <div className="quake-pagination">
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          Prev
        </button>
      )}
      <span className="quake-page-number">
        Page {currentPage} of {Math.ceil(filteredQuakes.length / quakesPerPage)}
      </span>
      {currentPage < Math.ceil(filteredQuakes.length / quakesPerPage) && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
    {filteredQuakes.length > 0 && (
      <button className="load-more-button" onClick={handleLoadMore}>
        Load More
      </button>
    )}
  </div>
);
   
}


export default Quake;
*/




/*
import React, { useState, useEffect } from 'react';
import './Quake.css';

const Quake = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quakesPerPage, setQuakesPerPage] = useState(5);
  const [magnitude, setMagnitude] = useState(5);
  const [displayEarthquakes, setDisplayEarthquakes] = useState([]);
  const [quakesToDisplay, setQuakesToDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
      const data = await res.json();
      setEarthquakes(data.features);
      setDisplayEarthquakes(data.features.slice(0, quakesPerPage));
      setLoading(false);
    };
    fetchData();
  }, []);

  const filterQuakes = (magnitude) => {
    setMagnitude(magnitude);
    setDisplayEarthquakes(
      earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage)
    );
  };

  const handleLoadMore = () => {
    let startIndex = currentPage * quakesPerPage;
    let endIndex = startIndex + quakesPerPage;
    setDisplayEarthquakes(earthquakes.slice(startIndex, endIndex));
    setCurrentPage(currentPage + 1);
  };

   const refreshQuakes = async () => {
    setLoading(true);
    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    const data = await res.json();
    setEarthquakes(data.features.slice(0, 15));
    setLoading(false);
  };

  return (
    <div className="quake-container">
      <div className="quake-header">
        <h2>Last 15 Quakes</h2>
        <button className="refresh-button" onClick={refreshQuakes}>
          Refresh
        </button>
        <button className="filter-button" onClick={() => filterQuakes(magnitude)}>
          Filter Quakes > {magnitude}
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul className="quake-list">
          {quakesToDisplay.map((earthquake) => (
            <li key={earthquake.id} className="quake-item">
              <div className={`quake-bullet magnitude-${earthquake.properties.mag}`} />
              <p>
                <span className="quake-date">{new Date(earthquake.properties.time).toLocaleString()}</span>
                <br />
                <span className="quake-location">{earthquake.properties.place}</span>
                <br />
                <span className="quake-magnitude">Magnitude: {earthquake.properties.mag}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="quake-pagination">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Prev
          </button>
        )}
        <span className="quake-page-number">
          Page {currentPage} of {Math.ceil(filteredQuakes.length / quakesPerPage)}
        </span>
        {currentPage < Math.ceil(filteredQuakes.length / quakesPerPage) && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
      {filteredQuakes.length > 0 && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
   );
}


export default Quake;
*/






/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quake.css';

const Quake = () => {
  const [quakes, setQuakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getQuakes();
  }, []);

  const getQuakes = async () => {
    try {
      const response = await axios.get(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
      );
      setQuakes(response.data.features);
      setFilteredQuakes(response.data.features.filter((quake) => quake.properties.mag >= 5));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    getQuakes();
  };

  const handleFilter = () => {
    setShowAll(false);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="quake-container">
      <div className="quake-header">
        <h1>Recent Earthquakes</h1>
        <div className="quake-header-buttons">
          <button onClick={handleRefresh}>Refresh</button>
          <button onClick={handleFilter}>Filter Quakes >= 5</button>
          <button onClick={handleShowAll}>List All</button>
        </div>
      </div>
      <div className="quake-list">
        {showAll ? (
          quakes.map((quake) => (
            <div key={quake.id} className="quake-item">
              <h2>{quake.properties.place}</h2>
              <p>
                Magnitude: <strong>{quake.properties.mag}</strong>
              </p>
              <p>Time: {new Date(quake.properties.time).toLocaleString()}</p>
            </div>
          ))
        ) : (
          filteredQuakes.map((quake) => (
            <div key={quake.id} className="quake-item">
              <h2>{quake.properties.place}</h2>
              <p>
                Magnitude: <strong>{quake.properties.mag}</strong>
              </p>
              <p>Time: {new Date(quake.properties.time).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Quake;

*/

















// import React, { useState, useEffect } from 'react';
// import './Quake.css';

// const Quake = () => {
//   const [earthquakes, setEarthquakes] = useState([]);
//   const [filteredQuakes, setFilteredQuakes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [quakesPerPage, setQuakesPerPage] = useState(5);
//   const [magnitude, setMagnitude] = useState(5);
//   const [displayEarthquakes, setDisplayEarthquakes] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
//       const data = await res.json();
//       setEarthquakes(data.features);
//       setDisplayEarthquakes(data.features.slice(0, quakesPerPage));
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const filterQuakes = (magnitude) => {
//     setMagnitude(magnitude);
//     setDisplayEarthquakes(
//       earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude).slice(0, quakesPerPage)
//     );
//   };

//   const handleLoadMore = () => {
//     let startIndex = currentPage * quakesPerPage;
//     let endIndex = startIndex + quakesPerPage;
//     setDisplayEarthquakes(earthquakes.slice(startIndex, endIndex));
//     setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="quake-container">
//       <div className="quake-header">
//         <h2>Last 15 Quakes</h2>
//         <button className="refresh-button" onClick={refreshQuakes}>
//           Refresh
//         </button>
//         <button className="filter-button" onClick={() => filterQuakes(magnitude)}>
//           Filter Quakes > {magnitude}
//         </button>
//       </div>
//       {loading ? (
//         <div className="loading">Loading...</div>
//       ) : (
//         <ul className="quake-list">
//           {quakesToDisplay.map((earthquake) => (
//             <li key={earthquake.id} className="quake-item">
//               <div className={`quake-bullet magnitude-${earthquake.properties.mag}`} />
//               <p>
//                 <span className="quake-date">{new Date(earthquake.properties.time).toLocaleString()}</span>
//                 <br />
//                 <span className="quake-location">{earthquake.properties.place}</span>
//                 <br />
//                 <span className="quake-magnitude">Magnitude: {earthquake.properties.mag}</span>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="quake-pagination">
//         {currentPage > 1 && (
//           <button onClick={() => setCurrentPage(currentPage - 1)}>
//             Prev
//           </button>
//         )}
//         <span className="quake-page-number">
//           Page {currentPage} of {Math.ceil(filteredQuakes.length / quakesPerPage)}
//         </span>
//         {currentPage < Math.ceil(filteredQuakes.length / quakesPerPage) && (
//           <button onClick={() => setCurrentPage(currentPage + 1)}>
//             Next
//           </button>
//         )}
//       </div>
//       {filteredQuakes.length > 0 && (
//         <button className="load-more-button" onClick={handleLoadMore}>
//           Load More
//         </button>
//       )}
//     </div>
//    );
// }


// export default Quake;







// import React, { useState, useEffect } from 'react';
// import './Quake.css';

// const Quake = () => {
//   const [earthquakes, setEarthquakes] = useState([]);
//   const [filteredQuakes, setFilteredQuakes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [quakesPerPage, setQuakesPerPage] = useState(5);
//   const [magnitude, setMagnitude] = useState(5);
//   const [quakesToDisplay, setQuakesToDisplay] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
//       const data = await res.json();
//       setEarthquakes(data.features);
//       setFilteredQuakes(data.features.filter((quake) => quake.properties.mag >= 5));
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const indexOfLastQuake = currentPage * quakesPerPage;
//   const indexOfFirstQuake = indexOfLastQuake - quakesPerPage;
//   const currentQuakes = filteredQuakes.slice(indexOfFirstQuake, indexOfLastQuake);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleFilter = (e) => {
//     e.preventDefault();
//     setFilteredQuakes(earthquakes.filter((quake) => quake.properties.mag >= 5));
//   };

//   const refreshQuakes = async () => {
//     setLoading(true);
//     const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
//     const data = await res.json();
//     setEarthquakes(data.features);
//     setLoading(false);
//   };

//   const filterQuakes = (magnitude) => {
// setMagnitude(magnitude);
// setDisplayEarthquakes(
// earthquakes.filter((earthquake) => earthquake.properties.mag >= magnitude)
// );
// };

//   const handleLoadMore = () => {
// let startIndex = (currentPage * 15) - 15;
// let endIndex = currentPage * 15;
// setDisplayEarthquakes(earthquakes.slice(startIndex, endIndex));
// setCurrentPage(currentPage + 1);
// };

//  return (
//     <div className="quake-container">
//       <div className="quake-header">
//         <h2>Last 15 Quakes</h2>
//         <button className="refresh-button" onClick={refreshQuakes}>
//           Refresh
//         </button>
//         <button className="filter-button" onClick={filterQuakes}>
//           Filter Quakes > 5
//         </button>
//       </div>
//       {loading ? (
//         <div className="loading">Loading...</div>
//       ) : (
//         <ul className="quake-list">
//           {quakesToDisplay.map((earthquake) => (
//             <li key={earthquake.id} className="quake-item">
//               <div className={`quake-bullet magnitude-${earthquake.properties.mag}`} />
//               <p>
//                 <span className="quake-date">{new Date(earthquake.properties.time).toLocaleString()}</span>
//                 <br />
//                 <span className="quake-location">{earthquake.properties.place}</span>
//                 <br />
//                 <span className="quake-magnitude">Magnitude: {earthquake.properties.mag}</span>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="quake-pagination">
//         {currentPage > 1 && (
//           <button onClick={() => setCurrentPage(currentPage - 1)}>
//             Prev
//           </button>
//         )}
//         <span className="quake-page-number">
//           Page {currentPage} of {Math.ceil(filteredQuakes.length / quakesPerPage)}
//         </span>
//         {currentPage < Math.ceil(filteredQuakes.length / quakesPerPage) && (
//           <button onClick={() => setCurrentPage(currentPage + 1)}>
//             Next
//           </button>
//         )}
     
//   </div>
//   </div>

//    );
// }

// export default Quake;




















// import React, { useState, useEffect } from 'react';
// import './Quake.css';

// function Quake() {
//   const [earthquakes, setEarthquakes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
//       const data = await res.json();
//       setEarthquakes(data.features.slice(0, 15));
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const refreshQuakes = async () => {
//     setLoading(true);
//     const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
//     const data = await res.json();
//     setEarthquakes(data.features.slice(0, 15));
//     setLoading(false);
//   };

//   return (
//     <div className="quake-container">
//       <div className="quake-header">
//         <h2>Last 15 Quakes</h2>
//         <button className="refresh-button" onClick={refreshQuakes}>
//           Refresh
//         </button>
//       </div>
//       {loading ? (
//         <div className="loading">Loading...</div>
//       ) : (
//         <ul className="quake-list">
//           {earthquakes.map((earthquake) => (
//             <li key={earthquake.id} className="quake-item">
//               <p>
//                 <span className="quake-date">{new Date(earthquake.properties.time).toLocaleString()}</span>
//                 <br />
//                 <span className="quake-location">{earthquake.properties.place}</span>
//                 <br />
//                 <span className="quake-magnitude">Magnitude: {earthquake.properties.mag}</span>
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="quake-picture">
//         <img src="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson" alt="Latest Earthquake" />
//         <button className="refresh-picture-button" onClick={refreshQuakes}>
//           Refresh
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Quake;
