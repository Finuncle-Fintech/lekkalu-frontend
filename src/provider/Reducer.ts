import Types from "./Types";

export type InitialStateType = {
  budget: Array<any>;
  expenses: Array<any>;
  weeklyExpense: Array<any>;
  monthlyExpenses: Array<any>;
  tags: Array<any>;
  assets: Array<any>;
  liabilities: Array<any>;
  depreciation: Array<any>;
  incomeStatement: { income: Array<any>; expenses: Array<any> };
};

export type ReducerAction = {
  type: keyof typeof Types;
  payload: any;
};

export const InitialState = {
  budget: [],
  expenses: [],
  weeklyExpense: [],
  monthlyExpenses: [],
  tags: [],
  assets: [],
  liabilities: [],
  depreciation: [],
  incomeStatement: { income: [], expenses: [] },
};

const Reducer = (state: InitialStateType, action: ReducerAction) => {
  switch (action.type) {
    case Types.FETCH_BUDGET: {
      return {
        ...state,
        budget: action.payload,
      };
    }
    case Types.FETCH_EXPENSE: {
      return {
        ...state,
        expenses: action.payload,
      };
    }
    case Types.FETCH_WEEKLY_EXPENSE: {
      return {
        ...state,
        weeklyExpense: action.payload,
      };
    }
    case Types.FETCH_MONTHLY_EXPENSE: {
      return {
        ...state,
        monthlyExpenses: action.payload,
      };
    }
    case Types.FETCH_ASSETS: {
      return {
        ...state,
        assets: action.payload,
      };
    }
    case Types.FETCH_LIABILITIES: {
      return {
        ...state,
        liabilities: action.payload,
      };
    }
    case Types.FETCH_depreciation: {
      return {
        ...state,
        depreciation: action.payload,
      };
    }
    case Types.DELETE_EXPENSE: {
      const newExpenses = state.expenses.filter(
        (expense: any) => expense.id !== action.payload
      );

      return {
        ...state,
        expenses: newExpenses,
      };
    }
    case Types.CREATE_EXPENSE: {
      const newState = state.expenses.length
        ? [...state.expenses, { ...action.payload.data, id: action.payload.id }]
        : [action.payload];

      return {
        ...state,
        expenses: newState,
      };
    }
    case Types.EDIT_EXPENSE: {
      const { index, expense } = action.payload;
      const newState = state.expenses;
      newState[index] = expense;

      return {
        ...state,
        expenses: newState,
      };
    }
    case Types.SET_INCOME_STATEMENT: {
      return {
        ...state,
        incomeStatement: action.payload,
      };
    }
    case Types.FETCH_TAGS: {
      return {
        ...state,
        tags: action.payload,
      };
    }
  }
};

export default Reducer;
