import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/Auth/AuthProvider.tsx'

TimeAgo.addDefaultLocale(en)
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
