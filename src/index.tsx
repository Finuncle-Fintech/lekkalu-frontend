import React from 'react'
import ReactDOM from 'react-dom/client'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga4'
import { QueryClientProvider } from '@tanstack/react-query'
import { ApolloProvider } from '@apollo/client'
import { queryClient } from '@/utils/client'
import App from './App'
import { AuthProvider } from '@/hooks/use-auth'
import { ImaginaryAuthProvider } from '@/pages/Scenarios/context/use-imaginaryAuth'
import 'aos/dist/aos.css'
import './styles/globals.css'
import client from '@/apollo/client'

ReactGA.initialize(`${process.env.REACT_APP_GA_TRACKING_CODE}`)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ImaginaryAuthProvider>
          <TooltipProvider>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </TooltipProvider>
        </ImaginaryAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
)
