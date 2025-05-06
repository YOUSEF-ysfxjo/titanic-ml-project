import React, { useState } from 'react';
import './App.css';

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
      const response = await fetch(`http://127.0.0.1:5000/predict?passenger_id=${passengerId}`);
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Something went wrong');
      } else {
        const data = await response.json();
        setResult(data);
      }
    } catch (err) {
      setError('Server not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Titanic Survival Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter PassengerId"
          value={passengerId}
          onChange={e => setPassengerId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Predict</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Prediction Result</h2>
          <p><strong>PassengerId:</strong> {result.PassengerId}</p>
          <p><strong>Survived:</strong> {result.Survived === 1 ? 'Yes' : 'No'}</p>
          <p><strong>Result:</strong> {result.Result}</p>
        </div>
      )}
    </div>
  );
}

export default App;