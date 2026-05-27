"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 3.1 Базовий клас менеджера задач
class TaskManager {
    // Приватні поля (доступні тільки всередині цього класу)
    #tasks;
    #nextId;
    constructor(initialTasks = []) {
        this.#tasks = [...initialTasks];
        // Шукаємо максимальний ID серед існуючих, щоб продовжити нумерацію, або починаємо з 1
        this.#nextId = initialTasks.length > 0
            ? Math.max(...initialTasks.map(t => t.id)) + 1
            : 1;
    }
    addTask(dto) {
        const newTask = {
            ...dto,
            id: this.#nextId++, // Присвоюємо ID та збільшуємо лічильник
            createdAt: new Date(),
        };
        this.#tasks.push(newTask);
        return newTask;
    }
    updateTask(id, updates) {
        const taskIndex = this.#tasks.findIndex(t => t.id === id);
        if (taskIndex === -1)
            return null; // Якщо не знайдено, повертаємо null
        // Оновлюємо знайдену задачу новими даними
        this.#tasks[taskIndex] = { ...this.#tasks[taskIndex], ...updates };
        return this.#tasks[taskIndex];
    }
    deleteTask(id) {
        const initialLength = this.#tasks.length;
        this.#tasks = this.#tasks.filter(t => t.id !== id);
        return this.#tasks.length < initialLength; // true, якщо видалили
    }
    // Геттер для отримання копії масиву задач (щоб не мутувати оригінал ззовні)
    get tasks() {
        return [...this.#tasks];
    }
    // Геттер для кількості задач
    get count() {
        return this.#tasks.length;
    }
    getById(id) {
        return this.#tasks.find(t => t.id === id);
    }
}
// 3.2 Клас-нащадок з додатковими фільтрами
class FilteredTaskManager extends TaskManager {
    getByStatus(status) {
        return this.tasks.filter(t => t.status === status);
    }
    getByPriority(priority) {
        return this.tasks.filter(t => t.priority === priority);
    }
    getByAssignee(assignee) {
        return this.tasks.filter(t => t.assignee === assignee);
    }
    getOverdue() {
        const now = new Date();
        return this.tasks.filter(t => t.dueDate &&
            t.dueDate < now &&
            t.status !== "done" &&
            t.status !== "cancelled");
    }
}
// Демонстрація роботи
console.log("=== Завдання 3: Класи та модифікатори доступу ===");
const manager = new FilteredTaskManager();
const task1 = manager.addTask({
    title: "Розробити API",
    description: "REST API для задач",
    status: "in_progress",
    priority: "high",
    assignee: "Іван",
    dueDate: new Date("2026-06-01"),
});
const task2 = manager.addTask({
    title: "Написати SQL запити",
    description: "Створити міграції бази даних",
    status: "todo",
    priority: "medium",
    assignee: "Петро",
    dueDate: new Date("2026-05-20"), // Минула дата для тесту прострочення
});
const task3 = manager.addTask({
    title: "Дизайн UI",
    description: "Макет у Figma",
    status: "done",
    priority: "low",
    assignee: "Анна",
    dueDate: null,
});
console.log("Додано задачу:", task1.title);
console.log("Загальна кількість задач:", manager.count);
manager.updateTask(task1.id, { status: "done" });
console.log("Статус першої задачі після оновлення:", manager.getById(task1.id)?.status);
console.log("\nПрострочені задачі:");
console.log(manager.getOverdue());
//# sourceMappingURL=task-3.js.map