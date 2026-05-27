import { Task, TaskStatus } from "../../types/task";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskCard = ({ task, onDelete, onStatusChange }: TaskCardProps) => {
  // Визначаємо клас для бейджика пріоритету
  const priorityClass = styles[`priority_${task.priority}`];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <span className={`${styles.badge} ${priorityClass}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && <p className={styles.description}>{task.description}</p>}
      
      <div className={styles.actions}>
        {task.status !== "todo" && (
          <button className={styles.btnStatus} onClick={() => onStatusChange(task.id, "todo")}>
            У Нові
          </button>
        )}
        {task.status !== "in-progress" && (
          <button className={styles.btnStatus} onClick={() => onStatusChange(task.id, "in-progress")}>
            В роботу
          </button>
        )}
        {task.status !== "done" && (
          <button className={styles.btnStatus} onClick={() => onStatusChange(task.id, "done")}>
            Виконано
          </button>
        )}
        <button className={styles.btnDelete} onClick={() => onDelete(task.id)}>
          Видалити
        </button>
      </div>
    </div>
  );
};

export default TaskCard;