import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../types/expense";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseCard from "../components/ExpenseCard";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";
import { COLORS } from "../constants/colors";
import { SPACING, FONT_SIZES } from "../constants/spacing";
import { formatCurrency } from "../utils/formatCurrency";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { expenses, loading, error } = useExpenses();

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses],
  );

  const sortedExpenses = useMemo(
    () =>
      [...expenses].sort((a, b) => {
        const aTime = a.createdAt ?? new Date(a.date).getTime();
        const bTime = b.createdAt ?? new Date(b.date).getTime();
        return bTime - aTime;
      }),
    [expenses],
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Total Expenses</Text>
      <Text style={styles.total}>{formatCurrency(total)}</Text>

      <AppButton
        title="Add Expense"
        onPress={() => navigation.navigate("AddExpense")}
      />

      <Text style={styles.listHeading}>Your Expenses</Text>

      <FlatList
        data={sortedExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onPress={() =>
              navigation.navigate("ExpenseDetail", {
                expenseId: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState message="No expenses yet. Add your first expense." />
        }
        contentContainerStyle={
          sortedExpenses.length === 0 ? styles.emptyList : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.medium,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.large,
  },
  heading: {
    color: COLORS.secondaryText,
    fontSize: FONT_SIZES.medium,
  },
  total: {
    color: COLORS.text,
    fontSize: FONT_SIZES.large,
    fontWeight: "700",
    marginVertical: SPACING.medium,
  },
  listHeading: {
    color: COLORS.text,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    marginTop: SPACING.large,
    marginBottom: SPACING.medium,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  error: {
    color: COLORS.danger,
  },
});