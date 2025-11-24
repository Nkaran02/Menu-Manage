// import React from "react";

// export default function DishCard({ dish, onToggle }) {
//     return (
//         <div className="dish-card">
//             <img src={dish.imageUrl} alt={dish.dishName} width={150} />
//             <h3>{dish.dishName}</h3>
//             <button onClick={() => onToggle(dish.dishId)}>
//                 {dish.isPublished ? "Unpublish" : "Publish"}
//             </button>
//         </div>
//     );
// }

// import React from "react";

// function DishCard({ dish, onToggle }) {
//   return (
//     <div className="dish-card">
//       <img src={dish.imageUrl} alt={dish.dishName} className="dish-img" />

//       <h3 className="dish-name">{dish.dishName}</h3>

//       <span
//         className={`badge ${dish.isPublished ? "published" : "unpublished"}`}
//       >
//         {dish.isPublished ? "✔ Published" : "✖ Hidden"}
//       </span>

//       <button
//         className="publish-btn"
//         onClick={() => onToggle(dish.dishId)}
//         style={{
//           backgroundColor: dish.isPublished ? "#b33a3a" : "#3a7b52",
//         }}
//       >
//         {dish.isPublished ? "Unpublish" : "Publish"}
//       </button>
//     </div>
//   );
// }

// export default DishCard;


// import React from "react";

// function DishCard({ dish, onToggle }) {
//   return (
//     <div className="dish-card">
//       <img src={dish.imageUrl} alt={dish.dishName} className="dish-img" />

//       <h3 className="dish-name">{dish.dishName}</h3>

//       <button
//         className="publish-btn"
//         onClick={() => onToggle(dish.dishId)}
//         style={{
//           backgroundColor: dish.isPublished ? "#b33a3a" : "#3a7b52",
//         }}
//       >
//         {dish.isPublished ? "Unpublish" : "Publish"}
//       </button>
//     </div>
//   );
// }

// export default DishCard;


import React from "react";

function DishCard({ dish, onToggle }) {
  return (
    <div className="dish-card">
      <img src={dish.imageUrl} alt={dish.dishName} className="dish-img" />

      <h3 className="dish-name">{dish.dishName}</h3>

      <button
        className="publish-btn"
        onClick={() => onToggle(dish.dishId)}
        style={{
          backgroundColor: dish.isPublished ? "#b33a3a" : "#3a7b52",
        }}
      >
        {dish.isPublished ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
}

export default DishCard;
