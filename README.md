# ✈️ AI Travel Itinerary Planner

A full-stack web application that generates personalized travel itineraries using AI. Users can input a destination and number of days to receive a custom day-by-day plan. The application also stores and displays previous itinerary requests.

---

## ✨ Features

- 🗺️ **Itinerary Generation** – Create personalized travel plans for any destination  
- 📅 **Day-by-Day Planning** – Detailed daily schedules with activities and meal suggestions  
- 📚 **History Tracking** – View and revisit past itinerary requests  
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile  
- 🔐 **Secure API Integration** – Protects API keys and sensitive data  
- 📁 **PDF Export** – Save itineraries as PDF files *(bonus feature)*  

---

## 🛠️ Technologies Used

### Backend
- Python with **FastAPI**
- **SQLAlchemy** ORM
- **Alembic** for database migrations
- **SQLite** (default) or **PostgreSQL**
- **Hugging Face Inference API** for AI itinerary generation
- **Pydantic** for data validation

### Frontend
- **React.js** (with functional components and hooks)
- **React Router** for navigation
- **Axios** for API communication
- **CSS** with responsive design
- **Vite** build tool *(or CRA optional)*

---

## 🚀 Getting Started

### ✅ Prerequisites
- Python `3.8+`
- Node.js `16+`
- npm `8+`

---

## 🔧 Installation

### 🖥 Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/ai-travel-itinerary-planner.git
cd ai-travel-itinerary-planner/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your Hugging Face API key

```

### 🌐 Frontend Setup
```bash
cd ../frontend

# Install frontend dependencies
npm install

# Create .env file
cp .env.example .env
# Then edit .env to include:
# REACT_APP_API_URL=http://localhost:8000
```

### Configuration
- Create .env files in both backend and frontend directories:

### Backend (.env)
```bash
DATABASE_URL=sqlite:///./backend.db
HF_API_KEY=your_hugging_face_api_key
```

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:8000
```

### Project Structure
```bash
ai-travel-itinerary-planner/
├── backend/
│   ├── app/                  # FastAPI application
│   │   ├── main.py           # FastAPI entry point
│   │   ├── database.py       # Database configuration
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic models
│   │   ├── crud.py           # Database operations
│   │   └── llm.py            # AI integration
│   ├── alembic/              # Database migrations
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ItineraryForm.jsx
│   │   │   ├── ItineraryList.jsx
│   │   │   └── ItineraryDetail.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── App.js            # Main application component
│   │   ├── App.css           # Global styles
│   │   └── index.js          # Entry point
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── .env                  # Frontend environment variables
├── .gitignore
└── README.md
```
