import Types from './Types';

export const InitialState = {
   budget: [],
   expense: [],
   weeklyExpense: [],
   monthlyExpenses: [],
};

const Reducer = (state, action) => {
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
            expense: action.payload,
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
   }
};

export default Reducer;
