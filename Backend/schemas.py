from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ItineraryCreate(BaseModel):
    destination: str
    days: int

class ItineraryResponse(ItineraryCreate):
    id: int
    itinerary_text: str  # Changed from 'itinerary' to match your model
    timestamp: datetime

    class Config:
        orm_mode = True
        from_attributes = True  # For Pydantic v2 compatibility