import Home from "./components/Home"
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {user} = useAuthContext();
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path='/' element={user?<Home/>:<Login/>}/>
        <Route exact path='/login' element={!user?<Login/>:<Navigate to ='/'/>}/>
        <Route exact path='/signup' element={!user?<Signup/>:<Navigate to ='/'/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
};

export default App
