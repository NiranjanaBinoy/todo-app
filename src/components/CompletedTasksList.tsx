import ListTask from "./TaskList";
import { useTaskContext } from "../contexts/TaskContextProvider";

const CompeletedTasksList = () => {
    const { state } = useTaskContext();
    const completedTasks = state.tasksList.filter(task => task.completed);
    return (
        <>
            <header>
                <h3>Completed Tasks - {completedTasks.length}</h3>
            </header>
            <ListTask tasks={completedTasks} />
        </>
    );
}

export default CompeletedTasksList;