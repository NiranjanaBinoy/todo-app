import ListTask from "./TaskList";
import { useTaskContext } from "../contexts/TaskContextProvider";

const PendingTasksList = () => {
    const { state } = useTaskContext();
    const pendingTasks = state.tasksList.filter(task => !task.completed);
    return (
        <>
            <header>
                <h3>Pending Task List - {pendingTasks.length}</h3>
            </header>
            <ListTask tasks={pendingTasks} />
        </>
    );
}

export default PendingTasksList;