import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeDetails } from '../api/recipeService';
import { addFavoriteRecipe, removeFavoriteRecipe, isRecipeFavorite } from '../utils/localStorage';
import '../App.css'; // Assuming global styles are in App.css for consistency

/**
 * RecipeDetailPage Component
 * Displays detailed information for a single recipe, fetched from an external API.
 * Users can view ingredients, instructions, and other details.
 * It also provides functionality to add or remove the recipe from local favorites.
 */
const RecipeDetailPage = () => {
  // Get the recipe ID from the URL parameters (e.g., /recipes/:id)
  const { id } = useParams();
  // Hook for programmatic navigation, useful for 'Back' buttons or redirects
  const navigate = useNavigate();

  // State to store the fetched recipe details
  const [recipe, setRecipe] = useState(null);
  // State to manage the loading status while fetching data
  const [loading, setLoading] = useState(true);
  // State to store any error messages encountered during data fetching
  const [error, setError] = useState(null);
  // State to track whether the current recipe is marked as a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * useEffect hook to fetch recipe details when the component mounts or the recipe ID changes.
   */
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true); // Set loading to true before starting the fetch operation
      setError(null);   // Clear any previous error messages

      try {
        // Call the recipe service to get detailed information for the given ID
        const data = await getRecipeDetails(id);
        if (data) {
          setRecipe(data);
          // After fetching the recipe, check its favorite status from local storage
          setIsFavorite(isRecipeFavorite(data.id));
        } else {
          // If no data is returned, it indicates the recipe might not exist or API issue
          setError('Recipe not found or data is incomplete.');
        }
      } catch (err) {
        console.error('Failed to fetch recipe details:', err);
        // Provide a user-friendly error message
        setError('Failed to load recipe details. Please check your network connection or try again later.');
      } finally {
        setLoading(false); // Set loading to false once the fetch operation completes (success or failure)
      }
    };

    // Only attempt to fetch if an ID is present in the URL
    if (id) {
      fetchRecipe();
    } else {
      // If no ID is provided, set an error and stop loading
      setError('No recipe ID provided in the URL.');
      setLoading(false);
    }
  }, [id]); // Dependency array: re-run this effect only if the 'id' parameter changes

  /**
   * Handles toggling the favorite status of the current recipe.
   * Adds the recipe to local storage favorites if not already a favorite,
   * or removes it if it is.
   */
  const handleToggleFavorite = () => {
    if (!recipe) return; // Prevent action if recipe data is not loaded

    if (isFavorite) {
      // If already a favorite, remove it