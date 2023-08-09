import { createContext } from "react";
import Header from "components/Header/Header";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


const headerState = {
    signOut:jest.fn(),
    authToken:'test-token'
}
const TestContextHeader = createContext(headerState)

jest.mock('axios', ()=>({
    create:jest.fn(),
    post:jest.fn(),
    get:jest.fn()
}))


describe('Proper functionality of the header component.', ()=>{
    test('The drop-down menu should be displayed.', async()=>{
        render(
            <TestContextHeader.Provider value={headerState}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </TestContextHeader.Provider>
        )
        
        const button = screen.getByTestId('buttonDropwDown')

        fireEvent.click(button)

        await waitFor(()=>{
            const menuDropDown = screen.getByTestId('menuDropDown')
            expect(menuDropDown).toBeInTheDocument()
        })

    })
})