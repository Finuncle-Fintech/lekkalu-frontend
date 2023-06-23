import React, { createContext, useContext } from "react";
import Signin from "pages/Signin/Signin";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";

const mockState = {
  fetchToken: jest.fn()
};

jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:jest.fn()
}))

jest.mock('@mui/material/Typography', () => {
    return {
      __esModule: true,
      default: () => <></>, // Mock que devuelve un fragmento vacío
    };
});
jest.mock('@mui/material/Link',()=>{
    return{
        __esModule:true,
        default:()=><></>
    }
})

const TestContext = createContext(mockState);

describe('SignIn test funcionality', () => {
    
   
    test('Successfull button login funcionality when is clicked', async() => {
        const view = render(
            <BrowserRouter>
                <TestContext.Provider value={mockState}>
                    <Signin Context={TestContext} />
                </TestContext.Provider>
            </BrowserRouter>
        );    
    
        const buttonSignIn = screen.getByText('Sign In')

        fireEvent.click(buttonSignIn)

        await waitFor(()=>{
            expect(mockState.fetchToken).toHaveBeenCalledTimes(1)
        })
    });
});
