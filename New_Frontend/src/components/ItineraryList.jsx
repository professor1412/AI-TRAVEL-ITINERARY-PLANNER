import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItineraries } from '../services/api';

export default function ItineraryList() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getItineraries();
        setItineraries(data);
      } catch (err) {
        setError(err.message || 'Failed to load travel history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter and sort itineraries
  const filteredItineraries = itineraries
  .filter(itinerary => 
    {itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase())})
  .sort((a, b) => {
    const dateA = new Date(a.created_at || a.timestamp);
    const dateB = new Date(b.created_at || b.timestamp);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        // Add your delete API call here
        // await deleteItinerary(id);
        setItineraries(itineraries.filter(it => it.id !== id));
      } catch (err) {
        setError('Failed to delete itinerary');
      }
    }
  };

  if (loading) return <div className="app-container"><div className="loading">Loading travel history</div></div>;
  if (error) return <div className="app-container"><div className="error">{error}</div></div>;

  return (
    <div className="app-container">
      <div className="itinerary-list">
        <div className="list-header">
          <h2>Travel History</h2>
          
          <div className="controls">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="secondary" onClick={() => navigate('/')}>
            ← Back to Planner
          </button>
          <button className="primary" onClick={() => navigate('/')}>
            + Create New Itinerary
          </button>
        </div>
        
        {filteredItineraries.length === 0 ? (
          <div className="empty-state">
            <p>No itineraries found</p>
            {searchTerm && (
              <button 
                className="secondary" 
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="itinerary-grid">
            {filteredItineraries.map((it) => (
              <div 
                key={it.id} 
                className="itinerary-card"
                onClick={() => navigate(`/itinerary/${it.id}`)}
              >
                <div className="card-header">
                  <h3>{it.destination}</h3>
                  <span className="days-badge">{it.days} days</span>
                </div>
                
                <p className="timestamp">
                  {new Date(it.created_at || it.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                
                <div className="card-preview">
                  {it.itinerary_text && it.itinerary_text.split('\n').slice(0, 3).map((line, i) => (
                    <p key={i} className="preview-line">{line}</p>
                  ))}
                </div>
                
                <div className="card-actions">
                  <button 
                    className="view-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/itinerary/${it.id}`);
                    }}
                  >
                    View Details
                  </button>
                  <button 
                    className="delete-button"
                    onClick={(e) => handleDelete(it.id, e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}