import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadFavorites, saveFavorites } from '../utils/localStorage';
import RecipeCard from '../components/RecipeCard';
import '../App.css'; // Assuming App.css contains general styles, or create FavoritesPage.css if more specific styles are needed.

/**
 * FavoritesPage Component
 *
 * Displays a list of recipes that the user has marked as favorites.
 * Users can view their saved recipes and navigate to their detail pages.
 * Recipes can also be removed from the favorites list directly from this page.
 */
const FavoritesPage = () => {
  // State to hold the list of favorite recipes
  const [favorites, setFavorites] = useState([]);
  // State to track if favorites have been loaded to prevent flickering
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads favorite recipes from local storage when the component mounts.
   * This effect runs only once on initial render.
   */
  useEffect(() => {
    const storedFavorites = loadFavorites();
    setFavorites(storedFavorites);
    setIsLoading(false); // Mark loading as complete
  }, []);

  /**
   * Handles the removal of a recipe from the favorites list.
   *
   * @param {string} recipeId - The unique ID of the recipe to remove.
   */
  const handleRemoveFavorite = useCallback((recipeId) => {
    // Filter out the recipe to be removed
    const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    setFavorites(updatedFavorites); // Update the component's state
    saveFavorites(updatedFavorites); // Persist the updated list to local storage
  }, [favorites]); // Recreate if 'favorites' changes

  if (isLoading) {
    return (
      <div className="favorites-page container">
        <h1 className="page-title">Your Favorite Recipes</h1>
        <p className="loading-message">Loading your favorite recipes...</p>
      </div>
    );
  }

  return (
    <div className="favorites-page container">
      <h1 className="page-title">Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <div className="no-favorites-message">
          <p>You haven't added any recipes to your favorites yet.</p>
          <p>Start exploring recipes on the <Link to="/" className="link-primary">Home Page</Link>!</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true} // All recipes on this page are favorites
              onFavoriteToggle={() => handleRemoveFavorite(recipe.id)} // Action to remove from favorites
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;