from sqlalchemy.orm import Session
from models import Itinerary  # Now matches the class name
from schemas import ItineraryCreate

def create_itinerary(db: Session, itinerary: ItineraryCreate, itinerary_text: str):
    db_itinerary = Itinerary(  # Using Itinerary class
        destination=itinerary.destination,
        days=itinerary.days,
        itinerary_text=itinerary_text
    )
    db.add(db_itinerary)
    db.commit()
    db.refresh(db_itinerary)
    return db_itinerary

def get_itineraries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Itinerary).order_by(Itinerary.created_at.desc()).offset(skip).limit(limit).all()