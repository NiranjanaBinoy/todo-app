import { Task as TaskType, useTaskContext } from "../contexts/TaskContextProvider.tsx";

type TaskProps = {
    task: TaskType;
}
const Task = ({ task }: TaskProps) => {
    const { taskName, completed } = task;
    const { completeTask, deleteTask } = useTaskContext();

    const handleCompletion = () => {
        completeTask(task)
    }

    const handleDeletion = () => {
        deleteTask(task)
    }

    return (
        <>
            <div className="list-button">
                <button className={`task-button ${completed ? 'completed' : ''}`} onClick={handleCompletion}>{taskName}</button>
                <button className='delete-task' aria-label="delete" onClick={handleDeletion}>X</button>
            </div>
        </>
    )
}

export default Task;