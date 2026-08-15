import { useState } from 'react';
import TaskItem from '../../components/TaskItem';
import UserProfile from '../../components/UserProfile';
import FilterButtons from '../../components/FilterButtons';
import filterTasks from '../../utils/filterTasks';
import useTaskData from '../../hooks/useTaskData';

export default function StudentWork() {
  //  #1: Data fetching + state + UI logic all mixed together

  const { tasks, loading } = useTaskData();
  const [filter, setFilter] = useState('all');

  // #2: Filtering logic inside component
  const visibleTasks = filterTasks(tasks, filter);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      {/* #3: Hardcoded UI, not reusable */}
      <UserProfile name="Student" />

      {/* #4: Repeated button JSX */}
      <FilterButtons filter={filter} onFilterChange={setFilter} />

      {/* #5: Inline list rendering */}
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
