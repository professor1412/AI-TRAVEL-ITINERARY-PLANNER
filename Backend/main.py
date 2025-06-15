from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, engine
from models import Base, Itinerary 
from schemas import ItineraryCreate, ItineraryResponse  # Lowercase 'schemas'
from crud import create_itinerary, get_itineraries
from llm import generate_itinerary

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/itinerary/", response_model=ItineraryResponse)
def create_itinerary_endpoint(
    itinerary: ItineraryCreate, 
    db: Session = Depends(get_db)
):
    if itinerary.days < 1:
        raise HTTPException(status_code=400, detail="Days must be at least 1")
    
    try:
        itinerary_text = generate_itinerary(itinerary.destination, itinerary.days)
        return create_itinerary(db, itinerary, itinerary_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history/", response_model=List[ItineraryResponse])
def read_itineraries(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    return get_itineraries(db, skip=skip, limit=limit)