
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; 
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTaskCompletion,
  deleteTask,
  filterCompletedTasks,
  filterNotCompletedTasks,
  filterAllTasks,
} from '../store';

function ListarTarefas(){
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const tarefasParaExibir = useSelector((state) => state.tasks.filteredList);

  function handleEditTaskClick(tarefa){ 
    const query = new URLSearchParams();
    query.set("titulo", tarefa.titulo)
    query.set("id", tarefa.id)
    navigate(`/editar?${query.toString()}`)
  }

  const handleFilterAllTasks = () => {
    dispatch(filterAllTasks());
  };

  const handleFilterTaskCompleted = () => {
    dispatch(filterCompletedTasks());
  };

  const handleFilterTaskNotCompleted = () => {
    dispatch(filterNotCompletedTasks());
  };

  const handleTaskClick = (idTarefa) => {
    dispatch(toggleTaskCompletion(idTarefa));
  };

  const handleDeleteClick = (idTarefa) => {
    dispatch(deleteTask(idTarefa));
  };

  if (!Array.isArray(tarefasParaExibir)) {
    console.warn("Tarefas para exibir não é um array ou ainda não foi carregado.", tarefasParaExibir);
    return <p>Carregando tarefas ou nenhuma tarefa encontrada...</p>;
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-100 rounded-md shadow space-x-0.5">
      {}
      <Button onClick={handleFilterAllTasks} className="bg-slate-400">Todas</Button>
      <Button onClick={handleFilterTaskCompleted} className="bg-slate-400">Concluídas</Button>
      <Button onClick={handleFilterTaskNotCompleted} className="bg-slate-400">Não concluídas</Button>

      {}
      {tarefasParaExibir.map((T) => (
        <li key={T.id} className="flex gap-2">
          <button
            onClick={() => handleTaskClick(T.id)} 
            className={`bg-slate-400 text-left w-full flex items-center gap-2 text-white p-2 rounded-md ${T.isCompleta ? "line-through" : ""}`}
          >
            {T.titulo}
          </button>
          <Button onClick={() => handleEditTaskClick(T)}> {}
            <Pencil />
          </Button>
          <Button onClick={() => handleDeleteClick(T.id)}> {}
            <Trash2 />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default ListarTarefas;