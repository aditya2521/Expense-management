import { FlatList,Text } from "react-native"
import ExpensesItem from "./ExpensesItem"
function renderdataItem(itemData){
   return <ExpensesItem {...itemData.item}/>
   

}
function ExpensesList({expenses }){
   
   return <FlatList data={expenses} keyExtractor={(item)=>item.id} renderItem={renderdataItem}/>

}
export default ExpensesList