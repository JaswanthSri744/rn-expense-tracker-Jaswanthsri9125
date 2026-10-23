import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Expense } from "../types/expense";

const STORAGE_KEY = "@expense_tracker/expenses";

type ExpenseContextType = {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
};

const ExpenseContext =
  createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved expenses once when the provider mounts.
  useEffect(() => {
    async function loadExpenses() {
      try {
        setError(null);

        const storedData =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (storedData === null) {
          setExpenses([]);
          return;
        }

        const parsedData: unknown = JSON.parse(storedData);

        if (!Array.isArray(parsedData)) {
          throw new Error("Stored expenses are invalid.");
        }

        setExpenses(parsedData as Expense[]);
      } catch {
        setError("Unable to load expenses.");
      } finally {
        setLoading(false);
      }
    }

    void loadExpenses();
  }, []);

  // Add a new expense and persist the updated array.
  const addExpense = useCallback(
    async (expense: Expense) => {
      const updatedExpenses = [...expenses, expense];

      try {
        setError(null);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedExpenses),
        );

        setExpenses(updatedExpenses);
      } catch (error) {
        setError("Unable to save expense.");
        throw error;
      }
    },
    [expenses],
  );

  // Delete an expense by its unique ID.
  const deleteExpense = useCallback(
    async (id: string) => {
      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== id,
      );

      try {
        setError(null);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedExpenses),
        );

        setExpenses(updatedExpenses);
      } catch (error) {
        setError("Unable to delete expense.");
        throw error;
      }
    },
    [expenses],
  );

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

// Custom hook for screens to access the shared context.
export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (context === undefined) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider",
    );
  }

  return context;
}