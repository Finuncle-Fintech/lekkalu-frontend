/* eslint-disable testing-library/no-node-access */
import React, { createContext } from "react";
import Signin from "pages/Signin/Signin";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import swal from "sweetalert2";
import { Context } from "provider/Provider";

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
      default: () => <></>, // Mock return fragment empty
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


describe('SignIn test funcionality', () => {
   
    test('Successfull button login funcionality when is clicked', async() => {
        const view = render(
            <BrowserRouter>
                <Context.Provider value={mockState}>
                    <Signin />
                </Context.Provider>
            </BrowserRouter>
        ); 
    
        const buttonSignIn = screen.getByText('Sign In')

        fireEvent.click(buttonSignIn)

        await waitFor(()=>{
            expect(mockState.fetchToken).toHaveBeenCalledTimes(1)
        })
    });

    test('Show error when user doesn\'t exist',async()=>{
        const view = render(
            <BrowserRouter>
                <Context.Provider value={mockState}>
                    <Signin />
                </Context.Provider>
            </BrowserRouter>
            
        );    

        //Arrange
        const errorText = 'User with provided details does not exist'
        //SpyOn on jest is util for get methods of objects
        const spySwal = jest.spyOn(swal, 'fire')
        const buttonSignIn = screen.getByText('Sign In')
        const form = buttonSignIn.parentNode
        const usernameInput = form.firstChild.children[1].firstChild
        const passwordInput = form.children[1].children[1].firstChild
      
        //Act
        fireEvent.change(usernameInput, { target: { value: 'nameUser, this username does not exist' } });
        fireEvent.change(passwordInput, { target: { value: 'badPasswordThis Passowrd does not exist.' } });
        fireEvent.click(buttonSignIn);

        //Assert
        await waitFor(()=>{
            expect(spySwal).toBeCalledTimes(1)
        })
        await waitFor(()=>{
            expect(swal.getHtmlContainer().textContent).toEqual(errorText)
        })

    })

});
