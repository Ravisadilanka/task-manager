import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

interface Task {
    key: string;
    task: string;
    category: string;
    priority: string;
    date: string;
  }

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

 
  return (
    <div style={{ justifyContent: "center", textAlign: 'center' }}>
        <Title>Tasks List</Title>
        <TaskForm/>
        <TaskList />
    </div>
  );
};

export default Home;
