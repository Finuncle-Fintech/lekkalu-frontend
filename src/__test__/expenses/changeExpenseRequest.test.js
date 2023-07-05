import React, { createContext } from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Expenses from "components/Expenses/Expenses";
import { mockState } from "__test__/data/Expenses";
import { useLocation } from "react-router";

jest.mock('react-router',()=>({
  ...jest.requireActual('react-router'),
  useLocation:jest.fn()
}))

const TestContext = createContext(mockState);

describe("changeExpenseRequest", () => {
  test("successfully deletes an expense", async () => {
    render(
      <TestContext.Provider value={mockState}>
        <Expenses Context={TestContext}/>
      </TestContext.Provider>
    );

    fireEvent.click(screen.getAllByPlaceholderText("edit-expense")[0]);

    const amountField = screen.getByTestId("amount-expense").firstChild.firstChild;
    const endAdornment = screen.getByTestId("tags-expense").children[1].children[3].children[1];

    fireEvent.change(amountField, {target: {value: '23.00'}});
    fireEvent.click(endAdornment);

    const firstOption = screen.getAllByRole('presentation')[2].firstChild.firstChild.firstChild;

    fireEvent.click(firstOption);

    fireEvent.click(screen.getByTestId("submit-expense"));

    await waitFor(() => {
      expect(mockState.changeExpenseRequest).toHaveBeenCalled();
    });
  });
});
