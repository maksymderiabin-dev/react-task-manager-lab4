import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Налаштувати середовище розробки",
    description: "Встановити Node.js, VS Code та необхідні розширення",
    status: "done",
    priority: "high",
    createdAt: new Date("2026-06-01T10:00:00")
  },
  {
    id: "2",
    title: "Спроєктувати базу даних",
    description: "Створити ER-діаграму для нового REST API",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2026-06-05T14:30:00")
  },
  {
    id: "3",
    title: "Написати тести для API",
    description: "Покрити юніт-тестами ендпоінти аутентифікації користувачів",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2026-06-08T09:15:00")
  },
  {
    id: "4",
    title: "Оновити документацію проєкту",
    description: "Додати опис нових функцій у файл README.md",
    status: "todo",
    priority: "low",
    createdAt: new Date("2026-06-09T16:45:00")
  }
];