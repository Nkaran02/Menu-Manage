import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchDishes = () => axios.get(`${API_URL}/dishes`);
export const toggleDish = (dishId) => axios.post(`${API_URL}/dishes/${dishId}/toggle`);
