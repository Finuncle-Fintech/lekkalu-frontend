import { useEffect } from 'react';
import 'App.css';
import { Provider } from 'provider/Provider';
import Router from 'Router';
function App() {
   useEffect(() => {
      document.title = 'Finuncle'
    }, []);
    
   return (
      <div className='App'>
         <Provider>
            <Router />
         </Provider>
      </div>
   );
}

export default App;
