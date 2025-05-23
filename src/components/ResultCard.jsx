import React from 'react';

function ResultCard({ guest }) {
  if (!guest) return null;

  return (
    <div className="mt-4 alert alert-success text-center">
      <h5>Welcome {guest.guest.name}! 🎉</h5>

      <h4 className="mb-3">You're at Table {guest.guest.table}</h4>
      <p>Seated with:</p>
      <ul className="list-unstyled">
        {guest.group.map((g, index) => (
          <li key={index}>
            {g.name === guest.guest.name ? <strong>{g.name}</strong> : g.name}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ResultCard;
