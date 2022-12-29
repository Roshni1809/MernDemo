import './App.css';
import { useState } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Nav from "./components/Nav";
import Add from './components/Add';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Products from './components/Products';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('user'))
 
  return (
    <div className="App">
      <BrowserRouter>
      <Nav setAuth={setAuth} auth={auth} />
      <Routes>
     <Route element={<PrivateComponent auth={auth}/>}>
     <Route path="/" element={ <Products/>}/>
     <Route path="/update" element={ <h1>update</h1>}/>
     <Route path="/profile" element={ <h1>profile</h1>}/>
     <Route path="/add" element={ <Add  auth={auth}/>}/>
     </Route>
     <Route path="/signup" element={<SignUp setAuth={setAuth} auth={auth} />} />
     <Route path="/login" element={<Login setAuth={setAuth} auth={auth} />} />
     </Routes>
      <Footer/>
   </BrowserRouter>
    </div>
  );
}

export default App;
