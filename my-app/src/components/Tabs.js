import React from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import PCA from './PCA';
import Volcano from './Volcano';
import BoxPlot from './BoxPlot';
import Heatmap from './Heatmap';
import CSVViewer from './CSVViewer';
import GeneSearch from './GeneSearch';
import '../styles/Tabs.css';
import axios from 'axios';

function Tabs() {
  const navigate = useNavigate();

  const handleBackToForm = () => {
    navigate('/form'); // Zakładam, że formularz znajduje się pod ścieżką "/form"
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get('http://localhost:8000/generate-report/', {
        responseType: 'blob', // Pobierz plik jako binarny
      });

      // Tworzenie linku do pobrania
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'raport.pdf'); // Ustaw nazwę pliku
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:8000/download-csv/', {
        responseType: 'blob', // Pobierz plik jako binarny
      });

      // Tworzenie linku do pobrania
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pełny_plik.csv'); // Ustaw nazwę pliku
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div>
      {/* Jeden wiersz dla wszystkich przycisków i zakładek */}
      <div className="tabs-header">
        <div className="button-nav-group">
          <div class="button-nav-group-action">
          
          <button onClick={handleBackToForm} className="action-button">
            Powrót do Formularza
          </button>
          <div class="report-buttons">
          <button onClick={handleDownloadPDF} className="action-button">
            Pobierz Raport PDF
          </button>
          <button onClick={handleDownloadCSV} className="action-button">
            Pobierz Pełny CSV
          </button>
          </div>
          </div>
          <nav className="tabs-nav">
            <ul>
              <li>
                <NavLink to="/results/pca" className={({ isActive }) => (isActive ? 'active' : '')}>PCA</NavLink>
              </li>
              <li>
                <NavLink to="/results/volcano" className={({ isActive }) => (isActive ? 'active' : '')}>Volcano Plot</NavLink>
              </li>
              <li>
                <NavLink to="/results/boxplot" className={({ isActive }) => (isActive ? 'active' : '')}>Box Plot</NavLink>
              </li>
              <li>
                <NavLink to="/results/heatmap" className={({ isActive }) => (isActive ? 'active' : '')}>Heatmap</NavLink>
              </li>
              <li>
                <NavLink to="/results/csv" className={({ isActive }) => (isActive ? 'active' : '')}>CSV Viewer</NavLink>
              </li>
              <li>
                <NavLink to="/results/search" className={({ isActive }) => (isActive ? 'active' : '')}>Gene Search</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Zawartość zakładek */}
      <div className="tab-content">
        <Routes>
          <Route path="pca" element={<PCA />} />
          <Route path="volcano" element={<Volcano />} />
          <Route path="boxplot" element={<BoxPlot />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="csv" element={<CSVViewer />} />
          <Route path="search" element={<GeneSearch />} />
        </Routes>
      </div>
    </div>
  );
}

export default Tabs;
