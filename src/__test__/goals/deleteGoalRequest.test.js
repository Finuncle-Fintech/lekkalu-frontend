import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Goals from "components/Goals/Goals";
import "@testing-library/jest-dom";
import { Context } from "provider/Provider";
import { mockState } from "__test__/data/Goals";
import { BrowserRouter } from "react-router-dom";


jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn(),
    create: jest.fn()
}))

describe("deleteGoalRequest", () => {
    test("successfully deletes a goal", async () => {
        console.log(mockState)
        render(
            <BrowserRouter>
                <Context.Provider value={mockState}>
                    <Goals />
                </Context.Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getAllByPlaceholderText("delete-goal")[0]);
        await waitFor(() => {
            // expect(mockState.deleteGoalRequest).toHaveBeenCalled();
            expect(screen.getByText('Delete')).toBeInTheDocument()
        });
        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            // expect(mockState.deleteGoalRequest).toHaveBeenCalled();
            expect(mockState.deleteGoalRequest).toHaveBeenCalled();
        });
    });
});

