import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItinerary } from '../services/api';

export default function ItineraryForm({ onSuccess }) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createItinerary({ destination, days });
      onSuccess(result);
      navigate(`/itinerary/${result.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {loading && <div className="loading">Generating your itinerary</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="Enter a city, country, or region"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Number of Days:</label>
          <input
            type="number"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 1)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="primary"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Create Itinerary'}
          </button>

          <button 
            type="button" 
            className="secondary"
            onClick={() => navigate('/history')}
            disabled={loading}
          >
            View History
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}