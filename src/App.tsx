import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Note from './components/Note'
import ViewNote from './components/ViewNote'

const router = createBrowserRouter([
  {
    path: "/",
    element:<div>
     <Navbar /> 
      <Home />    
    </div> , // Add a home component
  },
  {
    path: "/notes",
    element:<div>
      <Navbar /> 
      <Note />
    </div>,
  },
  {
    path: "/notes/:id",
    element:<div>
      <Navbar /> 
      <ViewNote />    
    </div> // Add a home component
  }
]);


function App() {

  return (
    <div> 
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
