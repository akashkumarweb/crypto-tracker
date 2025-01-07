import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root container not found. Please check your index.html file.');
}

const root = ReactDOM.createRoot(rootElement as HTMLElement); // Type assertion for TypeScript
root.render(
  <React.StrictMode>
    <AuthProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </AuthProvider>
  </React.StrictMode>
);
