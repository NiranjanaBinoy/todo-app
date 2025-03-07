import { Task as TaskType, useTaskContext } from "../contexts/TaskContextProvider.tsx";

type TaskProps = {
    task: TaskType;
}
const Task = ({ task }: TaskProps) => {
    const { taskName, completed } = task;
    const { completeTask } = useTaskContext();

    const handleChecked = () => {
        completeTask(task)
    }

    return (
        <>
            <button className="list-button" disabled={completed}>
                <input type="checkbox" checked={completed} onChange={handleChecked} disabled={completed}/> 
                <div className={`task-value ${completed ? 'completed' : ''}`}>{taskName}</div>
            </button>
        </>
    )
}

export default Task;