import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Charts from 'components/Charts/Charts';
import Expenses from 'components/Expenses/Expenses';
import Header from "components/Header/Header";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Charts /></>} />
        <Route path="/expenses" element={<><Header /><Expenses /></>} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;