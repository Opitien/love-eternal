import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NotFound from './pages/NotFound'

const isRoot = window.location.pathname === '/' || window.location.pathname === ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isRoot ? <App /> : <NotFound />}
  </StrictMode>,
)
