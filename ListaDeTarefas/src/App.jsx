
import React from 'react';
import AdicionarTarefas from "./components/AdicionarTarefas";
import ListarTarefas from "./components/ListarTarefas";
import Title from './components/Title';

function App({ 
  tarefas, 
  tarefasAuxiliar, 
  onTaskClick, 
  onDeleteClick, 
  onFilterTaskCompleted, 
  onFilterTaskNotCompleted, 
  onFilterAllTasks, 
  onAddTaskClick 
}) {
  return (
    <div className="w-screen h-screen bg-slate-700 flex justify-center p-6">
      <div className="w-[600px] space-y-4">
        <Title className="text-3xl font-bold text-center text-slate-200">Gerenciador de Tarefas</Title>
        
        {}
        <AdicionarTarefas onAddTaskClick={onAddTaskClick} />
        <ListarTarefas
          tarefas={tarefas}
          tarefasAuxiliar={tarefasAuxiliar}
          onTaskClick={onTaskClick}
          onDeleteClick={onDeleteClick}
          onFilterTaskCompleted={onFilterTaskCompleted}
          onFilterTaskNotCompleted={onFilterTaskNotCompleted}
          onFilterAllTasks={onFilterAllTasks}
        />
      </div>
    </div>
  );
}

export default App;