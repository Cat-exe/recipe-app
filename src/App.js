import React, {useEffect, useState} from 'react';
import Recipe from './Recipe.js';
import './App.css';

const App = () => {
  const APP_ID = '1e7e6ed7';
  const APP_KEY = 'fbcd28fda095c2cfa410cb736dd39db6';

  const[recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(''); //empty string in state
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  }, [query]);/*array added so effect only runs when the page renders the first time at the beginning*/

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => { //event
    setSearch(e.target.value);    
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch(''); //clears search bar for the next search
  }

  return(
    <div className = "App">
      <form onSubmit={getSearch} className="search-form">
        <input className= "search-bar" type = "text" value={search} onChange={updateSearch}/>
        <button className= "search-button" type="submit">
          Search
        </button>
      </form>

      <div className="recipes">
        {recipes.map(recipe => ( //Recipe component
          <Recipe 
            key = {recipe.recipe.label} //gets rid of warning requiring unique key prop
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>  
    </div>
  );
};

export default App;
