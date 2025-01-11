import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Todo from "./static/ts/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='register/' element={<Register/>}/>
        <Route path='todo/' element={<Todo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;