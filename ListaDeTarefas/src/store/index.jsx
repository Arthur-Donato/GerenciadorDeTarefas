
import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialTasks = JSON.parse(localStorage.getItem("tarefas")) || [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: initialTasks,
    filteredList: initialTasks,
    inputValue: '' 
  },
  reducers: {
    
    addTask: (state, action) => {
      const newId = state.list.length > 0 ? Math.max(...state.list.map(t => t.id)) + 1 : 1;
      const newTask = {
        id: newId,
        titulo: action.payload,
        isCompleta: false,
      };
      state.list.push(newTask);
      state.filteredList.push(newTask);
      state.inputValue = '';
    },

    
    toggleTaskCompletion: (state, action) => {
      const idToToggle = action.payload;
      const task = state.list.find(t => t.id === idToToggle);
      if (task) {
        task.isCompleta = !task.isCompleta;
      }
      
      const filteredTask = state.filteredList.find(t => t.id === idToToggle);
      if (filteredTask) {
        filteredTask.isCompleta = !filteredTask.isCompleta;
      }
    },

    
    deleteTask: (state, action) => {
      const idToDelete = action.payload;
      state.list = state.list.filter(task => task.id !== idToDelete);
      state.filteredList = state.filteredList.filter(task => task.id !== idToDelete);
    },

    
    editTaskTitle: (state, action) => {
      const { id, newTitle } = action.payload;
      const task = state.list.find(t => t.id === Number(id));
      if (task) {
        task.titulo = newTitle;
      }
      const filteredTask = state.filteredList.find(t => t.id === Number(id));
      if (filteredTask) {
        filteredTask.titulo = newTitle;
      }
    },

    
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },

    
    filterCompletedTasks: (state) => {
      state.filteredList = state.list.filter(task => task.isCompleta);
    },

    
    filterNotCompletedTasks: (state) => {
      state.filteredList = state.list.filter(task => !task.isCompleta);
    },

    
    filterAllTasks: (state) => {
      state.filteredList = state.list;
    },

    syncTasksWithLocalStorage: (state) => {
    }
  }
});


export const {
  addTask,
  toggleTaskCompletion,
  deleteTask,
  editTaskTitle,
  setInputValue,
  filterCompletedTasks,
  filterNotCompletedTasks,
  filterAllTasks,
  syncTasksWithLocalStorage 
} = tasksSlice.actions;


const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export default store;