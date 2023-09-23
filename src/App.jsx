import 'App.css';
import DownloadData from 'components/income-statement/download/DownloadData';
import { Provider } from 'provider/Provider';
import Router from 'Router';


function App() {
   return (
      <div className='App'>
         <Provider>
            <Router />
         </Provider>
      </div>
   );
}

export default App;
