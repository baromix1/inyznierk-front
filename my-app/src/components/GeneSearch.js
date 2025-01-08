import React, { useState } from 'react';

function GeneSearch() {
  const [gene, setGene] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setStats(null);
    try {
      const response = await fetch(`http://localhost:8000/gene_statistics/?gene=${gene}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Gene Search</h2>
      <input
        type="text"
        placeholder="Enter gene name"
        value={gene}
        onChange={(e) => setGene(e.target.value)}
        style={{ padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 15px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
        Search
      </button>

      {error && <div>Error: {error}</div>}
      {stats && (
        <div style={{ marginTop: '20px' }}>
          <h3>Statistics for {gene}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '10px' }}>Group</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Mean</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Median</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Std Dev</th>
                <th style={{ border: '1px solid black', padding: '10px' }}>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '10px' }}>Healthy</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.healthy.mean}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.healthy.median}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.healthy.std_dev}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.healthy.count}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '10px' }}>Sick</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.sick.mean}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.sick.median}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.sick.std_dev}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{stats.sick.count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GeneSearch;
