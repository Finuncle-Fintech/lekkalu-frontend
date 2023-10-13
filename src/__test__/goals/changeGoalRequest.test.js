/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockState } from "__test__/data/Goals";
import Goals from "components/Goals/Goals";
import { Context } from "provider/Provider";

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  create:jest.fn()
}))

describe("changeGoalRequest", () => {
  test("successfully changes a goal", async () => {
    render(
      <Context.Provider value={mockState}>
        <Goals />
      </Context.Provider>
    );

    fireEvent.click(screen.getAllByPlaceholderText("edit-goal")[0]);

    const goalField = screen.getByTestId("goal").firstChild.firstChild;
   
    const targetMetricField = screen.getByTestId("target-metric").firstChild.firstChild;
    const currentField = screen.getByTestId("current-metric").firstChild.firstChild;
    const reachablitiyInMonthsField = screen.getByTestId("reachablitiy-in-months").firstChild.firstChild;
    const reachabilityInYearsField = screen.getByTestId("reachability-in-years").firstChild.firstChild;
    
    fireEvent.click(screen.getByTestId("submit-goal"));

    await waitFor(() => {
      expect(mockState.changeGoalRequest).toHaveBeenCalled();
    });
  });
});
