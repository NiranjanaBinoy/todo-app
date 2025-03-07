import { ChangeEvent, useState } from "react";
import { useTaskContext } from "../contexts/TaskContextProvider.tsx";

const AddTask = () =>{
    const[task, setTask] = useState('');
    const { updateTask } = useTaskContext();

    const addTask = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    const handleTaskSubmition = () => {
        if(task === '') return;
    
        updateTask(task);
        setTask('');
    }

    return(
        <>
            <input type="text" onChange={addTask} value={task}/>
            <button className="add-button" type="button" onClick={handleTaskSubmition}>+</button>
        </>
    )
}

export default AddTask;