import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyPost from './pages/MyPosts';
import ViewCars from './pages/ViewCars';
import Sell from './pages/Sell';

function App() {
  const isLoggedIn = window.localStorage.getItem('loggedIn');
  return ( 
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={ isLoggedIn === 'true' ? <Dashboard /> : <Login />} />
        <Route path='/mypost' element={<MyPost />} />
        <Route path='/viewcars' element={<ViewCars />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
   );
}

export default App;

