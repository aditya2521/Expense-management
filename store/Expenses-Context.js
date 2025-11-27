import { createContext, useReducer, useState } from "react";
const Dummy_Expenses = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 60.56,
    date: new Date("2025-2-21"),
  },
  {
    id: "e2",
    description: "A pair of Shirt",
    amount: 60.56,
    date: new Date("2025-2-21"),
  },

  {
    id: "e3",
    description: "Some apple",
    amount: 65.56,
    date: new Date("2025-2-13"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 60.56,
    date: new Date("2025-2-21"),
  },

   { id: "e5", description: "Online course", amount: 1999.99, date: new Date("2025-11-25") },
  { id: "e6", description: "Phone recharge", amount: 299.00, date: new Date("2025-11-21") },
  { id: "e7", description: "Stationery", amount: 89.45, date: new Date("2025-11-18") },
  { id: "e8", description: "Gym membership", amount: 1500.00, date: new Date("2025-2-01") },
  { id: "e9", description: "Laptop sleeve", amount: 799.00, date: new Date("2025-3-12") },
  { id: "e10", description: "Bluetooth headphones", amount: 2499.00, date: new Date("2025-1-25") },
  { id: "e11", description: "Taxi ride", amount: 220.00, date: new Date("2025-2-05") },
  { id: "e12", description: "Birthday gift", amount: 1500.00, date: new Date("2025-4-01") },
  { id: "e13", description: "Tea and snacks", amount: 75.25, date: new Date("2025-3-09") },
  { id: "e14", description: "Notebook", amount: 60.00, date: new Date("2025-2-17") },
  { id: "e15", description: "USB cable", amount: 150.00, date: new Date("2025-3-03") },
  { id: "e16", description: "Mobile cover", amount: 399.00, date: new Date("2025-2-25") },
  { id: "e17", description: "Water bottle", amount: 250.00, date: new Date("2025-3-15") },
];



export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});
function expensesReducer(state, action) {
   
  switch (action.type) {
     
    case "ADD":
    const id = new Date().toString() + Math.random().toString();

    
      return [{ ...action.payload, id: id }, ...state];
   case "UPDATE":
  const updateableExpensesIndex = state.findIndex(
    (expense) => expense.id === action.payload.id
  );
  if (updateableExpensesIndex === -1) {
    console.warn("Expense not found:", action.payload.id);
    return state;
  }
  const updateableExpenses = state[updateableExpensesIndex];
  const updateitem = {
    ...updateableExpenses,
    ...action.payload.data,
  };
  const updatedExpenses = [...state];
  updatedExpenses[updateableExpensesIndex] = updateitem;
  
  return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, Dummy_Expenses);
  function addExpense(expensesdata) {
    dispatch({
      type: "ADD",
      payload: expensesdata,
    });
  }
  function deleteExpense(id) {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  }
  function updateExpense(id,expenseData) {
    dispatch({
      type: "UPDATE",
      payload: { id ,data:expenseData },
    });
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
