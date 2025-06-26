import { Trash2, Pencil } from "lucide-react";

function ListarTarefas({tarefasAuxiliar, onTaskClick, onDeleteClick, onEditTaskClick, onFilterTaskCompleted, onFilterTaskNotCompleted, onFilterAllTasks}){
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
                    <button onClick = {() => onEditTaskClick(T.id)} className = "bg-slate-400">
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