import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpenseOutput from '../components/ExpensesOutput/ExpenseOutput'
import { ExpensesContext } from '../store/Expenses-Context'

const AllExpenses = ({expenses}) => {
  const ExpenseCtx=useContext(ExpensesContext);
  return <ExpenseOutput expenses={ExpenseCtx.expenses} expensesPeriod={"Total"} fallbacktext={"No registered expenses found"}/>
   
}

export default AllExpenses