import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)