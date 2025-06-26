import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Importe Routes e Route
import AdicionarTarefas from "./components/AdicionarTarefas";
import ListarTarefas from "./components/ListarTarefas";
import EditarTarefa from './paginas/EditarTarefa';

function App(){
  const [tarefas, setTarefas] = useState([{
    id: 1,
    titulo: "Terminar projeto",
    isCompleta: false,
  }, { 
    id: 2,
    titulo: "Estudar para APS",
    isCompleta: false,
  }]);

  const [tarefasAuxiliar, setTarefasAuxiliar] = useState(tarefas);

  function onTaskClick(idTarefa) {
    const novaListaTarefas = tarefas.map((tarefa) => {
      if(tarefa.id === idTarefa){
        return {...tarefa, isCompleta: !tarefa.isCompleta };
      }

      return tarefa;
    });

    setTarefas(novaListaTarefas);
    setTarefasAuxiliar(novaListaTarefas);
  }

  function onDeleteClick(idTarefa){
    const novaListaTarefas = tarefas.filter((tarefa) => tarefa.id !==  idTarefa)

    setTarefas(novaListaTarefas);
    setTarefasAuxiliar(novaListaTarefas);
  }

  function onFilterTaskCompleted(){
    const listaTarefasConcluidas = tarefas.filter((tarefa) => tarefa.isCompleta);

    setTarefasAuxiliar(listaTarefasConcluidas);
  }
  
  function onFilterTaskNotCompleted(){
    const listaTrefasNaoConcluidas = tarefas.filter((tarefa) => !tarefa.isCompleta);

    setTarefasAuxiliar(listaTrefasNaoConcluidas);
  }

  function onFilterAllTasks(){
    setTarefasAuxiliar(tarefas);
  }

  function onAddTaskClick(titulo){
    const novaTarefa = {
      id: tarefas.length + 1,
      titulo,
      isCompleta: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTarefasAuxiliar([...tarefas, novaTarefa]);
  }

  function changeNameTask(idTarefa, novoTitulo){
    const novaListatarefas = tarefas.map((tarefa) => {
      if(tarefa.id === idTarefa){
        return {...tarefa, titulo: novoTitulo};
      }
      return tarefa;
    })

    setTarefas(novaListatarefas);
    setTarefasAuxiliar(novaListatarefas);
  }

  return (
    <div className = "w-screen h-screen bg-slate-700 flex justify-center p-6">
      <div className = "w-[600px] space-y-4">
        <h1 className = "text-3xl font-bold text-center text-slate-200">Gerenciador de Tarefas</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          />
          {/* Agora passamos changeNameTask como prop para EditarTarefa */}
          <Route
            path="/editar"
            element={<EditarTarefa changeNameTask={changeNameTask} />}
          />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;