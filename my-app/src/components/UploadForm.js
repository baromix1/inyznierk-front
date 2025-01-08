import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UploadForm.css';
import { useNavigate } from 'react-router-dom';

function UploadForm() {
  const navigate = useNavigate();
  const [genesInfo, setGenesInfo] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [sampleInfo, setSampleInfo] = useState(null);
  const [correctionMethod, setCorrectionMethod] = useState('bonferroni');
  const [alpha, setAlpha] = useState(0.05);
  const [logFCCutoff, setLogFCCutoff] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false); // Wskaźnik ładowania

  // Odtwórz dane tekstowe z localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setCorrectionMethod(savedData.correctionMethod || 'bonferroni');
      setAlpha(savedData.alpha || 0.05);
      setLogFCCutoff(savedData.logFCCutoff || 0.0);
    }
  }, []);

  // Zapisuj dane tekstowe do localStorage
  useEffect(() => {
    const formData = {
      correctionMethod,
      alpha,
      logFCCutoff,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [correctionMethod, alpha, logFCCutoff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Wskaźnik ładowania na true

    const formData = new FormData();
    formData.append('genes_info', genesInfo);
    formData.append('data_file', dataFile);
    formData.append('sample_info', sampleInfo);
    formData.append('correction_method', correctionMethod);
    formData.append('alpha', alpha);
    formData.append('logFC_cutoff', logFCCutoff);

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData);
      if (response.status === 200) {
        alert('Pliki zostały przesłane i przetworzone!');
        navigate('/results');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas przesyłania danych.');
    } finally {
      setIsLoading(false); // Wskaźnik ładowania na false
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2>Upload Data</h2>
      {isLoading && <div className="loading-indicator">Przetwarzanie danych...</div>}
      <div className="form-group">
        <label>Plik z informacjami o genach:</label>
        <input
          type="file"
          onChange={(e) => setGenesInfo(e.target.files[0])}
          disabled={isLoading}
        />
        {genesInfo && <p>Wybrany plik: {genesInfo.name}</p>}
      </div>
      <div className="form-group">
        <label>Plik z danymi:</label>
        <input
          type="file"
          onChange={(e) => setDataFile(e.target.files[0])}
          disabled={isLoading}
        />
        {dataFile && <p>Wybrany plik: {dataFile.name}</p>}
      </div>
      <div className="form-group">
        <label>Plik z informacjami o próbkach:</label>
        <input
          type="file"
          onChange={(e) => setSampleInfo(e.target.files[0])}
          disabled={isLoading}
        />
        {sampleInfo && <p>Wybrany plik: {sampleInfo.name}</p>}
      </div>
      <div className="form-group">
        <label>Metoda korekcji:</label>
        <select
          value={correctionMethod}
          onChange={(e) => setCorrectionMethod(e.target.value)}
          disabled={isLoading}
        >
          <option value="bonferroni">Bonferroni</option>
          <option value="benjamini-hochberg">Benjamini-Hochberg</option>
        </select>
      </div>
      <div className="form-group">
        <label>Alpha:</label>
        <input
          type="number"
          step="0.01"
          value={alpha}
          onChange={(e) => setAlpha(Number(e.target.value))}
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label>LogFC Cutoff:</label>
        <input
          type="number"
          step="0.01"
          value={logFCCutoff}
          onChange={(e) => setLogFCCutoff(Number(e.target.value))}
          disabled={isLoading}
        />
      </div>
      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Przesyłanie...' : 'Prześlij'}
      </button>
    </form>
  );
}

export default UploadForm;
