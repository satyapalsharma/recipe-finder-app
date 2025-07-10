import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Assuming global styles are handled here or in a dedicated index.css

/**
 * The main entry point for the Recipe Finder React application.
 *
 * This file initializes the React application by rendering the root `App` component
 * into the DOM element with the ID 'root' in `public/index.html`.
 *
 * It utilizes React 18's `createRoot` API for concurrent mode features and
 * wraps the `App` component in `React.StrictMode` to enable additional
 * checks and warnings during development.
 */

// Get the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to render.
if (rootElement) {
  // Create a React root for concurrent mode.
  const root = ReactDOM.createRoot(rootElement);

  // Render the main App component.
  // React.StrictMode activates additional checks and warnings for its descendants.
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found, which indicates a problem
  // with the public/index.html file or its loading.
  console.error('Failed to find the root element. Make sure an element with id="root" exists in public/index.html.');
}