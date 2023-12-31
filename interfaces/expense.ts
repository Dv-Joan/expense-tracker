export interface IGasto {
  id?: string;
  fecha?: Date;
  descripcion?: string;
  periodicidad?: boolean;
  categoria: string;
  monto: string;
  assetIdentificador?: string;
  divisa?: string;
  numeroGasto?: number;
}

export interface IExpenseContextProvider {
  addExpense: (expense: IGasto) => void;
  deleteExpenseById: (id: string) => void;
  updateExpense: (expense: IGasto) => void;
  expenses: IGasto[];
  getSingleExpense: (id: string) => Promise<IGasto | null>;
  sumOfAllOfExpensesMonthly: () => Promise<number>;
  getTopExpenses: () => Promise<IGasto[]>;
  fetchData: (session_id: string) => Promise<void>;
}
