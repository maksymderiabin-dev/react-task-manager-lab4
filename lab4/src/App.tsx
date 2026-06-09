import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout/Layout"; // <--- ДОДАЛИ ІМПОРТ НАШОГО LAYOUT
import type { Task } from "./types/task";
import { INITIAL_TASKS } from "./data/initialTasks";
import TasksPage from "./pages/TasksPage/TasksPage";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";
import NewTaskPage from "./pages/NewTaskPage/NewTaskPage";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const updateTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          
          <Route 
            path="tasks" 
            element={<TasksPage tasks={tasks} onDelete={deleteTask} />} 
/>
          <Route 
            path="tasks/new" 
            element={<NewTaskPage onAdd={addTask} />} 
/>
          <Route 
            path="tasks/:id" 
            element={<TaskDetailPage tasks={tasks} onUpdate={updateTask} />} 
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}