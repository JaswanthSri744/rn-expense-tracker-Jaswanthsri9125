import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Expense } from "../types/expense";

const STORAGE_KEY = "@expense_tracker/expenses";

export async function getExpenses(): Promise<Expense[]> {
  const storedData = await AsyncStorage.getItem(STORAGE_KEY);

  if (storedData === null) {
    return [];
  }

  const data: unknown = JSON.parse(storedData);

  if (!Array.isArray(data)) {
    throw new Error("Invalid expense data");
  }

  return data as Expense[];
}

export async function saveExpenses(
  expenses: Expense[]
): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(expenses)
  );
}