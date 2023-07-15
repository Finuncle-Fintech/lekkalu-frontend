import 'App.css';
import { Provider } from 'provider/Provider';
import RouterComponent from 'Router';

function App() {
   return (
      <div className='App'>
         <Provider>
            <RouterComponent />
         </Provider>
      </div>
   );
}

export default App;
