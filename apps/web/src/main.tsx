import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { UserProvider } from './context/userContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './context/cartContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)