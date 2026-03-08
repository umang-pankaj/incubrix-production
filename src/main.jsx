import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

console.log('React starting...');
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

ReactDOM.createRoot(rootElement).render(
  <App />
)
console.log('Render called');
