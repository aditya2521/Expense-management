import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { getFormateDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpensesItem = ({ id,description, date, amount }) => {
  const navigation = useNavigation();
  function expensesPressHandler() {
    navigation.navigate("ManageExpenses" , {
      expenseId:id
    })
  }
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={expensesPressHandler}
    >
      <View style={styles.item}>
        <View>
          <Text style={[styles.textbase, styles.description]}>
            {description}
          </Text>
          <Text style={[styles.textbase]}>{getFormateDate(date)}</Text>
        </View>
        <View style={styles.amount}>
          <Text style={styles.amoutitem}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpensesItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  item: {
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 6,

    backgroundColor: GlobalStyles.colors.primary500,
  },
  textbase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amount: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: 80,
  },
  amoutitem: {
    colors: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
