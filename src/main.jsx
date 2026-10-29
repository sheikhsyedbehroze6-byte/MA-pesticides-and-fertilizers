import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initSecurityGuards } from './utils/security'

// Initialize prototype freeze and clickjacking framebuster
initSecurityGuards();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
