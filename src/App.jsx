import './App.css'
import Router from './Router'
import { Provider } from './provider/Provider'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <div className='App'>
      <Toaster />
      <Provider>
        <Router />
      </Provider>
    </div>
  )
}

export default App
