/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { Link } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          // `https://recipe-app-backend-ggcu.onrender.com/recipes/savedRecipes/${userID}`
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);             


  return (
    <section className="container mb-5">
      <h1 className="main-heading mb-5">Saved Recipes:</h1>
      
      <ul className="row">
        {savedRecipes.map((recipe) => (
          <li className="col-lg-4 col-md-6" key={recipe._id}>
            <div className="card">
              <div href="/" className="img-wrapper">
                <img className="card-img" src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div className="card-inner-wrapper">
                <div className="title-wrapper">
                  <Link 
                    to={`/recipe/${recipe._id}`}
                    className="card-title sub-heading"
                  >
                    {recipe.name}
                  </Link>
                </div>
                <div className="paragraph instructions mb-">
                  {recipe.instructions}
                </div>
                <hr />
                <p className="paragraph">Cooking Time: {recipe.cookingTime} minutes</p>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </section>

    // <section className="container mb-5">
    //   <h1 className="main-heading">Saved Recipes:</h1>
    //   <ul>
    //     {savedRecipes.map((recipe) => (
    //       <li key={recipe._id}>
    //         <div>
    //           <h2>{recipe.name}</h2>
    //         </div>
    //         <ul>
    //           {recipe.ingredients.map((ingredient) => (
    //             <li key={ingredient._id}>
    //               <p>{ingredient}</p>
    //             </li>
    //           ))}
    //         </ul>
    //         <p>{recipe.description}</p>
    //         <img src={recipe.imageUrl} alt={recipe.name} />
    //         <p>Cooking Time: {recipe.cookingTime} minutes</p>
    //       </li>
    //     ))}
    //   </ul>
    // </section>
  );
};