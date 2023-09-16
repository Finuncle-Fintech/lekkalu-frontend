import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Charts from "components/Charts/Charts";
import Expenses from "components/Expenses/Expenses";
import IncomeStatement from "pages/income-statement/IncomeStatement";
import EmiCalculator from "pages/EmiCalculator";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import PersistLogin from "components/PersistLogin/PersistLogin";
import GuestRoutes from "components/GuestRoutes/GuestRoutes";
import ErrorPage from "components/ErrorPage/ErrorPage";
import Layout from "components/Layout/Layout";
import SIPCalculator from "pages/SIPCalculator/SIPCalculator";
import CAGRCalculator from "pages/CAGRCalculator/CAGRCalculator";
import BalanceSheet from 'pages/BalanceSheet/BalanceSheet'
import PersistGuest from "components/GuestRoutes/PersistGuest";

const RouterComponent = () => {

  return (
    <Router>

      <Layout>

        <Routes>
          
          <Route path="*" element={<ErrorPage />} />

          <Route element={<PersistGuest />}>

            <Route path="/signin" element={<GuestRoutes component={<Signin />} />} />

            <Route path="/signup" element={<GuestRoutes component={<Signup />} />} />

          </Route>

          <Route element={<PersistLogin />}>

            <Route path="/" element={<ProtectedRoutes component={<Charts />} />} />

            <Route path="/loan_emi_calculator" element={<ProtectedRoutes component={<EmiCalculator />} />} />

            <Route path="/income-statement" element={<ProtectedRoutes component={<IncomeStatement />} />} />

            <Route path="/expenses" element={<ProtectedRoutes component={<Expenses />} />} />

            <Route path="/SIPCalculator" element={<ProtectedRoutes component={<SIPCalculator />} />} />

            <Route path="/CAGRCalculator" element={<ProtectedRoutes component={<CAGRCalculator />} />} />

            <Route path="/balance" element={<ProtectedRoutes component={<BalanceSheet />} />} />

          </Route>

        </Routes>

      </Layout>

    </Router>
  );
};

export default RouterComponent;
