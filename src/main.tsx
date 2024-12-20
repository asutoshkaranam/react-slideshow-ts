import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

import { SlidePlayerProvider } from './shared-state/slide-player-context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SlidePlayerProvider>
      <App />
    </SlidePlayerProvider>
  </StrictMode>,
)
