"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VARIANT = 1; // Мій варіант за журналом
// Функція створює успішну відповідь, підставляючи передані дані
function createSuccessResponse(data) {
    return {
        data,
        status: 200,
        message: "Success",
        timestamp: new Date()
    };
}
// Функція створює відповідь з помилкою (дані відсутні, тому null)
function createErrorResponse(message) {
    return {
        data: null,
        status: 500,
        message,
        timestamp: new Date()
    };
}
// 2.3 Типобезпечна функція фільтрації
// K extends keyof Task гарантує, що ми можемо передати тільки існуючий ключ об'єкта Task
// value: Task[K] гарантує, що значення для фільтрації відповідає типу вибраного ключа
function filterTasks(tasks, key, value) {
    return tasks.filter(task => task[key] === value);
}
// Демонстрація роботи
console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);
const taskDb = [
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
//# sourceMappingURL=task-2.js.map