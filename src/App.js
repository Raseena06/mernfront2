import {React,useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router ,Routes,Route,Redirect,Navigate, HashRouter} from 'react-router-dom';
import SignUp from './Components/UserLogin/SignUp.js';

import Login from './Components/UserLogin/LoginUser.js';
import HomePage from './Components/Home/HomePage.js';
import 'react-toastify/ReactToastify.css';
import RefrshHandler from '../src/Components/RefrshHandler.js';
import ForgotPassword from './Components/UserLogin/ForgotPassword.js';
import ResetPassword from './Components/UserLogin/ResetPassword.js';
import Dashboard from './Components/UserLogin/Dashboard.js';
import Nav from './Components/Navbar/Nav.js';
import { PrimeReactProvider } from 'primereact/api';
//  import 'bootstrap/dist/css/bootstrap.min.css';

//  import './utils/_variables.scss';
//  import './Components/Navbar/nav.module.scss';
// import './Components/Navbar/nav.module.scss';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
 const globalLogin = () => {
    setLoggedIn(true)
  }
 const globalLogout = () => {
    setLoggedIn(false)
  }
  useEffect(() => {
    console.log(loggedIn,"logged in")
    if(loggedIn){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
}, [])
  return (
    <div>
      {/* <Router> */}
      <HashRouter>
        <Nav />
        {/* <Nav isLoggedIn={loggedIn} globalLogout={globalLogout}/> */}

      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>
        {/* <Route exact path="/" > */}
        <Route path="/" element={<Navigate replace to="/home" />} />
        {/* <Redirect to="/home"></Redirect> */}
        {/* </Route> */}

          <Route  path="/signup" element={<SignUp/>}></Route>
          <Route  path="/login" element={<Login />}></Route>
          {/* <Route  path="/forgotpassword" element={<ForgotPassword/>}></Route> */}
          <Route  path="/forgotpassword" element={<ForgotPassword/>}></Route>

          <Route  path="/resetPassword/:token" element={<ResetPassword/>}></Route>
          {/* <Route  path="/resetPassword/:id/:token" element={<ResetPassword/>}></Route> */}

          <Route path="/dashboard" element={<Dashboard />}></Route>
          {/* <Route path='/home' element={<PrivateRoute element={<HomePage />} />} /> */}
          <Route path='/home' element={<HomePage />}  />

          <Route path='/Nav' element={<Nav />} />

        </Routes>
      {/* </Router> */}
      {/* </Nav> */}
      </HashRouter>
    
    </div>
  );
}

export default App;
