import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header style={{ border: "1px solid red" }}>
        <img src="logo" alt="" />
      </header>

      <div className="hero">
        <h1>{data.restaurant.name}</h1>,<p>{data.restaurant.description}</p>,
        <img width="200" src={data.restaurant.picture} alt="" />
      </div>

      <div className="categories-list">
        {data.categories.map((category, index) => (
          <div key={index} className="category-item">
            {category.name}
            <ul className="meals-list">
              {category.meals.map((meal, index) => (
                <div key={index} className="meal-item">
                  {meal.title} {meal.description} {meal.price} €
                  {meal.picture && (
                    <img
                      width="200"
                      className="meal-picture"
                      src={meal.picture}
                      alt="meal-picture"
                    />
                  )}
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
