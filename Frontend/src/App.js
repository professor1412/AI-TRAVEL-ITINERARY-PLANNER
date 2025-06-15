// src/App.js
import { Routes, Route } from 'react-router-dom'; // Only import Routes and Route
import ItineraryForm from './components/ItineraryForm';
import ItineraryList from './components/ItineraryList';
import ItineraryDetail from './components/ItineraryDetail';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>AI Travel Itinerary Planner</h1>
      <Routes>
        <Route path="/" element={<ItineraryForm />} />
        <Route path="/history" element={<ItineraryList />} />
        <Route path="/itinerary/:id" element={<ItineraryDetail />} />
      </Routes>
    </div>
  );
}

export default App;