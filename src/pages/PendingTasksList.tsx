import TaskList from "../components/TaskList";
import { useTaskContext } from "../contexts/TaskContextProvider";

const PendingTasksList = () => {
    const { state } = useTaskContext();
    const pendingTasks = state.tasksList.filter(task => !task.completed);
    return <TaskList tasks={pendingTasks} />
}

export default PendingTasksList;