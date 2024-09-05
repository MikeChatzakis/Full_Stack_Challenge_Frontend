import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from 'react-auth-kit'; // Ensure correct import
import './css/styles.css'
import App from './App';
import createStore from 'react-auth-kit/createStore';

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
root.render(
  //<App />
  <AuthProvider store={store}>
    <App />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
