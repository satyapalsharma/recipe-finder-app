import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

/**
 * @typedef {object} SearchBarProps
 * @property {(searchTerm: string) => void} onSearch - Callback function to execute when a search is submitted.
 * @property {string} [placeholder="Search for recipes..."] - Placeholder text for the search input.
 * @property {string} [initialSearchTerm=""] - Initial value for the search input.
 */

/**
 * SearchBar component for entering and submitting recipe search queries.
 * It manages its own input state and calls an `onSearch` prop with the search term.
 *
 * @param {SearchBarProps} props - The properties for the component.
 * @returns {JSX.Element} The SearchBar component.
 */
const SearchBar = ({ onSearch, placeholder = "Search for recipes...", initialSearchTerm = "" }) => {
  // State to hold the current value of the search input field
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  /**
   * Handles changes to the search input field.
   * Updates the component's state with the new input value.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input.
   */
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Handles the form submission event.
   * Prevents default form behavior, trims the search term, and calls the onSearch prop
   * if the search term is not empty.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm) {
      // Call the onSearch callback with the trimmed search term
      onSearch(trimmedSearchTerm);
      // Optionally, clear the search bar after submission
      // setSearchTerm('');
    } else {
      // Optionally, provide user feedback if the search term is empty
      console.warn("Search term cannot be empty.");
      // If you want to trigger a search for "empty" to clear results, you could do:
      // onSearch('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="recipe-search" className="visually-hidden">Search for recipes</label>
      <input
        id="recipe-search"
        type="text"
        className="search-bar__input"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search for recipes"
      />
      <button type="submit" className="search-bar__button" aria-label="Submit search">
        Search
      </button>
    </form>
  );
};

// Define prop types for better type checking and documentation
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch must be a function and is required
  placeholder: PropTypes.string,       // placeholder is an optional string
  initialSearchTerm: PropTypes.string, // initialSearchTerm is an optional string
};

export default SearchBar;