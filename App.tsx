import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { ExpenseProvider } from "./src/context/ExpenseContext";

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ExpenseProvider>
  );
}