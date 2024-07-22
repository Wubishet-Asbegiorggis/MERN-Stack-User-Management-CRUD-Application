import { createBrowserRouter as createRouterBrowser, RouterProvider } from 'react-router-dom';
import AddUser from './addUser/AddUser';
import './App.css';
import User from './getUser/User.jsx';
import Update from './updateUser/UpdateUser.jsx';

function App() {
  const route = createRouterBrowser([
    {
      path: '/',
      element: <User/>
    },
    {
      path:'/add',
      element:<AddUser/>
    },
    {
      path:'/update/:id',
      element:<Update/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
