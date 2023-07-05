import React from 'react';
import Signin from '../../pages/Signin/Signin';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import swal from 'sweetalert2';

const mockHandleSubmit = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@mui/material/Typography', () => {
  return {
    __esModule: true,
    default: () => <></>, // Mock return fragment empty
  };
});

jest.mock('@mui/material/Link', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

describe('SignIn test functionality', () => {
  test('Successful button login functionality when clicked', async () => {
    render(
      <BrowserRouter>
        <Signin handleSubmit={mockHandleSubmit} />
      </BrowserRouter>,
    );

    const buttonSignIn = screen.getByTestId('signin-button');

    fireEvent.click(buttonSignIn);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test("Show error when user doesn't exist", async () => {
    render(
      <BrowserRouter>
        <Signin handleSubmit={mockHandleSubmit} />
      </BrowserRouter>,
    );

    const errorText = 'User with provided details does not exist';
    const spySwal = jest.spyOn(swal, 'fire');
    const buttonSignIn = screen.getByTestId('signin-button');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, {
      target: { value: 'nameUser, this username does not exist' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'badPasswordThis Password does not exist.' },
    });
    fireEvent.click(buttonSignIn);

    await waitFor(() => {
      expect(spySwal).toBeCalledTimes(1);
    });
    await waitFor(() => {
      expect(swal.getHtmlContainer().textContent).toEqual(errorText);
    });
  });
});
