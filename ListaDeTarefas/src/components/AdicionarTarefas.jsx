import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

function AdicionarTarefas({onAddTaskClick}){
    const [titulo, setTitulo] = useState("");
    return (
        <div className = "space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
            <Input 
            type = "text" 
            placeholder = "Digite o título da tarefa" 
            value = {titulo}
            onChange = {(event) => setTitulo(event.target.value)}
            />
            <Button onClick = {() => {
                if(!titulo.trim()){
                    return alert("Preencha o nome da nova tarefa!");
                }
                onAddTaskClick(titulo)
                setTitulo("");
            }}>Adicionar</Button>
        </div>
    );
}

export default AdicionarTarefas;