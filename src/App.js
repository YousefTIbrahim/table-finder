import { useState } from 'react';
import { guests } from './data/guests';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import './styles/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [matchedGuest, setMatchedGuest] = useState(null);

  const handleSearch = (input) => {
    setQuery(input);
    if (!guests || !Array.isArray(guests)) return;

    const match = guests.find(guest =>
      guest.name.toLowerCase().includes(input.toLowerCase())
    );

    setMatchedGuest(match || null);
  };


  return (
    <div className="App-container">
      <div className="overlay">
        <h1 className="text-center mb-4">Find Your Table</h1>
        <SearchBar query={query} onSearch={handleSearch} />
        <ResultCard guest={matchedGuest} />
      <img
        src={`${process.env.PUBLIC_URL}/WeddingMap.jpg`}
        alt="Table Map Loading"
        className="table-map-img mt-4"
      />
      </div>
    </div>
  );
}

export default App;

