import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { User } from './Context/context';
import { useContext } from 'react';
import Orderpage from './pages/Orderpage';
import Responsepage from './pages/Responsepage';

function App() {
  const {user} = useContext(User);

  return (
    <Routes>
        <Route exact path="/" element={user.loggedIn ? <Home /> : <Navigate to="/login"/>} />
        <Route path="/register" element={user.loggedIn ? <Navigate to="/"/> : <Register />} />
        <Route path="/login" element={user.loggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path={`/order/:id`} element={<Orderpage />} />
        <Route path={`/response/:id`} element={<Responsepage />} />
    </Routes>
  );
}

export default App;
