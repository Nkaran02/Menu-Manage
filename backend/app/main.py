# from fastapi import FastAPI, Depends, WebSocket
# from sqlalchemy.orm import Session
# from fastapi.middleware.cors import CORSMiddleware
# from . import models, schemas, crud, database

# models.Base.metadata.create_all(bind=database.engine)

# app = FastAPI()

# # CORS for React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Dependency
# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # REST APIs
# @app.get("/dishes", response_model=list[schemas.Dish])
# def read_dishes(db: Session = Depends(get_db)):
#     return crud.get_dishes(db)

# @app.post("/dishes/{dish_id}/toggle", response_model=schemas.Dish)
# def toggle_dish(dish_id: int, db: Session = Depends(get_db)):
#     return crud.toggle_dish_status(db, dish_id)

# # WebSocket for real-time
# clients = []

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     clients.append(websocket)
#     try:
#         while True:
#             await websocket.receive_text()  # keep connection alive
#     except:
#         clients.remove(websocket)



from fastapi import FastAPI, Depends
from fastapi.websockets import WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import json

from . import models, schemas, crud, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Session Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------ REST APIs ------------
@app.get("/dishes", response_model=list[schemas.Dish])
def read_dishes(db: Session = Depends(get_db)):
    return crud.get_dishes(db)


@app.post("/dishes/{dish_id}/toggle", response_model=schemas.Dish)
async def toggle_dish(dish_id: int, db: Session = Depends(get_db)):
    dish = crud.toggle_dish_status(db, dish_id)  # update DB
    await broadcast_update()  # notify frontend via WebSocket
    return dish


# ------------ WebSocket for Realtime Updates ------------
clients = []  # connected clients list

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        while True:
            await ws.receive_text()  # keep connection alive
    except WebSocketDisconnect:
        clients.remove(ws)


async def broadcast_update():
    """Send update message to all connected WebSocket clients"""
    for client in clients:
        try:
            await client.send_text("update")
        except:
            clients.remove(client)


# ------------ Seed Database on Startup ------------

# ------------ Seed Database on Startup ------------
@app.on_event("startup")
def seed_data():
    print("🚀 Startup event triggered")
    db = database.SessionLocal()

    try:
        print("⏳ Checking existing data...")
        with open("app/sample_data.json") as f:   # ensure this file exists
            sample_data = json.load(f)

        # Get existing dish names from DB
        existing_names = {
            row[0] for row in db.execute(text("SELECT dishName FROM dishes")).fetchall()
        }

        added_count = 0

        # Insert only NEW dishes
        for dish in sample_data:
            if dish["dishName"] not in existing_names:
                db.execute(
                    text("""
                    INSERT INTO dishes (dishName, imageUrl, isPublished)
                    VALUES (:dishName, :imageUrl, :isPublished)
                    """),
                    {
                        "dishName": dish["dishName"],
                        "imageUrl": dish["imageUrl"],
                        "isPublished": dish["isPublished"],
                    }
                )
                added_count += 1

        db.commit()

        if added_count > 0:
            print(f"🌱 Added {added_count} new dishes.")
        else:
            print("📌 All dishes already exist — nothing added.")
    except Exception as e:
        print("❌ ERROR inserting sample data:", e)
    finally:
        db.close()
