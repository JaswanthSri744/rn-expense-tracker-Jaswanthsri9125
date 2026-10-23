import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import ExpenseDetailScreen from "../screens/ExpenseDetailScreen";
import type { RootStackParamList } from "../types/expense";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Expense Tracker" }}
      />

      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ title: "Add Expense" }}
      />

      <Stack.Screen
        name="ExpenseDetail"
        component={ExpenseDetailScreen}
        options={{ title: "Expense Details" }}
      />
    </Stack.Navigator>
  );
}