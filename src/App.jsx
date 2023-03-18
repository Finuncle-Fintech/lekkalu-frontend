import './App.css';
import { Provider } from './provider/Provider';
import Charts from './components/Charts';

function App() {
   return (
      <div className='App'>
         <Provider>
            <Charts />
         </Provider>
      </div>
   );
}

export default App;
