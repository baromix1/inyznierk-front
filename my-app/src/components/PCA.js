import React from 'react';
import '../styles/pca.css';

export default function PCA() {
  return (
    <div className="pca-container">
      <h2>PCA</h2>
      <img src="http://localhost:8000/download/pca_plot_with_groups.png" alt="PCA Plot" />
      <img src="http://localhost:8000/download/explained_variance.png" alt="Explained Variance" />
    </div>
  );
}
