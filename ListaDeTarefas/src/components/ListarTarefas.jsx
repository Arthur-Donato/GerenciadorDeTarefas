import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

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
            <Button onClick={() => onFilterAllTasks() } className = "bg-slate-400">Todas</Button>
            <Button onClick = {() => onFilterTaskCompleted()} className = "bg-slate-400">Concluídas</Button>
            <Button onClick = {() => onFilterTaskNotCompleted()} className = "bg-slate-400">Não concluídas</Button>
            {tarefasAuxiliar.map((T) => (
                <li key = {T.id} className = "flex gap-2">
                    <button onClick = {() => onTaskClick(T.id)} className = {`bg-slate-400 text-left w-full flex items-center gap-2 text-white p-2 rounded-md ${T.isCompleta && "line-through"}`}>
                        {T.titulo}
                    </button>
                    <Button onClick = {() => onEditTaskClick(T)}>
                        <Pencil />
                    </Button>
                    <Button onClick = {() => onDeleteClick(T.id)}>
                        <Trash2 />
                    </Button>
                    
                </li>
            ))} 
        </ul>
    );
}

export default ListarTarefas;