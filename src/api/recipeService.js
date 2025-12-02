/**
 * @file This service handles all interactions with the external Recipe API.
 * It centralizes API calls, error handling, and environment variable management
 * related to fetching recipe data.
 */

// Base URL and API credentials are loaded from environment variables.
// These variables should be defined in your .env file (e.g., .env.development, .env.production).
// For example:
// REACT_APP_RECIPE_API_BASE_URL=https://api.edamam.com/api/recipes/v2
// REACT_APP_RECIPE_API_APP_ID=YOUR_EDAMAM_APP_ID
// REACT_APP_RECIPE_API_APP_KEY=YOUR_EDAMAM_APP_KEY