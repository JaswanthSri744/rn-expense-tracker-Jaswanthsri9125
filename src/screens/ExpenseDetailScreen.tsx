import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../types/expense";
import { useExpenses } from "../context/ExpenseContext";
import AppButton from "../components/AppButton";
import { COLORS } from "../constants/colors";
import { SPACING, FONT_SIZES } from "../constants/spacing";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ExpenseDetail"
>;

export default function ExpenseDetailScreen({
  route,
  navigation,
}: Props) {
  const { expenseId } = route.params;

  const { expenses, deleteExpense, loading } = useExpenses();

  const [deleting, setDeleting] = useState(false);

  const expense = expenses.find(
    (item) => item.id === expenseId
  );

  async function handleDelete() {
    if (deleting) {
      return;
    }

    setDeleting(true);

    try {
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch {
      Alert.alert(
        "Delete Failed",
        "Unable to delete expense. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  }

  function confirmDelete() {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            void handleDelete();
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
        <Text style={styles.message}>
          Loading expense details...
        </Text>
      </View>
    );
  }

  if (!expense) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>
          Expense not found
        </Text>

        <Text style={styles.message}>
          This expense may have been deleted.
        </Text>

        <AppButton
          title="Back to Home"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.category}>
          {expense.category}
        </Text>

        <Text style={styles.title}>
          {expense.title}
        </Text>

        <Text style={styles.amount}>
          {formatCurrency(expense.amount)}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          Expense Date
        </Text>

        <Text style={styles.value}>
          {formatDate(expense.date)}
        </Text>

        <Text style={styles.label}>
          Category
        </Text>

        <Text style={styles.value}>
          {expense.category}
        </Text>
      </View>

      <AppButton
        title={deleting ? "Deleting..." : "Delete Expense"}
        onPress={confirmDelete}
        variant="danger"
        disabled={deleting}
      />

      {deleting ? (
        <ActivityIndicator
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.large,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.large,
    gap: SPACING.medium,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.large,
    borderRadius: 16,
  },
  category: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: FONT_SIZES.small,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    marginTop: SPACING.medium,
    color: COLORS.text,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: SPACING.medium,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.large,
  },
  label: {
    fontSize: FONT_SIZES.small,
    color: COLORS.secondaryText,
    marginTop: SPACING.medium,
  },
  value: {
    fontSize: FONT_SIZES.medium,
    marginTop: SPACING.small,
    color: COLORS.text,
  },
  message: {
    color: COLORS.secondaryText,
    textAlign: "center",
  },
  loader: {
    marginTop: SPACING.medium,
  },
});
