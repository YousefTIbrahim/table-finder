import React from 'react';

function ResultCard({ guest }) {
  if (!guest) return null;

  return (
    <div className="mt-4 alert alert-success text-center">
      <h4 className="mb-2">Welcome, {guest.name}!</h4>
      <p>You’re at <strong>Table {guest.table}</strong> 🎉</p>
    </div>
  );
}

export default ResultCard;
