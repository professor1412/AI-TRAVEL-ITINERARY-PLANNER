import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItinerary } from '../services/api';

export default function ItineraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getItinerary(id);
        if (isMounted) {
          setItinerary(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load itinerary details');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [id]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (loading) return (
    <div className="app-container">
      <div className="loading">Loading itinerary details</div>
    </div>
  );
  
  if (error) return (
    <div className="app-container">
      <div className="error">{error}</div>
      <button className="secondary" onClick={() => navigate('/history')}>
        ← Back to History
      </button>
    </div>
  );
  
  if (!itinerary) return (
    <div className="app-container">
      <div className="error">Itinerary not found</div>
      <button className="secondary" onClick={() => navigate('/history')}>
        ← Back to History
      </button>
    </div>
  );

  // Function to format the itinerary text with day headings
  const formatItineraryText = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      if (line.match(/day \d+/i)) {
        return <h3 key={index} className="day-heading">{line}</h3>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="app-container">
      <div className="itinerary-detail">
        <div className="itinerary-header">
          <h2>{itinerary.destination} Itinerary ({itinerary.days} days)</h2>
          <p className="timestamp">
            Created: {new Date(itinerary.created_at || itinerary.timestamp).toLocaleString()}
          </p>
        </div>
        
        <div className="itinerary-content">
          {itinerary.itinerary_text ? (
            <>
              {expanded ? (
                <div className="full-itinerary">
                  {formatItineraryText(itinerary.itinerary_text)}
                </div>
              ) : (
                <div className="itinerary-preview">
                  {formatItineraryText(itinerary.itinerary_text.split('\n').slice(0, 10).join('\n'))}
                  <button className="expand-button" onClick={toggleExpand}>
                    Show Full Itinerary ↓
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No itinerary details available</p>
          )}
        </div>
        
        <div className="action-buttons">
          <button className="secondary" onClick={() => navigate('/history')}>
            ← Back to History
          </button>
          <button className="primary" onClick={() => navigate('/')}>
            Create New Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}