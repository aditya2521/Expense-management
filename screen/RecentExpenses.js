import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpenseOutput";
import { ExpensesContext } from "../store/Expenses-Context";
import { getDateMinusDay } from "../util/date";

const RecentExpenses = () => {
  const ExpensesCtx = useContext(ExpensesContext);
  const recent = ExpensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7days = getDateMinusDay(today, 7);
    return (expense.date >= date7days) 
  });
  return <ExpenseOutput expenses={recent} expensesPeriod={"Last 7 Day"} fallbacktext={"no registered entered"}/>;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
