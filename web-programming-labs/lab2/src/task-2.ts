export {}; // Робимо файл ізольованим модулем

// Базові типи з попереднього завдання (потрібні для роботи)
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

const VARIANT = 1; // Мій варіант за журналом

// 2.1 Generic-інтерфейс для API відповідей
// T - це узагальнений тип (generic), який дозволяє підставити будь-який тип даних
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Функція створює успішну відповідь, підставляючи передані дані
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: "Success",
    timestamp: new Date()
  };
}

// Функція створює відповідь з помилкою (дані відсутні, тому null)
function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return {
    data: null,
    status: 500,
    message,
    timestamp: new Date()
  };
}

// 2.2 Використання Utility Types
// Omit вирізає поля "id" та "createdAt", оскільки при створенні задачі ми їх ще не знаємо
type CreateTaskDto = Omit<Task, "id" | "createdAt">;

// Partial робить всі поля необов'язковими (для часткового оновлення), а Omit знову прибирає id/createdAt
type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;

// 2.3 Типобезпечна функція фільтрації
// K extends keyof Task гарантує, що ми можемо передати тільки існуючий ключ об'єкта Task
// value: Task[K] гарантує, що значення для фільтрації відповідає типу вибраного ключа
function filterTasks<K extends keyof Task>(tasks: Task[], key: K, value: Task[K]): Task[] {
  return tasks.filter(task => task[key] === value);
}

// Демонстрація роботи
console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);

const taskDb: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Вивчити TypeScript",
    description: "Пройти курс на YouTube",
    status: "in_progress",
    priority: "high",
    assignee: "Студент",
    createdAt: new Date(),
    dueDate: new Date("2026-06-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити код unit-тестами",
    status: "todo",
    priority: "medium",
    assignee: "Олена",
    createdAt: new Date(),
    dueDate: new Date("2026-05-30"),
  },
];

console.log("\nФільтрація за статусом 'todo':");
console.log(filterTasks(taskDb, "status", "todo"));

console.log("\nУспішна відповідь API для першої задачі:");
console.log(createSuccessResponse(taskDb[0]));