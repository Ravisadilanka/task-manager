import { createSlice } from "@reduxjs/toolkit";

interface Task {
  key: string;
  task: string;
  category: string;
  priority: string;
  date: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState : TaskState = {
    tasks: []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) => 
                task.key === action.payload.key ? { ...task, ...action.payload} : task
            )
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.key !== action.payload)
        }
    }
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer