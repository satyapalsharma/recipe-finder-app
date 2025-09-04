import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import page components
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';

// Import utility for local storage management
import { getFavorites, saveFavorites } from './utils/localStorage';

// Import global styles
import './App.css';

/**
 * @typedef {Object} FavoritesContextType
 * @property {string[]} favorites - An array of recipe IDs currently marked as favorite.
 * @property {(recipeId: string) => void} addFavorite - Function to add a recipe ID to favorites.
 * @property {(recipeId: string) => void} removeFavorite - Function to remove a recipe ID from favorites.
 * @property {(recipeId: string) => boolean} isFavorite - Function to check if a recipe ID is in favorites.
 */

/**
 * FavoritesContext provides the favorites state and actions to all components wrapped within its Provider.
 * @type {React.Context<FavoritesContextType>}
 */
export const FavoritesContext = createContext(null);

/**
 * The main application component.
 * Sets up routing, manages global favorites state, and provides it via Context.
 * @returns {JSX.Element} The root React component for the Recipe Finder App.
 */
function App() {
  // State to hold the list of favorite recipe IDs
  const [favorites, setFavorites] = useState([]);

  /**
   * Effect hook to load favorites from local storage on initial component mount.
   * Runs only once due to the empty dependency array.
   */
  useEffect(() => {
    try {
      const storedFavorites = getFavorites();
      if (storedFavorites) {
        setFavorites(storedFavorites);
      }
    } catch (error) {
      console.error("Failed to load favorites from local storage:", error);
      // Optionally, clear corrupted storage or notify user
    }
  }, []);

  /**
   * Effect hook to save favorites to local storage whenever the 'favorites' state changes.
   * Ensures persistence across browser sessions.
   */
  useEffect(() => {
    try {
      saveFavorites(favorites);
    } catch (error) {
      console.error("Failed to save favorites to local storage:", error);
      // Optionally, notify user that favorites might not be saved
    }
  }, [favorites]); // Dependency array includes 'favorites'

  /**
   * Adds a recipe ID to the favorites list if it's not already present.
   * @param {string} recipeId - The ID of the recipe to add.
   */
  const addFavorite = (recipeId) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(recipeId)) {
        return [...prevFavorites, recipeId];
      }
      return prevFavorites; // Return previous state if already favorited
    });
  };

  /**
   * Removes a recipe ID from the favorites list.
   * @param {string} recipeId - The ID of the recipe to remove.
   */
  const removeFavorite = (recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== recipeId)
    );
  };

  /**
   * Checks if a given recipe ID is currently in the favorites list.
   * @param {string} recipeId - The ID of the recipe to check.
   * @returns {boolean} True if the recipe is a favorite, false otherwise.
   */
  const isFavorite = (recipeId) => favorites.includes(recipeId);

  // The value provided to the FavoritesContext.Provider
  const favoritesContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Application Header with Navigation */}
        <header className="app-header">
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites ({favorites.length})</Link>
            {/*
              Cross-project context:
              These links simulate navigation to other services within a microservice ecosystem.
              In a real deployment, these would point to the actual URLs of the other applications.
            */}
            {/* <a href="http://localhost:3001/tasks" target="_blank" rel="noopener noreferrer" className="nav-link external-link">Task Manager</a> */}
            {/* <a href="http://localhost:3002/converter" target="_blank" rel="noopener noreferrer" className="nav-link external-link">Unit Converter</a> */}
            {/* <a href="http://localhost:3003/snippets" target="_blank" rel="noopener noreferrer" className="nav-link external-link">Code Snippets</a> */}
          </nav>
          <h1>Recipe Finder</h1>
        </header>

        {/*
          FavoritesContext.Provider makes the favorites state and functions
          available to all nested components without prop drilling.
        */}
        <FavoritesContext.Provider value={favoritesContextValue}>
          {/* Main content area where pages will be rendered */}
          <main className="app-main-content">
            <Routes>
              {/* Route for the home page, displaying search and recipe listings */}
              <Route path="/" element={<HomePage />} />
              {/* Route for individual recipe details, dynamic ID parameter */}
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              {/* Route for displaying all favorited recipes */}
              <Route path="/favorites" element={<FavoritesPage />} />
              {/*
                Optional: Add a catch-all route for 404 Not Found pages.
                <Route path="*" element={<NotFoundPage />} />
              */}
            </Routes>
          </main>
        </FavoritesContext.Provider>

        {/* Application Footer */}
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Recipe Finder App. Part of the Interconnected System.</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;