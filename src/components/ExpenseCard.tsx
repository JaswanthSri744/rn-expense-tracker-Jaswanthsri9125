import {
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

import type { Expense } from "../types/expense";
import { COLORS } from "../constants/colors";
import { SPACING, FONT_SIZES } from "../constants/spacing";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

type ExpenseCardProps = {
  expense: Expense;
  onPress: () => void;
};

export default function ExpenseCard({
  expense,
  onPress,
}: ExpenseCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.details}>
        <Text style={styles.title}>
          {expense.title}
        </Text>

        <Text style={styles.subtitle}>
          {expense.category}
        </Text>

        <Text style={styles.subtitle}>
          {formatDate(expense.date)}
        </Text>
      </View>

      <Text style={styles.amount}>
        {formatCurrency(expense.amount)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.medium,
    marginBottom: SPACING.small,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flex: 1,
    marginRight: SPACING.small,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
  subtitle: {
    color: COLORS.secondaryText,
    fontSize: FONT_SIZES.small,
    marginTop: 4,
  },
  amount: {
    color: COLORS.text,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});