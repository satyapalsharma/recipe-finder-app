import React from 'react';
import { Link } from 'react-router-dom';

/**
 * RecipeCard Component
 *
 * Displays a single recipe with its image, title, and actions to view details
 * or toggle its favorite status. This component is designed to be reusable
 * across different pages like HomePage and FavoritesPage.
 *
 * @param {object} props - The component props.
 * @param {object} props.recipe - The recipe object to display.
 *   Expected properties:
 *   - id: string | number (Unique identifier for the recipe, e.g., from an external API)
 *   - title: string (Name of the recipe)
 *   - image: string (URL of the recipe's main image)
 *   - isFavorite: boolean (Indicates if the recipe is currently marked as a favorite by the user)
 * @param {function} props.onToggleFavorite - Callback function to handle toggling favorite status.
 *   It receives the recipe ID as an argument. This function is typically passed down from a parent
 *   component (e.g., HomePage, FavoritesPage) to manage local storage and state updates.
 */
const RecipeCard = ({ recipe, onToggleFavorite }) => {
  // Destructure recipe properties for cleaner access within the component
  const { id, title, image, isFavorite } = recipe;

  /**
   * Handles the click event for the favorite button.
   * Prevents the event from propagating up to the parent Link component,
   * which would otherwise navigate to the detail page when clicking the favorite button.
   *
   * @param {React.MouseEvent} e - The synthetic event object.
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Stop event bubbling to prevent Link navigation
    e.preventDefault();  // Prevent default button behavior (e.g., form submission if in a form)
    onToggleFavorite(id); // Call the parent-provided function to toggle favorite status
  };

  return (
    <div className="recipe-card">
      {/* Link component from react-router-dom for client-side navigation to the recipe detail page */}
      <Link to={`/recipe/${id}`} className="recipe-card-link">
        <div className="recipe-card-image-container">
          <img
            src={image || 'https://via.placeholder.com/300x200?text=No+Image'} // Fallback image if 'image' is null or undefined
            alt={title} // Accessible alt text for screen readers
            className="recipe-card-image"
            loading="lazy" // Improves performance by deferring image loading until it's near the viewport
          />
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{title}</h3>
        </div>
      </Link>

      {/* Button to toggle the favorite status of the recipe */}
      <button
        className={`recipe-card-favorite-btn ${isFavorite ? 'favorite' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} // Accessible label for screen readers
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'} // Tooltip on hover
      >
        {/* Using a simple star emoji for the favorite icon.
            For a production app, consider using an SVG icon or an icon library
            like Font Awesome (e.g., <FaHeart /> or <FaRegHeart />). */}
        <span role="img" aria-label="star icon">
          {isFavorite ? '❤️' : '🤍'} {/* Filled heart for favorite, outline for not favorite */}
        </span>
      </button>
    </div>
  );
};

export default RecipeCard;