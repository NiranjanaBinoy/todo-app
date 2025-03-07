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
  payload: Task;
}

type TaskContextType = {
  state: State;
  updateTask: (taskName: string) => void;
  completeTask: (task: Task) => void;
}

const taskReducerFunction = (state: State, action: Action): State => {
  switch(action.type){
    case "add": return {...state, tasksList: [...state.tasksList, action.payload]}
    case "complete": {
        const taskList = state.tasksList.filter((task) => task.id !== action.payload.id )
        return {...state, tasksList: [...taskList, action.payload]}
    }
    default: return state;
  }
}

const initialState: State = {
  tasksList: []
}

const TaskContext: Context<TaskContextType> = createContext({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTask: (_taskName: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  completeTask: (_task: Task) => {}
})

const TaskContextProvider = ({children}: {children: ReactNode}) => {
    const[state, dispatch] = useReducer(taskReducerFunction, initialState);
    
    const updateTaskList = (taskName: string) => {
        const task = {
          id: state.tasksList.length+1,
          taskName: taskName,
          completed: false
        }
        dispatch({type: 'add', payload: task})
    }

    const completeTask = ( task: Task ) => {
        dispatch({type:'complete', payload: {...task, completed: true}})
    };

    const taskContext: TaskContextType = {
        state: state,
        updateTask: updateTaskList,
        completeTask: completeTask,
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