import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface ITransaction {
  id: string;
  title: string;
  type: string; // "income" | "expense"
  amount: number;
  date: string;
  operations: string[]; // ID выбранных категорий
}

interface IAppStore {
  transactions: ITransaction[]; // Список всех созданных транзакций
  // Функция для добавления транзакции
  addTransaction: (title: string, type: string, amount: number, date: string, operations: string[]) => void;
  // Функция для удаления транзакции
  deleteTransaction: (id: string) => void;
}

export const useAppStore = create<IAppStore>()(
  persist(
    (set) => ({
      transactions: [],
      
      addTransaction: (title, type, amount, date, operations) => set((state) => ({
        transactions: [...state.transactions, {
          id: Date.now().toString(),
          title,
          type,
          amount,
          date,
          operations
        }]
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      }))
    }),
    {
      name: "fintracker-storage", // ключ в localStorage
    }
  )
);