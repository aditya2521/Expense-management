import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";


const ExpenseOutput = ({ expenses,expensesPeriod ,fallbacktext}) => {
  let Content=<Text style={styles.infotext}>
    {fallbacktext}
  </Text>
  if(expenses.length>0){
    Content=<ExpensesList expenses={expenses}  />
  }

  return (
    <View style={styles.container}>
     <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
     {Content}
      

    </View>
  );
};

export default ExpenseOutput;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary700
  },
  infotext:{
    color:"white",
    fontSize:18,
    textAlign:"center",
    margin:32
  }
});
