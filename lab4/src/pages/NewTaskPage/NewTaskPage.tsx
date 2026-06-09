import { useState } from "react";
import { useNavigate } from "react-router";
import type { Task, TaskPriority } from "../../types/task";

interface NewTaskPageProps {
  onAdd: (task: Task) => void;
}

export default function NewTaskPage({ onAdd }: NewTaskPageProps) {
  const navigate = useNavigate();
  
  // Стан для полів нашої форми
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки при відправці форми
    
    // Перевірка, щоб не створити порожню задачу
    if (!title.trim()) {
      alert("Будь ласка, введіть назву задачі!");
      return;
    }

    // Збираємо нову задачу до купи
    const newTask: Task = {
      id: Date.now().toString(), // Генеруємо унікальний ID з поточного часу
      title,
      description,
      priority,
      status: "todo", // Усі нові задачі автоматично отримують статус "Очікує"
      createdAt: new Date(),
    };

    onAdd(newTask); // Передаємо задачу нагору в App.tsx
    navigate("/tasks"); // Перекидаємо користувача назад до списку задач
  };

  return (
    <div style={{ background: "#fff", color: "#1e293b", padding: "2rem", borderRadius: "8px", border: "1px solid #e2e8f0", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>✨ Створити нову задачу</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Назва задачі:</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            placeholder="Наприклад: Написати юніт-тести"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Опис (необов'язково):</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", minHeight: "80px", resize: "vertical" }}
            placeholder="Деталі задачі..."
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Пріоритет:</label>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", cursor: "pointer" }}
          >
            <option value="low">🟢 Низький</option>
            <option value="medium">🟡 Середній</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button 
            type="submit"
            style={{ flex: 1, padding: "0.75rem", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            Зберегти
          </button>
          <button 
            type="button"
            onClick={() => navigate("/tasks")}
            style={{ padding: "0.75rem", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}