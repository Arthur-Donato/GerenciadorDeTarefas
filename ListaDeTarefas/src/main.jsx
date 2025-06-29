// main.jsx
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // O componente App agora é sua página inicial
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditarTarefa from './paginas/EditarTarefa.jsx'; // O componente EditarTarefa é uma página separada

// O componente Root é o ponto central onde o estado e as funções de manipulação são definidos.
// Ele envolve toda a lógica de roteamento e passa as props necessárias para as páginas.
function Root() {
  // Estado principal das tarefas
  const [tarefas, setTarefas] = useState(JSON.parse(localStorage.getItem("tarefas")) || []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
  }, [tarefas])

  // Estado auxiliar para filtragem de tarefas, inicializado com as tarefas principais
  const [tarefasAuxiliar, setTarefasAuxiliar] = useState(tarefas);

  // Função para alternar o status de conclusão de uma tarefa
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

  // Função para deletar uma tarefa
  function onDeleteClick(idTarefa) {
    const novaListaTarefas = tarefas.filter((tarefa) => tarefa.id !== idTarefa);
    setTarefas(novaListaTarefas);
    setTarefasAuxiliar(novaListaTarefas);
  }

  // Função para filtrar apenas tarefas concluídas
  function onFilterTaskCompleted() {
    const listaTarefasConcluidas = tarefas.filter((tarefa) => tarefa.isCompleta);
    setTarefasAuxiliar(listaTarefasConcluidas);
  }

  // Função para filtrar apenas tarefas não concluídas
  function onFilterTaskNotCompleted() {
    const listaTrefasNaoConcluidas = tarefas.filter((tarefa) => !tarefa.isCompleta);
    setTarefasAuxiliar(listaTrefasNaoConcluidas);
  }

  // Função para exibir todas as tarefas (reverte qualquer filtro)
  function onFilterAllTasks() {
    setTarefasAuxiliar(tarefas);
  }

  // Função para adicionar uma nova tarefa
  function onAddTaskClick(titulo) {
    const novaTarefa = {
      // Gera um ID único com base no maior ID existente, ou 1 se não houver tarefas
      id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
      titulo,
      isCompleta: false,
    };
    setTarefas([...tarefas, novaTarefa]); // Adiciona a nova tarefa à lista principal
    setTarefasAuxiliar([...tarefas, novaTarefa]); // Adiciona a nova tarefa à lista auxiliar
  }

  // Função para mudar o título de uma tarefa existente
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

  // Configuração do roteador usando createBrowserRouter
  const router = createBrowserRouter([
    {
      path: "/", // Rota para a página inicial
      element: (
        // Renderiza o componente App e passa todas as funções e estados como props
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
      path: "/editar", // Rota para a página de edição de tarefa
      element: <EditarTarefa tarefas={tarefas} changeNameTask={changeNameTask} />, // Renderiza EditarTarefa e passa a função de edição
    },
  ]);

  // O componente Root retorna o RouterProvider, que renderiza a rota ativa
  return <RouterProvider  router={router} />;
}

// Renderiza o componente Root no elemento 'root' do HTML
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root /> {/* Renderiza o componente Root que contém o roteador e o estado */}
  </StrictMode>,
);
