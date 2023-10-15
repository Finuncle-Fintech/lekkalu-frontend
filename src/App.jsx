import './App.css'
import Router from './Router'
import { Provider } from './provider/Provider'

function App() {
  return (
    <div className='App'>
      <Provider>
        <Router />
      </Provider>
    </div>
  )
}

export default App
