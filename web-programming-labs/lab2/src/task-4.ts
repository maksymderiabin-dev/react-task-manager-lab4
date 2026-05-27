export {};

// 4.1 Абстрактний базовий клас (шаблон для всіх типів сповіщень)
abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  // Абстрактний метод — кожен нащадок має реалізувати його по-своєму
  abstract send(to: string, subject: string, body: string): void;

  // Шаблонний метод — загальна логіка для всіх
  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано\n`);
  }
}

// 4.2 Клас для відправки Email
class EmailNotifier extends BaseNotifier {
  constructor(private readonly smtpServer: string) {
    super("Email"); // Передаємо ім'я в базовий клас
  }

  send(to: string, subject: string, body: string): void {
    console.log(`📧 Email → [${to}]: "${subject}" | Тіло: ${body.substring(0, 50)} через ${this.smtpServer}`);
  }
}

// 4.3 Клас для відправки SMS
class SmsNotifier extends BaseNotifier {
  // Використовуємо значення за замовчуванням для префіксу
  constructor(private readonly phonePrefix: string = "+380") {
    super("SMS");
  }

  send(to: string, _subject: string, body: string): void {
    // В SMS тема зазвичай не використовується, тому беремо тільки тіло
    console.log(`📱 SMS → ${this.phonePrefix}${to}: "${body.substring(0, 160)}"`);
  }
}

// 4.4 Функція для масової розсилки (Демонстрація поліморфізму)
function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void {
  notifiers.forEach((notifier) => {
    notifier.notify(to, subject, body);
  });
}

// Демонстрація роботи
console.log("=== Завдання 4: Наслідування та поліморфізм ===\n");

// Створюємо масив з різних типів сповіщувачів
const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(), // Використає префікс +380 за замовчуванням
  new SmsNotifier("+1") // Американський номер
];

// Відправляємо одне повідомлення через усі доступні канали
sendBulkNotification(
  notifiers,
  "user123@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2026. Будь ласка, перевірте дашборд."
);