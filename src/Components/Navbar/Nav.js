import {React,useState,useEffect } from 'react';
import { Button, Nav, Navbar, NavDropdown, Offcanvas ,Container,Form} from 'react-bootstrap';
import styles from './nav.module.scss';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
function Navigationbar(props) {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const gotToNewPage=()=>{
    navigate("/signup");
  }
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
        navigate('/login')
    },1000)
    window. location. reload()
}
const handleSignup = (e) => {
 
  setTimeout(() => {
      navigate('/signup')
     
  },1000)

}
const handleLogin = (e) => {
  // setLoggedInUser(localStorage.getItem('loggedInUser'))
  // localStorage.setItem("loggedInUser", true);
  // setLoggedInUser(true);
  setTimeout(() => {
    // setLoggedInUser(localStorage.getItem('loggedInUser'))
   
      navigate('/login')
     
  },1000)
  
  //window. location. reload()

}
  useEffect(() => {
    console.log(loggedInUser,"logged in")
    // setLoggedInUser(localStorage.getItem('loggedInUser'))
    // console.log(props.isLoggedIn,"logged in after")

    setInterval(() => {
      const userString = localStorage.getItem('loggedInUser');
      // const user = JSON.parse(userString);
      setLoggedInUser(userString);
      }, [])

}, 5000)
    return (
        <>
            {/* <div >
                <h1 className={styles.t1}>heelo</h1>
                <Button as="a" variant="primary">
                    Button as link
                </Button>
            </div> */}
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{background:"bisque"}}>
      <Container>
        <Navbar.Brand href="#home">ProductStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Nav> */}
          {/* {loggedInUser ?
            <button style={{background:"sienna"}} onClick={handleLogout}> Logout </button>: <button style={{background:"sienna",marginRight:"10px"}}  onClick={handleSignup}> Sign Up </button>}

          {loggedInUser ? 
            "" :
            <button style={{background:"sienna"}}  onClick={handleLogin}>Login</button>
        } */}
          {loggedInUser ? 
           <button style={{background:"sienna"}} onClick={handleLogout}> Logout </button> :
            <button style={{background:"sienna"}}  onClick={handleLogin}>Login</button>
          
        }
               {/* {props.isLoggedIn? 'Logout' : 'Login'} */}
           
           
            
          
          {/* </Nav> */}
          {/* <Button onClick={gotToNewPage()}>
              SignUp/Login
              </Button> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>

           
    </>
      
    )
}
export default Navigationbar
