import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";

function EditarTarefa({changeNameTask, tarefas}){
    const [searchParams] = useSearchParams();
    const tituloAntigo = searchParams.get("titulo");
    const idTarefa = searchParams.get("id"); 

    const [novoTitulo, setNovoTitulo] = useState("");

    const navigate = useNavigate();

    return (
        <div className = "w-screen h-screen bg-slate-700 flex  justify-center p-6">
            <div className = "space-y-4 w-[600px]">
                <Title className = "text-center font-bold text-3xl p-6 text-slate-200">Editar tarefa</Title>
                <h2 className = "text-center font-bold text-3xl p-6 text-slate-200">{tituloAntigo}</h2>
                <div className = "space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
                    <Input 
                    type = "text" 
                    placeholder = "Digite o novo título da tarefa" 
                    value = {novoTitulo}
                    onChange = {(event) => setNovoTitulo(event.target.value)}
                    />
                    <Button onClick = {() => {
                        if(!novoTitulo.trim()){
                            return alert("Preencha o nome da nova tarefa!");
                        }
                        changeNameTask(idTarefa, novoTitulo);
                        setNovoTitulo("");
                        navigate(`/`);
                        
                        
                    }}>Confirmar</Button>
                    <Button onClick={() => navigate(`/`)}>Voltar</Button>
                </div>
            </div>
            
        </div>
    );
}

export default EditarTarefa;