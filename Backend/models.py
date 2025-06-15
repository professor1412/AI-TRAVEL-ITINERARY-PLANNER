from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from database import Base  

class Itinerary(Base):  # Changed from Request to Itinerary
    __tablename__ = "itineraries"  # Changed table name
    
    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String(100), index=True, nullable=False)  
    days = Column(Integer, nullable=False)  
    itinerary_text = Column(Text, nullable=False) 
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True) 

    def __repr__(self):
        return f"<Itinerary(id={self.id}, destination='{self.destination}', days={self.days})>"