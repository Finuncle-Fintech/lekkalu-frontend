export const mockTags = [
  { id: 1, name: "Groceries" },
  { id: 2, name: "Transportation" },
  { id: 3, name: "Utilities" },
];

export const mockExpenses = [
  {
    id: 1,
    amount: 10.0,
    tags: [3, 2],
    user: 1,
    time: "2023-01-01T10:00:00Z",
  },
  {
    id: 2,
    amount: 20.0,
    tags: [2],
    user: 1,
    time: "2023-01-02T11:00:00Z",
  },
  {
    id: 3,
    amount: 30.0,
    tags: [1, 3],
    user: 1,
    time: "2023-01-03T12:00:00Z",
  },
];

export const mockState = {
  budget: [],
  expenses: mockExpenses,
  tags: mockTags,
  fetchTags: jest.fn(),
  fetchExpenses: jest.fn(),
  deleteExpenseRequest: jest.fn(),
  changeExpenseRequest: jest.fn(),
  createExpenseRequest: jest.fn(),
};