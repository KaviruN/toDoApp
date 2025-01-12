import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import PrivateRoute from "./utils/PrivetRoute";

function App() {
  return (
    <BrowserRouter basename="/toDoApp">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="login/" element={<Login />} />
        <Route path='register/' element={<Register />} />
        <Route path='todo/' element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;