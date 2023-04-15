import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Charts from "components/Charts/Charts";
import Expenses from "components/Expenses/Expenses";
import Header from "components/Header/Header";
import { Context } from "provider/Provider";
import IncomeStatement from "pages/income-statement/IncomeStatement";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Charts />
            </>
          }
        />
        <Route
          path="/expenses"
          element={
            <>
              <Header />
              <Expenses Context={Context} />
            </>
          }
        />
        <Route
          path="/income-statement"
          element={
            <>
              <Header />
              <IncomeStatement Context={Context} />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
