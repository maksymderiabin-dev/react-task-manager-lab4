"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 4.1 Абстрактний базовий клас (шаблон для всіх типів сповіщень)
class BaseNotifier {
    name;
    constructor(name) {
        this.name = name;
    }
    // Шаблонний метод — загальна логіка для всіх
    notify(to, subject, body) {
        console.log(`[${this.name}] Надсилання сповіщення...`);
        this.send(to, subject, body);
        console.log(`[${this.name}] Сповіщення надіслано\n`);
    }
}
// 4.2 Клас для відправки Email
class EmailNotifier extends BaseNotifier {
    smtpServer;
    constructor(smtpServer) {
        super("Email"); // Передаємо ім'я в базовий клас
        this.smtpServer = smtpServer;
    }
    send(to, subject, body) {
        console.log(`📧 Email → [${to}]: "${subject}" | Тіло: ${body.substring(0, 50)} через ${this.smtpServer}`);
    }
}
// 4.3 Клас для відправки SMS
class SmsNotifier extends BaseNotifier {
    phonePrefix;
    // Використовуємо значення за замовчуванням для префіксу
    constructor(phonePrefix = "+380") {
        super("SMS");
        this.phonePrefix = phonePrefix;
    }
    send(to, _subject, body) {
        // В SMS тема зазвичай не використовується, тому беремо тільки тіло
        console.log(`📱 SMS → ${this.phonePrefix}${to}: "${body.substring(0, 160)}"`);
    }
}
// 4.4 Функція для масової розсилки (Демонстрація поліморфізму)
function sendBulkNotification(notifiers, to, subject, body) {
    notifiers.forEach((notifier) => {
        notifier.notify(to, subject, body);
    });
}
// Демонстрація роботи
console.log("=== Завдання 4: Наслідування та поліморфізм ===\n");
// Створюємо масив з різних типів сповіщувачів
const notifiers = [
    new EmailNotifier("smtp.gmail.com"),
    new SmsNotifier(), // Використає префікс +380 за замовчуванням
    new SmsNotifier("+1") // Американський номер
];
// Відправляємо одне повідомлення через усі доступні канали
sendBulkNotification(notifiers, "user123@example.com", "Нова задача призначена", "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2026. Будь ласка, перевірте дашборд.");
//# sourceMappingURL=task-4.js.map