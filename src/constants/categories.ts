export interface ICategory {
  id: string;
  title: string;
  type: "income" | "expense";
}

export const CATEGORIES: ICategory[] = [
  { id: "21", title: "Фриланс", type: "income" },
  { id: "12", title: "Еда", type: "expense" },
  { id: "31", title: "Автомобиль", type: "expense" },
  { id: "13", title: "Бензин", type: "expense" },
  { id: "14", title: "Газ", type: "expense" },
  { id: "41", title: "Зарплата", type: "income" },
  { id: "33", title: "Работа", type: "income" },
  { id: "44", title: "Спорт", type: "expense" },
];
