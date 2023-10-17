import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import IncomeStatement from "pages/income-statement/IncomeStatement";
import IncomeStatementPage from '@/pages/income-statement/IncomeStatementPage'
import EmiCalculator from '@/pages/EmiCalculator/EmiCalculator'
import PersistLogin from '@/components/PersistLogin/PersistLogin'
import GuestRoutes from '@/components/GuestRoutes/GuestRoutes'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import Layout from '@/components/Layout/Layout'
import SIPCalculator from '@/pages/SIPCalculator/SIPCalculator'
import CAGRCalculator from '@/pages/CAGRCalculator/CAGRCalculator'
import BalanceSheet from '@/pages/BalanceSheet/BalanceSheet'
import Settings from '@/pages/Settings/Settings'
import PersistGuest from '@/components/GuestRoutes/PersistGuest'
import Goals from '@/components/Goals/Goals'
import Hero from '@/pages/Hero/Hero'
import HeroRoute from '@/components/HeroRoute/HeroRoute'
import TermsAndConditions from '@/pages/TermsAndConditions/TermsAndConditions'
import PrivacyPolicies from '@/pages/PrivacyPolicies/PrivacyPolicies'
import Profile from '@/pages/Profile/Profile'
import Expenses from '@/components/Expenses/Expenses'
import Signup from '@/pages/Signup/Signup'
import Signin from '@/pages/Signin/Signin'
import ProtectedRoutes from '@/components/ProtectedRoutes/ProtectedRoutes'
import Home from './pages/Home/Home'

const RouterComponent = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route element={<PersistGuest />}>
            <Route path='/' element={<HeroRoute component={<Hero />} />} />
            <Route path='/signin' element={<GuestRoutes component={<Signin />} />} />
            <Route path='/signup' element={<GuestRoutes component={<Signup />} />} />
            <Route path='/SIPCalculator' element={<GuestRoutes component={<SIPCalculator />} />} />
            <Route path='/CAGRCalculator' element={<GuestRoutes component={<CAGRCalculator />} />} />
            <Route path='/loan_emi_calculator' element={<GuestRoutes component={<EmiCalculator />} />} />
            <Route path='/terms-and-conditions' element={<GuestRoutes component={<TermsAndConditions />} />} />
            <Route path='/privacy-policies' element={<GuestRoutes component={<PrivacyPolicies />} />} />
          </Route>

          <Route element={<PersistLogin />}>
            <Route path='/home' element={<ProtectedRoutes component={<Home />} />} />
            <Route path='/goals' element={<ProtectedRoutes component={<Goals />} />} />
            <Route path='/income-statement' element={<ProtectedRoutes component={<IncomeStatementPage />} />} />
            <Route path='/expenses' element={<ProtectedRoutes component={<Expenses />} />} />
            <Route path='/balance' element={<ProtectedRoutes component={<BalanceSheet />} />} />
            <Route path='/settings' element={<ProtectedRoutes component={<Settings />} />} />
            <Route path='/profile' element={<ProtectedRoutes component={<Profile />} />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default RouterComponent
