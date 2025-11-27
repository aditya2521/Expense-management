import { View, StyleSheet,Text, TextInput } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import Iconbutton from "../UI/IcinButton";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/Expenses-Context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const edited = route.params?.expenseId;
  const isediteing = !!edited;
  const selectExpense = expensesCtx.expenses.find(expense=>expense.id===edited)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isediteing ? "Edit expense" : "Add expennse",
    });
  }, [navigation, isediteing]);
  function deleteExpenses() {
    expensesCtx.deleteExpense(edited);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData
  ) {
    if (isediteing) {
      expensesCtx.updateExpense(edited, expenseData
       
      );
    } else {
      expensesCtx.addExpense(expenseData
      );
    }

    navigation.goBack();
  }

  return (

    <View style={styles.container}>
    <ExpenseForm oncancel={cancelHandler} submitlabel={isediteing?"update":"Add"} onsubmit={confirmHandler} defaultValues={selectExpense}/>
    
      {isediteing && (
        <View style={styles.delete}>
          <Iconbutton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenses}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  delete: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttoncont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
