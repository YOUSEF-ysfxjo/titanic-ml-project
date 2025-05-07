import React, { useState } from 'react';
import './TitanicApp.css'; // استخدم نفس ملف الستايل الجميل

function App() {
  const [passengerId, setPassengerId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/predict?passenger_id=${passengerId}`);

      
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Server not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1>Titanic Survival Predictor</h1>
        <p>ML model predicts survival based on real Titanic data</p>
      </div>
  
      {/* Workflow Steps */}
      <div className="workflow-steps">
        {/* Data Processing */}
        <div className="workflow-card">
          <h3>Data Processing</h3>
          <ul>
            <li>• Clean missing values</li>
            <li>• Encode categories</li>
            <li>• Feature selection</li>
            <li>• Data normalization</li>
          </ul>
        </div>
  
        <div className="arrow">
          <div className="arrow-line">
            <div className="arrow-head"></div>
          </div>
        </div>
  
        {/* Model Training */}
        <div className="workflow-card">
          <h3>Model Training</h3>
          <ul>
            <li>• scikit-learn models</li>
            <li>• Cross-validation</li>
            <li>• Hyperparameter tuning</li>
            <li>• Accuracy: 84.36%</li>
          </ul>
        </div>
  
        <div className="arrow">
          <div className="arrow-line">
            <div className="arrow-head"></div>
          </div>
        </div>
  
        {/* Backend */}
        <div className="workflow-card">
          <h3>Backend (API)</h3>
          <ul>
            <li>• Flask API</li>
            <li>• REST endpoints</li>
            <li>• Model serving</li>
            <li>• Deployed on Render</li>
          </ul>
        </div>
  
        <div className="arrow">
          <div className="arrow-line">
            <div className="arrow-head"></div>
          </div>
        </div>
  
        {/* Frontend */}
        <div className="workflow-card">
          <h3>Frontend</h3>
          <ul>
            <li>• React.js UI</li>
            <li>• User interface</li>
            <li>• API integration</li>
            <li>• Deployed on Vercel</li>
          </ul>
        </div>
      </div>
  
      {/* Demo Section */}
      <div className="demo-preview">
        <h2>Titanic Survival Predictor</h2>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter PassengerId"
            value={passengerId}
            onChange={e => setPassengerId(e.target.value)}
            className="passenger-input"
            required
          />
          <button type="submit" disabled={loading} className="predict-button">
            Predict
          </button>
        </form>
  
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}
  
        {result && (
          <div className="result-container">
            <h3>Prediction Result</h3>
            <div className="result-row">
              <p className="result-label">PassengerId:</p>
              <p>{result.PassengerId}</p>
            </div>
            <div className="result-row">
              <p className="result-label">Survived:</p>
              <p className={result.Survived === 1 ? 'survived' : 'not-survived'}>
                {result.Survived === 1 ? 'Yes' : 'No'}
              </p>
            </div>
            <p className={result.Survived === 1 ? 'result-text survived' : 'result-text not-survived'}>
              Result: {result.Result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
