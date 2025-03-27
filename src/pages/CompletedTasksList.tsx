// import ClearButton from "../components/ClearButton";
import TaskList from "../components/TaskList";
import { useTaskContext } from "../contexts/TaskContextProvider";

const CompeletedTasksList = () => {
    const { state } = useTaskContext();
    const completedTasks = state.tasksList.filter(task => task.completed);

    // const handleDeletCompleted = () => {
    //     deleteCompleted();
    // }
    return (
        <>
            <TaskList tasks={completedTasks} />
            {/* <ClearButton handleDeletion={handleDeletCompleted} /> */}
        </>
    )
}

export default CompeletedTasksList;