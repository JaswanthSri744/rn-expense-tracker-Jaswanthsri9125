import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type {
  Expense,
  ExpenseCategory,
  RootStackParamList,
} from "../types/expense";
import { useExpenses } from "../context/ExpenseContext";
import { EXPENSE_CATEGORIES } from "../constants/categories";
import { COLORS } from "../constants/colors";
import { SPACING, FONT_SIZES } from "../constants/spacing";
import AppButton from "../components/AppButton";

type Props = NativeStackScreenProps<RootStackParamList, "AddExpense">;

export default function AddExpenseScreen({ navigation }: Props) {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const cleanTitle = title.trim();
    const numericAmount = Number(amount);

    if (!cleanTitle) {
      Alert.alert("Validation", "Please enter an expense title.");
      return;
    }

    if (
      amount.trim() === "" ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      Alert.alert("Validation", "Enter a valid positive amount.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert("Validation", "Enter the date as YYYY-MM-DD.");
      return;
    }

    const expense: Expense = {
      id: `${Date.now()}-${Math.random()}`,
      title: cleanTitle,
      amount: numericAmount,
      category,
      date,
      createdAt: Date.now(),
    };

    try {
      setSaving(true);
      await addExpense(expense);
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Unable to save expense. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Expense Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Example: Lunch"
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categories}>
        {EXPENSE_CATEGORIES.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[
              styles.category,
              category === item && styles.selectedCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="2026-10-16"
      />

      <AppButton
        title={saving ? "Saving..." : "Save Expense"}
        onPress={handleSave}
        disabled={saving}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.medium,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  label: {
    color: COLORS.text,
    fontSize: FONT_SIZES.medium,
    marginBottom: SPACING.small,
    marginTop: SPACING.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.small,
  },
  category: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.small,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.text,
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
});
