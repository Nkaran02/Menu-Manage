from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Dish(Base):
    __tablename__ = "dishes"
    dishId = Column(Integer, primary_key=True, index=True)
    dishName = Column(String(255), nullable=False)
    imageUrl = Column(String(1000))
    isPublished = Column(Boolean, default=False)
