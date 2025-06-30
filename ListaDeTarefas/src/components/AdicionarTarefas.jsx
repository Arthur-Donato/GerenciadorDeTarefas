
import React from "react"; 
import Button from "./Button";
import Input from "./Input";


import { useSelector, useDispatch } from 'react-redux';
import { addTask, setInputValue } from '../store'; 

function AdicionarTarefas(){
    const titulo = useSelector((state) => state.tasks.inputValue);
    const dispatch = useDispatch(); 

    const handleInputChange = (event) => {
        dispatch(setInputValue(event.target.value)); 
    };

    const handleAddTask = () => {
        if(!titulo.trim()){
            return alert("Preencha o nome da nova tarefa!");
        }
        
        dispatch(addTask(titulo));
    };

    return (
        <div className="space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
            <Input
                type="text"
                placeholder="Digite o título da tarefa"
                value={titulo} 
                onChange={handleInputChange} 
            />
            <Button onClick={handleAddTask}> {}
                Adicionar
            </Button>
        </div>
    );
}

export default AdicionarTarefas;