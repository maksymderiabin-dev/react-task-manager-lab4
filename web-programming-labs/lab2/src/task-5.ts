export {};

// Базові типи
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

// 5.1 Discriminated union (Об'єднання з дискримінатором) для стану завантаження
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;

// 5.2 Type guard функції (допомагають TypeScript зрозуміти точний тип)
function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === "loading";
}

function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === "success";
}

function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === "error";
}

// 5.3 Функція рендеру залежно від стану
function renderState<T>(state: FetchState<T>, renderData: (data: T) => string): string {
  if (isLoadingState(state)) {
    return "⏳ Завантаження...";
  } else if (isSuccessState(state)) {
    return `✅ Завантажено о ${state.loadedAt.toLocaleTimeString()}: ` + renderData(state.data);
  } else if (isErrorState(state)) {
    return `❌ Помилка ${state.code}: ${state.message}`;
  }
  return "Невідомий стан";
}

// 5.4 Функція з використанням typeof та перевіркою на null/undefined
function processValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return "(порожнє значення)";
  }
  
  if (typeof value === "string") {
    return `Рядок: '${value}' (${value.length} символів)`;
  }
  
  if (typeof value === "number") {
    const parity = value % 2 === 0 ? "парне" : "непарне";
    return `Число: ${value} (${parity})`;
  }
  
  if (typeof value === "boolean") {
    return `Булеве: ${value ? 'так' : 'ні'}`;
  }

  return "Невідомий тип";
}

// 5.5 Exhaustive check (вичерпна перевірка)
function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo": return "До виконання";
    case "in_progress": return "В процесі";
    case "done": return "Готово";
    case "cancelled": return "Скасовано";
    default:
      // Цей блок гарантує, що ми обробили всі можливі статуси.
      // Якщо додати новий статус у тип Status і не додати сюди case, TS видасть помилку.
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
  }
}

// Демонстрація роботи
console.log("=== Завдання 5: Type Guards та звуження типів ===\n");

const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { 
    status: "success", 
    data: [{ id: 1, title: "Фінальний тест", description: "", status: "done", priority: "high", assignee: null, createdAt: new Date(), dueDate: null }], 
    loadedAt: new Date() 
  },
  { status: "error", message: "Not found", code: 404 },
];

console.log("--- Стани завантаження ---");
states.forEach((state) => {
  console.log(renderState(state, (tasks) => `${tasks.length} задач(і)`));
});

console.log("\n--- Обробка різних типів значень ---");
const values: (string | number | boolean | null | undefined)[] = [
  "TypeScript", 42, true, null, undefined, 0, ""
];
values.forEach((v) => console.log(processValue(v)));

console.log("\n--- Exhaustive Check ---");
console.log(`Статус 'in_progress' -> ${getStatusLabel("in_progress")}`);