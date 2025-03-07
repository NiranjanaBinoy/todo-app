import Task from "./Task.tsx";
import { Task as TaskType } from "../contexts/TaskContextProvider.tsx";

type TaskListPorps = {
    tasks: TaskType[];
}
const TaskList = ( { tasks }: TaskListPorps) => { 
    return(
        <>
        <ul className="tasks-list">
            {tasks.map((task) => {
                return (
                    <li key={Math.random()*task.id}>
                        <Task task={task}/>
                    </li>
                )
            })}
        </ul>
        </>
    );
}

export default TaskList;