import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Keep this line for your custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line to import Bootstrap

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
