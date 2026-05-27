export {};

// 1.1 - 1.2
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

// 1.3
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

// 1.4
interface HasId {
  id: number;
}
interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

// 1.5
function getTaskStats(tasks: Task[]) {
  const stats = {
    total: tasks.length,
    byStatus: { todo: 0, in_progress: 0, done: 0, cancelled: 0 } as Record<Status, number>,
    overdue: 0
  };
  const now = new Date();
  tasks.forEach(task => {
    stats.byStatus[task.status]++;
    if (task.dueDate && task.dueDate < now && task.status !== "done" && task.status !== "cancelled") {
      stats.overdue++;
    }
  });
  return stats;
}

// 1.6
function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}

// Демонстрація
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
const myTasks: Task[] = [
    { id: 1, title: "Налаштувати CI/CD", description: "...", status: "in_progress", priority: "high", assignee: "Ivan", createdAt: new Date(), dueDate: new Date("2024-01-01") },
    { id: 2, title: "Написати тести", description: "...", status: "todo", priority: "medium", assignee: null, createdAt: new Date(), dueDate: new Date("2026-01-01") },
    { id: 3, title: "Рефакторинг", description: "...", status: "done", priority: "low", assignee: "Petro", createdAt: new Date(), dueDate: null },
    { id: 4, title: "Оновити доки", description: "...", status: "cancelled", priority: "low", assignee: null, createdAt: new Date(), dueDate: new Date("2023-01-01") },
    { id: 5, title: "Фікс багу", description: "...", status: "todo", priority: "critical", assignee: "Anna", createdAt: new Date(), dueDate: new Date("2024-05-01") }
];
console.log("Статистика:", getTaskStats(myTasks));
console.log("Форматування:", formatTask(myTasks[0]!));