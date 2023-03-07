import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screen/home';
import Register from './screen/register';

function App() {   
  return (      
   <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
 </Routes>
 </BrowserRouter>
   
   </>



  );
}

export default App;
