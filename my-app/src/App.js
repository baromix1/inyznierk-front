import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import Tabs from './components/Tabs';

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', margin: '20px' }}>Analiza danych genowych</h1>
        <Routes>
          <Route path="/form" element={<UploadForm />} />
          <Route path="/results/*" element={<Tabs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
