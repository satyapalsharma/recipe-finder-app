import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import * as recipeService from '../api/recipeService'; // Import all exports from recipeService
import '../App.css'; // Assuming global styles or a specific HomePage.css for layout

/**
 * HomePage Component
 *
 * This component serves as the main landing page for the Recipe Finder App.
 * It allows users to search for recipes, displays a list of results,
 * and handles loading and error states.
 */
const HomePage = () => {
  // State to store the list of recipes fetched from the API
  const [recipes, setRecipes] = useState([]);
  // State to manage