const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const createItinerary = async (data) => {
  const response = await fetch(`${API_URL}/api/itinerary/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create itinerary');
  }
  return await response.json();
};

export const getItineraries = async () => {
  const response = await fetch(`${API_URL}/api/history/`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return await response.json();
};

export const getItinerary = async (id) => {
  const response = await fetch(`${API_URL}/api/history/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch itinerary');
  }
  return await response.json();
};