import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';


const SIgnedOutNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
    const white={
        color:"white",
        textDecoration:"none"
    };
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/" className="mr-auto">Movie-World</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar >
            <NavItem >
              <NavLink  style={white}  to="/SignIn">Sign In</NavLink>
            </NavItem>
            <NavItem >
              <NavLink  style={white}  to="/Register">Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </div>)
}
export default SignedOutNav