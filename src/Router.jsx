import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Charts from 'components/Charts/Charts';
import Expenses from 'components/Expenses/Expenses';
import Header from 'components/Header/Header';
import { Context } from 'provider/Provider';
import Dashboard from 'components/Dashboard/Dashboard';
const RouterComponent = () => {
   return (
      <Router>
         <Routes>
            <Route
               path='/'
               element={
                  <>
                     <Header />
                     <Charts />
                  </>
               }
            />
            <Route
               path='/expenses'
               element={
                  <>
                     <Header />
                     <Expenses Context={Context} />
                  </>
               }
            />
            <Route
               exact
               path='/Dashboard'
               element={
                  <>
                     <Header />
                     <Dashboard />
                  </>
               }
            />
         </Routes>
      </Router>
   );
};

export default RouterComponent;