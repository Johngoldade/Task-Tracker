// Import node packages
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// Import pages
import App from './App.tsx';
import Board from './pages/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';

// Create react router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />
      }, 
      {
        path: '/edit',
        element: <EditTicket />
      },
      {
        path: '/create',
        element: <CreateTicket />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])


// Find root element and render page to it
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
