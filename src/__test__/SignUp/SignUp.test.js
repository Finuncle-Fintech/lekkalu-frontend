/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render, screen, waitFor, act } from '@testing-library/react'
import Signup from 'pages/Signup/Signup'
import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import axiosClient from 'components/Axios/Axios'

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create:jest.fn()
}))

jest.mock('components/Axios/Axios', () => ({
    post: jest.fn()
}));
  

jest.mock('react-router',()=>({
    ...jest.requireActual('react-router'),
    useNavigate:jest.fn()
}))

jest.mock('@mui/material/Typography', () => {
    return {
      __esModule: true,
      default: () => <></>, // Mock return fragment empty
    };
});

jest.mock('@mui/material/Link',()=>{
    return {
        __esModule:true,
        default:()=><></>
    }
})

const mockState = {
    context: jest.fn()
};

const ContextTest = createContext(mockState)

describe('Sign Up success funtionality', ()=>{

    test('Show error when username exist on the database', async()=>{
        render(
            <BrowserRouter>
                <ContextTest.Provider value={mockState}>
                    <Signup Context={ContextTest} />
                </ContextTest.Provider>
            </BrowserRouter>
        )
        const errorMessage = 'This username already exists';
        const errorResponse = {
          response: {
            status: 400,
            data: [errorMessage],
          },
        };

        jest.spyOn(axiosClient, 'post').mockRejectedValue(errorResponse)

        //Arrange
        const buttonSubmit = screen.getByText('Continue')
        
        //Act
        fireEvent.click(buttonSubmit)

        //Assert
        await waitFor(() => {
            const errorElement = screen.getByText(`0: ${errorMessage}`);
            expect(errorElement).toBeInTheDocument();
          });
    })

    test('Show error when field does\'t have at least 8 characters.', async()=>{
        render(
            <BrowserRouter>
                <ContextTest.Provider value={mockState}>
                    <Signup Context={ContextTest} />
                </ContextTest.Provider>
            </BrowserRouter>
        )
        const errorMessage = 'Ensure this field has at least 8 characters.';
        const errorResponse = {
          response: {
            status: 400,
            data: [errorMessage],
          },
        };
        jest.spyOn(axiosClient, 'post').mockRejectedValue(errorResponse)

        //Arrange the values don't really matter.
        const buttonSubmit = screen.getByText('Continue')

        //ACT
        fireEvent.click(buttonSubmit)

        //Assert
        await waitFor(() => {
            const errorElement = screen.getByText(`0: ${errorMessage}`);
            expect(errorElement).toBeInTheDocument();
          });
    })
})