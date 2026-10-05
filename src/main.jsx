import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './shared/context/AuthContext.jsx'
import { EventProvider } from './shared/context/EventContext.jsx'
import { NoteProvider } from './shared/context/NoteContext.jsx'
import { TaskProvider } from './shared/context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <NoteProvider>
            <TaskProvider>
              <Router />
            </TaskProvider>
          </NoteProvider>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
