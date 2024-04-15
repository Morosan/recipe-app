import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/button";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          // `https://recipe-app-backend-ggcu.onrender.com/recipes/${id}`
          `http://localhost:3001/recipes/${id}`
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const storedIngredients = JSON.parse(localStorage.getItem(`selectedIngredients_${id}`)) || {};
    setSelectedIngredients(prevIngredients => {
      // Merge storedIngredients with previous selectedIngredients
      return { ...prevIngredients, ...storedIngredients };
    });
  }, [id]);

  const handleCheckboxChange = (ingredient) => {
    const updatedSelectedIngredients = { ...selectedIngredients };
    updatedSelectedIngredients[ingredient] = !selectedIngredients[ingredient];
    setSelectedIngredients(updatedSelectedIngredients);
    localStorage.setItem(`selectedIngredients_${id}`, JSON.stringify(updatedSelectedIngredients));
  };

  const handleClearIngredients = () => {
    setSelectedIngredients({});
    localStorage.removeItem(`selectedIngredients_${id}`);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  if (loading) {
    return <section className="container mb-5">Loading...</section>;
  }

  if (!recipe) {
    return <section className="container mb-5">Recipe not found!</section>;
  }

  return (
    <section className="container mb-5">
      <div className="receip-detail-hero">
        <div className="row">
          <div className="col-md-6">
            <div href="/" className="img-wrapper mb-5">
              <img className="img-responsive" src={recipe.imageUrl} alt={recipe.name} />
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="main-heading mb-5">{recipe.name}</h1>
            <div className="cooking-time-wrapper mb-3">
              <i className="bi bi-alarm-fill"></i>
              <span>Cooking Time: {recipe.cookingTime} minutes</span>
            </div>
            {recipe.description && (
              <div className="recipe-description-wrapper mb-5">
                <h3 className="sub-heading mb-3">Description:</h3>
                <p>{recipe.description}</p>
              </div>
            )}
            <div className="ingredients-wrapper mb-5">
              <h3 className="sub-heading mb-3">Ingredients:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedIngredients[ingredient]}
                      onChange={() => handleCheckboxChange(ingredient)}
                      id={`ingredient_${index}`}
                    />
                    <label className="form-check-label" htmlFor={`ingredient_${index}`}>
                      {ingredient}
                    </label>
                  </li>
                ))}
              </ul>
              <Button 
                className="button secondary" 
                type="button"
                onClick={handleClearIngredients}
              >
                Uncheck All
              </Button>
            </div>
            <div className="instructions-wrapper">
              <h3 className="sub-heading mb-3">Instructions:</h3>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipe;
