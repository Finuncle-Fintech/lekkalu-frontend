import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import HeroHeader from "components/HeroHeader/HeroHeader";
import { Context } from "provider/Provider";
import HeroRoute from '../../components/HeroRoute/HeroRoute';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', ()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate:jest.fn()
}))

jest.mock('@mui/material/Typography', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

jest.mock('@mui/material/Link',()=>{
  return{
      __esModule:true,
      default:()=><></>
  }
})

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create:jest.fn()
}))

test("should navigate to /home when button is clicked", () => {
    render(
        <BrowserRouter>
            <HeroHeader />
        </BrowserRouter>
    );

    const button = screen.getByText("Get Started");

    fireEvent.click(button);

    expect(window.location.pathname).toBe("/signup");
});

test('should redirect to /home when authToken is present', async () => {

  const contextValue = {
    authToken: 'yourAuthToken',
  };

  const { container } = render(
    <Context.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HeroRoute component={<div>Test Component</div>} />} />
          <Route path="/home" element={<div>Home Component</div>} />
        </Routes>
      </MemoryRouter>
    </Context.Provider>
  );

  await waitFor(() => {
    expect(container).toHaveTextContent('Home Component');
  });
});