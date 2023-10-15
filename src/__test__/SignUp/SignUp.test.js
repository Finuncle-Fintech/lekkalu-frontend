/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Signup from 'pages/Signup/Signup'
import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import axiosClient from 'components/Axios/Axios'

jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../../components/Axios/Axios", () => ({
  post: jest.fn(),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

jest.mock("@mui/material/Typography", () => {
  return {
    __esModule: true,
    default: () => <></>, // Mock return fragment empty
  };
});

jest.mock("@mui/material/Link", () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

const mockState = {
  context: jest.fn(),
};

const ContextTest = createContext(mockState);

describe("Sign Up functionality", () => {
  test("Show error when clicking continue without entering values", async () => {
    render(
      <BrowserRouter>
        <ContextTest.Provider value={mockState}>
          <Signup Context={ContextTest} />
        </ContextTest.Provider>
      </BrowserRouter>
    );

    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);

    const usernameRequired = await screen.findByText("Username is required!");
    const passwordRequired = await screen.findByText("Password is required!");
    const emailRequired = await screen.findByText("Email is required!");
    const conditionsRequired = await screen.findByText(
      "Please accept terms and conditions!"
    );
    const policiesRequired = await screen.findByText(
      "Please agree to the privacy policies!"
    );

    expect(usernameRequired).toBeInTheDocument();
    expect(passwordRequired).toBeInTheDocument();
    expect(emailRequired).toBeInTheDocument();
    expect(conditionsRequired).toBeInTheDocument();
    expect(policiesRequired).toBeInTheDocument();
  });

  test("Show error when username exists in database", async () => {
    render(
      <BrowserRouter>
        <ContextTest.Provider value={mockState}>
          <Signup Context={ContextTest} />
        </ContextTest.Provider>
      </BrowserRouter>
    );

    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email Address");
    const password = screen.getByLabelText("Password");
    const conditions = screen.getByTestId("conditions");
    const policies = screen.getByTestId("policies");
    fireEvent.change(username, {
      target: { value: "some_user" },
    });
    fireEvent.change(password, {
      target: { value: "password" },
    });
    fireEvent.change(email, {
      target: { value: "testing@test.com" },
    });
    fireEvent.click(conditions);
    fireEvent.click(policies);

    const errorMessage = "username: This field must be unique.";
    const errorResponse = {
      response: {
        status: 400,
        data: [errorMessage],
      },
    };

    jest.spyOn(axiosClient, "post").mockRejectedValue(errorResponse);
    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      const errorElement = screen.getByText(`0: ${errorMessage}`);
      expect(errorElement).toBeInTheDocument();
    });
  });
});
