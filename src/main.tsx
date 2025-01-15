import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/App.tsx'
import { PresupuestoProvider } from '@/context/PresupuestoContex.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PresupuestoProvider>
      <App />
    </PresupuestoProvider>
  </StrictMode>,
)
