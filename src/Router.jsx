import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Charts from 'components/Charts/Charts';
import Expenses from 'components/Expenses/Expenses';
import Header from 'components/Header/Header';
import { Context } from 'provider/Provider';
import Dashboard from 'components/Dashboard/Dashboard';
import Terms from 'components/Login/Terms';
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
               path='/dashboard'
               element={
                  <>
                     <Header></Header>
                     <Dashboard></Dashboard>
                  </>
               }
            ></Route>
            <Route
               path='/Terms'
               element={
                  <>
                     <Terms></Terms>
                  </>
               }
            />
         </Routes>
      </Router>
   );
};

export default RouterComponent;