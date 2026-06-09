import { useParams, useNavigate } from "react-router";
import type { Task, TaskStatus } from "../../types/task";

interface TaskDetailPageProps {
  tasks: Task[];
  onUpdate: (updatedTask: Task) => void;
}

export default function TaskDetailPage({ tasks, onUpdate }: TaskDetailPageProps) {
  // Дістаємо ID з URL (наприклад, /tasks/1 -> id = "1")
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Шукаємо потрібну задачу в масиві
  const task = tasks.find((t) => t.id === id);

  // Якщо хтось ввів неправильний ID в адресний рядок
  if (!task) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Задачу не знайдено 😢</h2>
        <button 
          onClick={() => navigate("/tasks")}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Повернутися до списку
        </button>
      </div>
    );
  }

  // Обробник зміни статусу в селекті
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    onUpdate({ ...task, status: newStatus });
  };

  return (
    <div style={{ background: "#fff", color: "#1e293b", padding: "2rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
      <button
        onClick={() => navigate("/tasks")}
        style={{ marginBottom: "1.5rem", padding: "0.4rem 0.8rem", cursor: "pointer", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#f8fafc" }}
      >
        ← Назад до списку
      </button>

      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{task.title}</h2>
      
      {task.description && (
        <p style={{ color: "#64748b", marginBottom: "1.5rem", lineHeight: "1.6" }}>
          {task.description}
        </p>
      )}

      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", padding: "1rem", background: "#f8fafc", borderRadius: "8px" }}>
        <div>
          <span style={{ color: "#64748b", display: "block", fontSize: "0.85rem" }}>Пріоритет</span>
          <strong>{task.priority === "high" ? "🔴 Високий" : task.priority === "medium" ? "🟡 Середній" : "🟢 Низький"}</strong>
        </div>
        <div>
          <span style={{ color: "#64748b", display: "block", fontSize: "0.85rem" }}>Створено</span>
          <strong>{task.createdAt.toLocaleDateString("uk-UA")}</strong>
        </div>
      </div>

      <div style={{ padding: "1rem", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
          Змінити статус виконання:
        </label>
        <select
          value={task.status}
          onChange={handleStatusChange}
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "1rem", width: "100%", maxWidth: "300px", cursor: "pointer" }}
        >
          <option value="todo">📌 Очікує</option>
          <option value="in-progress">⚙️ В роботі</option>
          <option value="done">✅ Виконано</option>
        </select>
      </div>
    </div>
  );
}