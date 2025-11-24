import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { fetchDishes, toggleDish } from "../services/api";

export default function DishList() {
    const [dishes, setDishes] = useState([]);

    const loadDishes = async () => {
        const res = await fetchDishes();
        setDishes(res.data);
    };

    const handleToggle = async (dishId) => {
        await toggleDish(dishId);
        loadDishes();
    };

    useEffect(() => { 
        loadDishes();
        const ws = new WebSocket("ws://localhost:8000/ws");
        ws.onmessage = () => loadDishes();
        return () => ws.close();
    }, []);


    return (
        <div>
            {dishes.map(dish => (
                <DishCard key={dish.dishId} dish={dish} onToggle={handleToggle} />
            ))}
        </div>
    );
}
