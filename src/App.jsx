import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Countries from './components/Countries/Countries';
import CountryDetails from './components/CountryDetails/CountryDetails';

function App() {

  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState({});
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountryData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (query.length <= 0) {
      return;
    }
    const filteredData = countryData.filter((data) => data.name.toLowerCase().includes(query.toLowerCase()));
    setFilterData(filteredData);
  }, [query]);

  useEffect(() => {
    if (filter === 'All') {
      setFilterData(countryData);
    } else {
      const filteredData = countryData.filter((data) => data.region.toLowerCase() === filter.toLowerCase());
      setFilterData(filteredData);
    }
    setQuery('');
  }, [filter]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, [data]);

  return (
      <>
        <Navbar />
        {isDetailPage ?
            Object.keys(data)?.length > 0 && <CountryDetails countryData={data} setData={setData} /> :
            <>
              <Header setQuery={setQuery} setFilter={setFilter} />
              {<Countries query={query} filter={filter} countryData={countryData} filterData={filterData} setData={setData} loading={loading} />}
            </>
        }
      </>
  )
}

export default App;
