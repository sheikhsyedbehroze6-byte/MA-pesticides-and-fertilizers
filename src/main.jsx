import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initSecurityGuards } from './utils/security'
import { initGlobalErrorTracking } from './utils/analytics'

initSecurityGuards();
initGlobalErrorTracking();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
