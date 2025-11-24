from pydantic import BaseModel

class DishBase(BaseModel):
    dishName: str
    imageUrl: str
    isPublished: bool

class DishCreate(DishBase):
    pass

class Dish(DishBase):
    dishId: int
    class Config:
        orm_mode = True
