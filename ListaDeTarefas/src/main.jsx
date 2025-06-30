// main.jsx
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditarTarefa from './paginas/EditarTarefa.jsx';

import { Provider } from 'react-redux'; 
import store from './store'; 
import { useSelector } from 'react-redux'; 

function Root() {
  const allTasks = useSelector((state) => state.tasks.list);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(allTasks));
  }, [allTasks]); 

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <App/>
      ),
    },
    {
      path: "/editar",
      element: (
        <EditarTarefa/>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {}
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
);