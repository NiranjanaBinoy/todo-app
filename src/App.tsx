import './App.css';
import AddTask from './components/AddTask.tsx';
import CompeletedTasksList from './components/CompletedTasksList.tsx';
import PendingTasksList from './components/PendingTasksList.tsx';
import { TaskContextProvider } from './contexts/TaskContextProvider.tsx';


function App() {
  return (
    <TaskContextProvider>
      <div className='main'>
        <header>
          <h1 className="header">To-Do App</h1>
        </header>
        <div>
          <AddTask />
          <PendingTasksList />
          <CompeletedTasksList />
        </div>
      </div>
    </TaskContextProvider>
  );
}

export default App;
