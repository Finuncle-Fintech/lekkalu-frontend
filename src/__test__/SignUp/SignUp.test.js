/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Signup from '../../pages/Signup/Signup';
import axios from 'axios';

const mockHandleSubmit = jest.fn(() => Promise.resolve());

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('Sign Up success funtionality', () => {
  test('Show error when username exist on the database', async () => {
    render(<Signup handleSubmit={mockHandleSubmit} />);
    const errorMessage = 'This username already exists';
    const errorResponse = {
      response: {
        status: 400,
        data: [errorMessage],
      },
    };

    jest.spyOn(axios, 'post').mockRejectedValue(errorResponse);

    //Arrange
    const buttonSubmit = screen.getByTestId('signup-button');

    //Act
    fireEvent.click(buttonSubmit);

    //Assert
    await waitFor(() => {
      const errorElement = screen.getByText(`0: ${errorMessage}`);
      expect(errorElement).toBeInTheDocument();
    });
  });

  test("Show error when field does't have at least 8 characters.", async () => {
    render(<Signup handleSubmit={mockHandleSubmit} />);
    const errorMessage = 'Ensure this field has at least 8 characters.';
    const errorResponse = {
      response: {
        status: 400,
        data: [errorMessage],
      },
    };
    jest.spyOn(axios, 'post').mockRejectedValue(errorResponse);

    //Arrange the values don't really matter.
    const buttonSubmit = screen.getByTestId('signup-button');

    //ACT
    fireEvent.click(buttonSubmit);

    //Assert
    await waitFor(() => {
      const errorElement = screen.getByText(`0: ${errorMessage}`);
      expect(errorElement).toBeInTheDocument();
    });
  });
});
