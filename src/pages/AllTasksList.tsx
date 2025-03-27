import TaskList from "../components/TaskList";
import { useTaskContext } from "../contexts/TaskContextProvider";

const AllTasksList = () => {
    const { state } = useTaskContext();
    return (
        <>
            <TaskList tasks={state.tasksList} />
        </>
    )
}

export default AllTasksList;