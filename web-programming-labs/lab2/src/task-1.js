"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1.5
function getTaskStats(tasks) {
    const stats = {
        total: tasks.length,
        byStatus: { todo: 0, in_progress: 0, done: 0, cancelled: 0 },
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
function formatTask(task) {
    return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}
// Демонстрація
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
const myTasks = [
    { id: 1, title: "Налаштувати CI/CD", description: "...", status: "in_progress", priority: "high", assignee: "Ivan", createdAt: new Date(), dueDate: new Date("2024-01-01") },
    { id: 2, title: "Написати тести", description: "...", status: "todo", priority: "medium", assignee: null, createdAt: new Date(), dueDate: new Date("2026-01-01") },
    { id: 3, title: "Рефакторинг", description: "...", status: "done", priority: "low", assignee: "Petro", createdAt: new Date(), dueDate: null },
    { id: 4, title: "Оновити доки", description: "...", status: "cancelled", priority: "low", assignee: null, createdAt: new Date(), dueDate: new Date("2023-01-01") },
    { id: 5, title: "Фікс багу", description: "...", status: "todo", priority: "critical", assignee: "Anna", createdAt: new Date(), dueDate: new Date("2024-05-01") }
];
console.log("Статистика:", getTaskStats(myTasks));
console.log("Форматування:", formatTask(myTasks[0]));
//# sourceMappingURL=task-1.js.map