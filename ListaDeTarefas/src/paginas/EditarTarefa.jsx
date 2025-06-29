import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditarTarefa({changeNameTask, tarefas}){
    const [searchParams] = useSearchParams();
    const tituloAntigo = searchParams.get("titulo");
    const idTarefa = searchParams.get("id"); 

    const [novoTitulo, setNovoTitulo] = useState("");

    const navigate = useNavigate();

    return (
        <div className = "w-screen h-screen bg-slate-700 flex  justify-center p-6">
            <div className = "space-y-4 w-[600px]">
                <h1 className = "text-center font-bold text-3xl p-6 text-slate-200">Editar tarefa</h1>
                <h2 className = "text-center font-bold text-3xl p-6 text-slate-200">{tituloAntigo}</h2>
                <div className = "space-y-4 p-6 bg-slate-100 rounded-md shadow flex flex-col">
                    <input 
                    type = "text" 
                    placeholder = "Digite o novo título da tarefa" 
                    className = "border border-slate-300 outline-slate-400 px-4 py-2 placeholder-slate-500 text-black p-6"
                    value = {novoTitulo}
                    onChange = {(event) => setNovoTitulo(event.target.value)}
                    />
                    <button onClick = {() => {
                        if(!novoTitulo.trim()){
                            return alert("Preencha o nome da nova tarefa!");
                        }
                        changeNameTask(idTarefa, novoTitulo);
                        setNovoTitulo("");
                        navigate(`/`);
                        
                        
                    }}
                        className = "bg-slate-400 text-white font-medium px-4 py-2 rounded-md">Confirmar</button>
                    <button onClick={() => navigate(`/`)} className="bg-slate-400 text-white font-medium px-4 py-2 rounded-md">Voltar</button>
                </div>
            </div>
            
        </div>
    );
}

export default EditarTarefa;