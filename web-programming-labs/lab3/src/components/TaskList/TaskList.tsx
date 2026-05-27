import { Task, TaskStatus } from "../../types/task";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskList = ({ tasks, onDelete, onStatusChange }: TaskListProps) => {
  if (tasks.length === 0) {
    return <div className={styles.empty}>Задач немає. Додайте першу задачу!</div>;
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;