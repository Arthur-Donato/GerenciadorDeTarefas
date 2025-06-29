import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ListarTarefas({tarefasAuxiliar, onTaskClick, onDeleteClick, onEditTaskClick, onFilterTaskCompleted, onFilterTaskNotCompleted, onFilterAllTasks}){
    const navigate = useNavigate();

    function onEditTaskClick(tarefa){
        const query = new URLSearchParams();
        query.set("titulo", tarefa.titulo)
        query.set("id", tarefa.id)
        navigate(`/editar?${query.toString()}`)
    }
    return (
        
        <ul className = "space-y-4 p-6 bg-slate-100 rounded-md shadow space-x-0.5">
            <button onClick={() => onFilterAllTasks() } className = "bg-slate-400">Todas</button>
            <button onClick = {() => onFilterTaskCompleted()} className = "bg-slate-400">Concluídas</button>
            <button onClick = {() => onFilterTaskNotCompleted()} className = "bg-slate-400">Não concluídas</button>
            {tarefasAuxiliar.map((T) => (
                <li key = {T.id} className = "flex gap-2">
                    <button onClick = {() => onTaskClick(T.id)} className = {`bg-slate-400 p-2 rounded-md w-full text-left ${T.isCompleta && "line-through"}`}>
                        {T.titulo}
                    </button>
                    <button onClick = {() => onEditTaskClick(T)} className = "bg-slate-400">
                        <Pencil />
                    </button>
                    <button onClick = {() => onDeleteClick(T.id)} className = "bg-slate-400">
                        <Trash2 />
                    </button>
                    
                </li>
            ))} 
        </ul>
    );
}

export default ListarTarefas;