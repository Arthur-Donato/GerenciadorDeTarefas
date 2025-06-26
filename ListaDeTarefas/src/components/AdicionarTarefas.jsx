import { useState } from "react";

function AdicionarTarefas({onAddTaskClick}){
    const [titulo, setTitulo] = useState("");
    return (
        <div className = "space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
            <input 
            type = "text" 
            placeholder = "Digite o título da tarefa" 
            className = "border border-slate-300 outline-slate-400 px-4 py-2 placeholder-slate-500 text-black"
            value = {titulo}
            onChange = {(event) => setTitulo(event.target.value)}
            />
            <button onClick = {() => {
                if(!titulo.trim()){
                    return alert("Preencha o nome da nova tarefa!");
                }
                onAddTaskClick(titulo)
                setTitulo("");
            }}
                className = "bg-slate-400 text-white font-medium px-4 py-2 rounded-md">Adicionar</button>
        </div>
    );
}

export default AdicionarTarefas;