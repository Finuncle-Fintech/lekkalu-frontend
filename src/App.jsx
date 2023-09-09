import { useEffect } from 'react';
import 'App.css';
import { Provider } from 'provider/Provider';
import Router from 'Router';

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
