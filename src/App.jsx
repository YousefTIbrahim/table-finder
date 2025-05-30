import { useState } from 'react';
import { guests } from './data/guestsList';
import { tablePositions } from './data/tablePositions';
import Fuse from 'fuse.js';


import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import './styles/App.css';



function App() {
  const [query, setQuery] = useState('');
  const [matchingGuests, setMatchingGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);


// const handleSearch = (input) => {
//   const lowered = input.toLowerCase().trim();
//   setQuery(input);

//   if (!lowered) {
//     setMatchingGuests([]);
//     setSelectedGuest(null);
//     return;
//   }

//   const matches = guests.filter(guest =>
//     guest.name.toLowerCase().startsWith(lowered)
//   );
//   setMatchingGuests(matches);
//   setSelectedGuest(null);
// };
const fuse = new Fuse(guests, {
  keys: ['name'],
  threshold: 0.35,            // allow slightly looser matches
  ignoreLocation: true,      // don't penalize for being out of order
  includeScore: true,        // optional, helps debugging/weighting
  useExtendedSearch: true,   // enables smart multi-word behavior
});


const handleSearch = (input) => {
   setQuery(input);

  if (!input.trim()) {
    setMatchingGuests([]);
    setSelectedGuest(null);
    return;
  }

  const results = fuse.search(input.trim());
  const matches = results.map(r => r.item); // extract the actual guest objects

  setMatchingGuests(matches);
  setSelectedGuest(null);
};







  // const lowered = input.toLowerCase();

  // // Find the first match (can later add fuzzy/multi-match support)
  // const match = guests.find(guest =>
  //   guest.name.toLowerCase().includes(lowered)
  // );

  // if (match) {
  //   const tableGroup = guests.filter(g => g.table === match.table);
  //   setMatchedGuest({ guest: match, group: tableGroup });
  // } else {
  //   setMatchedGuest(null);
  // }
const handleSelectGuest = (guest) => {
  const group = guests.filter(g => g.table === guest.table);
  setSelectedGuest({ guest, group });
  setMatchingGuests([]);
  setQuery(guest.name);
};


  // return (
  //   <div className="App-container">
  //     <div className="overlay">
  //       <h1 className="text-center mb-4">Find Your Table</h1>
  //       <SearchBar query={query} onSearch={handleSearch} />
  //       <ResultCard guest={selectedGuest} />
  //     <img
  //       src={`${process.env.PUBLIC_URL}/WeddingMap.jpg`}
  //       alt="Table Map Loading"
  //       className="table-map-img mt-4"
  //     />
  //     </div>
  //   </div>
  // );
return (
  <div className="App-container">
    <div className="overlay">
      <h1 className="text-center mb-4">Find Your Table</h1>

      <div className="px-3 w-100" style={{ maxWidth: '100%', margin: '0 auto' }}>
        {/* Search Input */}
        <SearchBar query={query} onSearch={handleSearch} />

        {/* Matching guests list */}
        {matchingGuests.length > 0 && !selectedGuest && (
          <div className="mt-3">
            <p className="text-center">Please select your name:</p>
            <div className="list-group">
              {matchingGuests.map((guest) => (
                <button
                  key={guest.id}
                  onClick={() => handleSelectGuest(guest)}
                  className="match-button"
                >
                  {guest.name} — Table {guest.table}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result display */}
        <ResultCard guest={selectedGuest} />

        {/* Map image */}
        <div className="map-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/WeddingMapFinal.jpg`}
            alt="Table Map"
            className="map-image"
          />
          {selectedGuest && (
            <div
              className="map-pin"
              style={{
                top: tablePositions[selectedGuest.guest.table].top,
                left: tablePositions[selectedGuest.guest.table].left
              }}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);




}

export default App;

