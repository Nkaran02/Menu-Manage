// import React from "react";
// import DishList from "./components/DishList";

// function App() {
//     return (
//         <div className="App">
//             <h1>Dish Dashboard</h1>
//             <DishList />
//         </div>
//     );
// }

// export default App;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DishCard from "./components/DishCard";
// import "./styles.css";
// import toast, { Toaster } from "react-hot-toast";

// function App() {
//   const [dishes, setDishes] = useState([]);

//   const fetchDishes = async () => {
//     const response = await axios.get("http://127.0.0.1:8000/dishes");
//     setDishes(response.data);
//   };

//   const togglePublish = async (id) => {
//     await axios.post(`http://127.0.0.1:8000/dishes/${id}/toggle`);
//     toast.success("Dish updated!");
//     fetchDishes();
//   };

//   useEffect(() => {
//     fetchDishes();
//   }, []);

//   return (
//     <div className="main-container">
//       <h1 className="heading">🍽 Restaurant Dish Dashboard</h1>

//         <div className="dish-scroll-container">
//             {dishes.map((dish) => (
//                 <div className="dish-card" key={dish.id}>
//                 <img src={dish.imageUrl} alt={dish.dishName} className="dish-image" />
//                 <h2 className="dish-name">{dish.dishName}</h2>
//                 <button
//                     className={`toggle-btn ${dish.isPublished ? "published" : "unpublished"}`}
//                     onClick={() => handleToggle(dish.id)}
//                 >
//                     {dish.isPublished ? "Unpublish" : "Publish"}
//                 </button>
//                 </div>
//             ))}
//         </div>


//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "./components/DishCard";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    const response = await axios.get("http://127.0.0.1:8000/dishes");
    setDishes(response.data);
  };

  const togglePublish = async (dishId) => {
    await axios.post(`http://127.0.0.1:8000/dishes/${dishId}/toggle`);
    toast.success("Status updated!");
    fetchDishes();
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="main-container">
      <h1 className="heading">🍽 Restaurant Dish Dashboard</h1>

      <div className="dish-scroll-container">
        {dishes.map((dish) => (
          <DishCard key={dish.dishId} dish={dish} onToggle={togglePublish} />
        ))}
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
