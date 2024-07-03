import React, { useState } from 'react';
import styled from 'styled-components';

const TaskInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${props => props.theme.textColor};
  border-radius: 4px;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.textColor};
`;

const TaskButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
`;

const TaskItem = styled.li`
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

function Planner() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <TaskInput 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <TaskButton onClick={addTask}>Add Task</TaskButton>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            {task.text}
            <DeleteButton onClick={() => deleteTask(task.id)}>×</DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
    </>
  );
}

export default Planner;