
import React from 'react'; // Adicione React se estiver usando JSX sem ser na versão 17+
import AdicionarTarefas from "./components/AdicionarTarefas";
import ListarTarefas from "./components/ListarTarefas";

// O componente App agora recebe todas as funções e estados como props do main.jsx
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
    // Seu layout principal (background, centralização) permanece aqui
    <div className="w-screen h-screen bg-slate-700 flex justify-center p-6">
      <div className="w-[600px] space-y-4">
        <h1 className="text-3xl font-bold text-center text-slate-200">Gerenciador de Tarefas</h1>
        
        {/* Apenas renderize os componentes da página inicial */}
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