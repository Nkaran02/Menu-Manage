from sqlalchemy.orm import Session
from . import models, schemas

def get_dishes(db: Session):
    return db.query(models.Dish).all()

# def toggle_dish_status(db: Session, dish_id: int):
#     dish = db.query(models.Dish).filter(models.Dish.dishId == dish_id).first()
#     if dish:
#         dish.isPublished = not dish.isPublished
#         db.commit()
#         db.refresh(dish)
#     return dish

def toggle_dish_status(db: Session, dish_id: int):
    dish = db.query(models.Dish).filter(models.Dish.dishId == dish_id).first()
    dish.isPublished = not dish.isPublished
    db.commit()
    db.refresh(dish)
    return dish
