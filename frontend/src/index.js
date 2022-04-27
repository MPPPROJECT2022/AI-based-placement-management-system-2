import React from 'react';
import ReactDOM from 'react-dom';
import './AdminDashboard/assets/boxicons-2.0.7/css/boxicons.min.css'
import './AdminDashboard/assets/css/grid.css'
import './AdminDashboard/assets/css/theme.css'


// import './index.css';
// import App from './App';
import Homepage from './Components/Homepage'


ReactDOM.render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
  document.getElementById('root')
);

