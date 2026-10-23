export type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Other";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt?: number;
};

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  ExpenseDetail: { expenseId: string };
};