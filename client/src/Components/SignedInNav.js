import React, {useState} from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {NavLink,Link} from 'react-router-dom';


//Navigation pane with conditional rendering

const SignedInNav = (props) => {
  //collapse state for Nav Toggling
  const [collapsed, setCollapsed] = useState(true);
// Navbar toggler
  const toggleNavbar = () => setCollapsed(!collapsed);
    const white={
        color:"white",
        textDecoration:"none"
    };
    
    

  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/" className="mr-auto">MovieWorld</NavbarBrand>
        <NavbarToggler light onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar >
          {/* conditional rendering of  Nav links */}
          {props.isSignedIn ? <div><NavItem >
              <NavLink  style={white}  to="/Favorites">Favorites</NavLink>
            </NavItem>
            <NavItem >
              <Link  style={white}  to="/" onClick={()=>{
                props.setIsSignedIn(false);
                toggleNavbar();
              }}>Log Out</Link>
            </NavItem> </div> : <div><NavItem >
              <NavLink  style={white}  to="/SignIn">Sign In</NavLink>
            </NavItem>
            <NavItem >
              <NavLink  style={white}  to="/Register">Sign up</NavLink>
            </NavItem> </div>}
            
          </Nav>
        </Collapse>
      </Navbar>
      </div>)
}
export default SignedInNav