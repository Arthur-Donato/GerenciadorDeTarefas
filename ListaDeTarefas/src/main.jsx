// main.jsx
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';cial
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditarTarefa from './paginas/EditarTarefa.jsx';

function Root() {
  const [tarefas, setTarefas] = useState(JSON.parse(localStorage.getItem("tarefas")) || []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
  }, [tarefas])

  const [tarefasAuxiliar, setTarefasAuxiliar] = useState(tarefas);

  function onTaskClick(idTarefa) {
    const novaListaTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === idTarefa) {
        return { ...tarefa, isCompleta: !tarefa.isCompleta };
      }
      return tarefa;
    });
    setTarefas(novaListaTarefas);
    setTarefasAuxiliar(novaListaTarefas);
  }

  function onDeleteClick(idTarefa) {
    const novaListaTarefas = tarefas.filter((tarefa) => tarefa.id !== idTarefa);
    setTarefas(novaListaTarefas);
    setTarefasAuxiliar(novaListaTarefas);
  }

  function onFilterTaskCompleted() {
    const listaTarefasConcluidas = tarefas.filter((tarefa) => tarefa.isCompleta);
    setTarefasAuxiliar(listaTarefasConcluidas);
  }

  function onFilterTaskNotCompleted() {
    const listaTrefasNaoConcluidas = tarefas.filter((tarefa) => !tarefa.isCompleta);
    setTarefasAuxiliar(listaTrefasNaoConcluidas);
  }

  function onFilterAllTasks() {
    setTarefasAuxiliar(tarefas);
  }

  function onAddTaskClick(titulo) {
    const novaTarefa = {
      id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
      titulo,
      isCompleta: false,
    };
    setTarefas([...tarefas, novaTarefa]);
    setTarefasAuxiliar([...tarefas, novaTarefa]);
  }

  function changeNameTask(idTarefa, novoTitulo) {
    const novaListaTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === Number(idTarefa)) {
        console.log("Editando o titulo da tarefa")
        return{...tarefa, titulo: novoTitulo};
      }
      return tarefa;
    });
    setTarefas(novaListaTarefas);
    setTarefasAuxiliar(novaListaTarefas);
    
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <App
          tarefas={tarefas}
          tarefasAuxiliar={tarefasAuxiliar}
          onTaskClick={onTaskClick}
          onDeleteClick={onDeleteClick}
          onFilterTaskCompleted={onFilterTaskCompleted}
          onFilterTaskNotCompleted={onFilterTaskNotCompleted}
          onFilterAllTasks={onFilterAllTasks}
          onAddTaskClick={onAddTaskClick}
        />
      ),
    },
    {
      path: "/editar",
      element: <EditarTarefa tarefas={tarefas} changeNameTask={changeNameTask} />,
    },
  ]);

  return <RouterProvider  router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root /> {}
  </StrictMode>,
);
