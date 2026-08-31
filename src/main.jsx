import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router'
import AuthContext from './shared/context/AuthContext.jsx'
import { AuthProvider } from './shared/context/AuthContext.jsx'
import { EventProvider } from './shared/context/EventContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <Router />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
