import { TextInput, Text, View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ oncancel, onsubmit, submitlabel, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : " ",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? defaultValues.date.toISOString().slice(0, 10)
        : " ",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : " ",
      isValid: true,
    },
  });
  function inputChanged(inputidentifier, enteredValue) {
    setInputValues((currentInput) => {
      return {
        ...currentInput,
        [inputidentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };
    const amountIsvalid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsvalid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsvalid = expenseData.description.trim().length > 0;

    if (!amountIsvalid || !dateIsvalid || !descriptionIsvalid) {
      setInputValues((cutInput) => {
        return {
          amount: { value: cutInput.amount.value, isValid: amountIsvalid },
          date: { value: cutInput.date.value, isValid: dateIsvalid },
          description: {
            value: cutInput.description.value,
            isValid: descriptionIsvalid,
          },
        };
      });
      return;
    }
    onsubmit(expenseData);
  }
  const inputIsValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          TextInputs={{
            KeyboardType: "decimal-pad",
            onChangeText: inputChanged.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date(YYYY-MM-DD)"
          invalid={!inputValues.date.isValid}
          TextInputs={{
            placeholder:"YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChanged.bind(this,"date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        style={styles.rowInput}
        label="Description"
        invalid={!inputValues.description.isValid}
        TextInputs={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChanged.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {inputIsValid && (
        <Text style={styles.errorText}>
          {" "}
          Invalid input Values - please checl your entered data!
        </Text>
      )}
      <View style={styles.buttoncont}>
        <Button mode="flat" onpress={oncancel} style={styles.button}>
          Cancel
        </Button>
        <Button onpress={submitHandler} style={styles.button}>
          {submitlabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
