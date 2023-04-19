import { EXPENSE_TYPES, INCOME_TYPES } from "./types";

export const incomeStatement={
    income:[
        {
            type:INCOME_TYPES.SALARY,
            value:186.50,
            name:"Sodexo"
        },
        {
            type:INCOME_TYPES.PERK,
            value:0,
            name:"Equity NXP"
        },
        {
            type:INCOME_TYPES.INTEREST_INCOME,
            value:14.50,
            name:"Raju 1.3L"
        },

    ],
    expenses:[
        {
            type:EXPENSE_TYPES.PERSONAL_EXPENSE,
            value:186.50,
            name:"Rent"
        },
        {
            type:EXPENSE_TYPES.PERSONAL_EXPENSE,
            value:0,
            name:"Cook & Maid"
        },
        {
            type:EXPENSE_TYPES.PERSONAL_EXPENSE,
            value:14.50,
            name:"Food"
        },
        {
            type:EXPENSE_TYPES.PERSONAL_EXPENSE,
            value:186.50,
            name:"Personal"
        },
        {
            type:EXPENSE_TYPES.PERSONAL_EXPENSE,
            value:0,
            name:"Mom"
        },
        {
            type:EXPENSE_TYPES.PERSONAL_EXPENSE,
            value:14.50,
            name:"Family Rent"
        },
        {
            type:EXPENSE_TYPES.LOAN,
            value:14.50,
            name:"HDFC 10L"
        },
        {
            type:EXPENSE_TYPES.LOAN,
            value:14.50,
            name:"SBI Loan Thar"
        },
        {
            type:EXPENSE_TYPES.LOAN,
            value:14.50,
            name:"ELSS"
        },
        {
            type:EXPENSE_TYPES.INVESTMENT,
            value:14.50,
            name:"Equity"
        },
        {
            type:EXPENSE_TYPES.INVESTMENT,
            value:14.50,
            name:"Liquid Fund"
        },
        {
            type:EXPENSE_TYPES.INVESTMENT,
            value:14.50,
            name:"SL CHITTI"
        },

    ],
}