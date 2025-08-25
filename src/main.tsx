
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('controlAddIn') || document.getElementById('root');
  if (container && container.childNodes.length === 0) {
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else if (!container) {
    console.error('No valid container found for React app.');
  } else {
    console.error('Container is not empty. React expects an empty div.');
  }
});
