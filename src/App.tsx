
import { useEffect, useState } from 'react';
import './App.css';
import AddTask from './pages/AddTask.tsx';
import AllTasksList from './pages/AllTasksList.tsx';
import CompeletedTasksList from './pages/CompletedTasksList.tsx';
import PendingTasksList from './pages/PendingTasksList.tsx';
import { useTaskContext } from './contexts/TaskContextProvider.tsx';


function App() {
  const { setTodoFromLocalStorage } = useTaskContext();
  const [ tabSelected, setTabSelected] = useState<string>('all');

  useEffect(() => {
    setTodoFromLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleChange = (newValue: string) => {
    setTabSelected(newValue);
  }

  return (
    <main className='main'>
      <header>
        <h1 className="header">To-Do App</h1>
      </header>
      <div>
        <AddTask />
        <nav className='tabs'>
          <button className={`tab ${tabSelected === 'all' ? 'active' : ''}`} onClick={() => handleChange('all')}>All</button> 
          <button className={`tab ${tabSelected === 'pending' ? 'active' : ''}`} onClick={() => handleChange('pending')}>Pending</button>
          <button className={`tab ${tabSelected === 'completed' ? 'active' : ''}`} onClick={() => handleChange('completed')}>Completed</button>
        </nav>
        {tabSelected === 'all' ? <AllTasksList /> : undefined}
        {tabSelected === 'pending' ? <PendingTasksList /> : undefined}
        {tabSelected === 'completed' ? <CompeletedTasksList /> : undefined}
      </div>
    </main>
  );
}

export default App;
