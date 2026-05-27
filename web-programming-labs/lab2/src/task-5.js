"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 5.2 Type guard функції (допомагають TypeScript зрозуміти точний тип)
function isLoadingState(state) {
    return state.status === "loading";
}
function isSuccessState(state) {
    return state.status === "success";
}
function isErrorState(state) {
    return state.status === "error";
}
// 5.3 Функція рендеру залежно від стану
function renderState(state, renderData) {
    if (isLoadingState(state)) {
        return "⏳ Завантаження...";
    }
    else if (isSuccessState(state)) {
        return `✅ Завантажено о ${state.loadedAt.toLocaleTimeString()}: ` + renderData(state.data);
    }
    else if (isErrorState(state)) {
        return `❌ Помилка ${state.code}: ${state.message}`;
    }
    return "Невідомий стан";
}
// 5.4 Функція з використанням typeof та перевіркою на null/undefined
function processValue(value) {
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
function getStatusLabel(status) {
    switch (status) {
        case "todo": return "До виконання";
        case "in_progress": return "В процесі";
        case "done": return "Готово";
        case "cancelled": return "Скасовано";
        default:
            // Цей блок гарантує, що ми обробили всі можливі статуси.
            // Якщо додати новий статус у тип Status і не додати сюди case, TS видасть помилку.
            const exhaustiveCheck = status;
            return exhaustiveCheck;
    }
}
// Демонстрація роботи
console.log("=== Завдання 5: Type Guards та звуження типів ===\n");
const states = [
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
const values = [
    "TypeScript", 42, true, null, undefined, 0, ""
];
values.forEach((v) => console.log(processValue(v)));
console.log("\n--- Exhaustive Check ---");
console.log(`Статус 'in_progress' -> ${getStatusLabel("in_progress")}`);
//# sourceMappingURL=task-5.js.map