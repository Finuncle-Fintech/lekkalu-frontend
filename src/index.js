import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Commented because the app renders twice with this:
  //<React.StrictMode>
      <App />
  //</React.StrictMode>
);
