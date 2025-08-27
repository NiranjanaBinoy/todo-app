import { Context, createContext, ReactNode, useContext, useReducer } from "react"

export type Task = {
  id: number;
  taskName: string;
  completed: boolean;
}

type State = {
  tasksList: Task[];
}

type Action = {
  type: string;
  payload?: Task | Task[];
}

type TaskContextType = {
  state: State;
  setTodoFromLocalStorage: () => void;
  updateTask: (taskName: string) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void
  deleteCompleted: () => void
}

const taskReducerFunction = (state: State, action: Action): State => {
  switch(action.type){
    case "add": {
      if(action.payload && !Array.isArray(action.payload)) {
        return {...state, tasksList: [...state.tasksList, action.payload]}
      }
      break;
    }
    case "complete":
    case "delete":
    case "deleteCompleted":
    case "reloadTasks": {
      if(action.payload && Array.isArray(action.payload)) {
        return {...state, tasksList: [...action.payload]}
      }
      break;
    }
    default: 
      return state;
  }
  return state; // Ensure a return statement at the end
}

const initialState: State = {
  tasksList: []
}

const TaskContext: Context<TaskContextType> = createContext({
  state: initialState,
  setTodoFromLocalStorage: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTask: (_taskName: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  completeTask: (_task: Task) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteTask: (_task: Task) => {},
  deleteCompleted: () => {}
})

const TaskContextProvider = ({children}: {children: ReactNode}) => {
    const[state, dispatch] = useReducer(taskReducerFunction, initialState);
    
    const setTodoFromLocalStorage = () => {
      const tasksFromLocalStorage = localStorage.getItem('tasks-todo');
      if(tasksFromLocalStorage) {
        const parsedTasks: Task[] = JSON.parse(tasksFromLocalStorage);
        dispatch({type: 'reloadTasks', payload: parsedTasks})
      }
    };

    const updateTaskList = (taskName: string) => {
        const task = {
          id: state.tasksList.length+1,
          taskName: taskName,
          completed: false
        }
        dispatch({type: 'add', payload: task});
        localStorage.setItem('tasks-todo', JSON.stringify([...state.tasksList, task]));
    }

    const completeTask = ( task: Task ) => {
        const taskList = state.tasksList.filter((tk) => tk.id !==task?.id )
        dispatch({type:'complete', payload: [...taskList, {...task, completed: true}]})
        localStorage.setItem('tasks-todo', JSON.stringify([...taskList, {...task, completed: true}]));
    };

    const deleteTask = (task: Task) => {
        const taskList = state.tasksList.filter((tk) => tk.id !== task.id)
        dispatch({type:'delete', payload: taskList})
        localStorage.setItem('tasks-todo', JSON.stringify(taskList));
    };
    const deleteCompleted = () => {
      const taskList = state.tasksList.filter((task) => !task.completed)
      dispatch({type:'deleteCompleted', payload: taskList})
      localStorage.setItem('tasks-todo', JSON.stringify(taskList));
  };

    const taskContext: TaskContextType = {
        state: state,
        setTodoFromLocalStorage: setTodoFromLocalStorage,
        updateTask: updateTaskList,
        completeTask: completeTask,
        deleteTask: deleteTask,
        deleteCompleted: deleteCompleted,
    }
    return <TaskContext.Provider value={taskContext}>
        {children}
    </TaskContext.Provider>
}

const useTaskContext = () => {
    return useContext(TaskContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { useTaskContext, TaskContextProvider};