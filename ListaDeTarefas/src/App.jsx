import { useState } from "react";
import AdicionarTarefas from "./components/AdicionarTarefas";
import ListarTarefas from "./components/ListarTarefas";

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

  function onEditTaskClick(idTarefa, novoTitulo){
    const listaDeTarefas = tarefas.map((tarefa) => {
        if(tarefa.id === idTarefa){
          return {...tarefa, titulo: novoTitulo};
        }

        return tarefa;
      })

      setTarefas(listaDeTarefas);
      
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

  return (
    <div className = "w-screen h-screen bg-slate-700 flex justify-center p-6">
      <div className = "w-[600px] space-y-4">
        <h1 className = "text-3xl font-bold text-center text-slate-200">Gerenciador de Tarefas</h1>
        <AdicionarTarefas  onAddTaskClick = {onAddTaskClick} />
        <ListarTarefas tarefas  = {tarefas} tarefasAuxiliar = {tarefasAuxiliar} onTaskClick = {onTaskClick} onDeleteClick = {onDeleteClick} onEditTaskClick = {onEditTaskClick} onFilterTaskCompleted = {onFilterTaskCompleted} onFilterTaskNotCompleted = {onFilterTaskNotCompleted} onFilterAllTasks = {onFilterAllTasks} />
      </div>
    </div>
    
  );
}

export default App;