import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CSVViewer.css';

function CSVViewer() {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Aktualna strona
  const rowsPerPage = 50; // Liczba wierszy na stronę

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/download/sorted_results_with_correction.csv');
        const csvText = response.data;

        // Podziel dane CSV na wiersze
        const rows = csvText.split('\n');
        setCsvData(rows);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CSV:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTable = () => {
    if (csvData.length === 0) {
      return <p>Brak danych do wyświetlenia</p>;
    }

    const headers = csvData[0].split(','); // Nagłówki tabeli
    const startRow = currentPage * rowsPerPage + 1; // Pomijamy nagłówek
    const endRow = startRow + rowsPerPage;
    const rows = csvData.slice(startRow, endRow); // Wyświetlane wiersze

    return (
      <div>
        <table className="csv-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const columns = row.split(',');
              return (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{column}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Poprzednie
          </button>
          <span>Strona {currentPage + 1}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.floor(csvData.length / rowsPerPage) - 1 ? prev + 1 : prev
              )
            }
            disabled={startRow + rowsPerPage >= csvData.length}
          >
            Następne
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="csv-viewer">
      <h2>CSV Viewer</h2>
      {loading ? <p>Ładowanie danych...</p> : renderTable()}
    </div>
  );
}

export default CSVViewer;
