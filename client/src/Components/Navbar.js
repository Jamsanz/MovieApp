import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
// import {Collapse, Nav, NavItem, NavLink,} from 'reactstrap'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Search from './search';
import axios from "axios";
import Favorites from './Favorites'
import { useHistory } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
  }));

function Navbar(props) {
    const history=useHistory();
    const {topRated, mostPopular, nowPlaying, upcoming ,Cards} =props;
    const [favorites, setFavorites]=useState([]);
    const [showFavorites, setShowFavorites]=useState(false);
    const [value, setValue] = useState(0);
    const [val, setVal] = useState(0);
    const [search, setSearch]=useState([]);
    const [showSearch, setShowSearch]=useState(false);
    const classes = useStyles();

    const token=window.localStorage.getItem('token');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (e) => {
    setVal(e.target.value);
  };
  const logOut=()=>{
    window.localStorage.removeItem('token');
    history.push('/');
  }
  const api="56cfd5fc378e636200b9efde71338622";
  const handleClick=()=>{
 axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${val}`,).then(res=>setSearch(res.data.results)).then(setShowSearch(true));
  }
  const handleKeyPress=(e)=>{
    if (e=="Enter") {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${val}`,).then(res=>setSearch(res.data.results)).then(setShowSearch(true));
    } 
//  
  }
  const handleClick2=()=>{
    setShowFavorites(!showFavorites);
  }
    const white={
        color:"white",
        textDecoration:"none"
    };
    useEffect(() => {
      const config={
        headers:{
          'Content-type':'application/json'
        }
      }
      if(token){
        config.headers['x-auth-token']=token;
      }
      axios.get('/users', config)
    }, [])
  
    return (
        <header>
        <AppBar className="indigo darken-4" position="fixed">
        <Toolbar>
         <i className="material-icons" style={{margin:"0px 5px 0px 10px"}}>light</i>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">MovieWorld</Link>
          </Typography>
         
          <input style={{width: "30%", color:"white"}} type="text" placeholder="Search" onKeyPress={(e)=>{
            handleKeyPress(e.key);
          }} onChange={handleChange1} />
          <i style={{marginRight:"2%", cursor:"pointer"}} onClick={handleClick} className="material-icons prefix">search</i>
          {token ? <div><Button onClick={handleClick2} color="inherit">Favorites</Button>
          <Button onClick={logOut} color="inherit">Log Out</Button></div>: 
          <div>
          <Button onClick={()=>history.push('/SignIn')} color="inherit">Sign In</Button>
          <Button onClick={()=>history.push('/Register')} color="inherit">Sign Up</Button>
          </div>}     
        </Toolbar>
               { showFavorites ? <Button onClick={handleClick2} color="inherit">Home</Button> : <Tabs value={value} onChange={handleChange} centered variant="scrollable" scrollButtons="auto" aria-label="simple tabs example" >
                    <Tab label="Now Playing" wrapped {...a11yProps(0)} />
                    <Tab label="Upcoming" wrapped {...a11yProps(1)} />
                    <Tab label="Most Popular" wrapped {...a11yProps(2)} />
                    <Tab label="Top Rated" wrapped {...a11yProps(3)} />
                    
                    
                </Tabs>}
      </AppBar>
      
                {showSearch ? 
                <div className="row"> <Search token={token} movies={search} /> </div>
                 :
                 showFavorites ?  <div className="row"><div><Favorites setFavorites={setFavorites} movies={favorites} /></div></div>  : <div>
                <TabPanel value={value} index={0} >
                <div className="row" style={{marginTop:"100px"}}>
                    <Cards token={token}  movies={nowPlaying} />
                </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <div className="row" style={{marginTop:"100px"}}>
                    
                    <Cards token={token}   movies={upcoming} />
                    
                </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <div className="row" style={{marginTop:"100px"}}>
                    
                    <Cards token={token}  movies={mostPopular} />
                    
                </div>
                </TabPanel>
            <TabPanel value={value} index={3}>
                <div className="row" style={{marginTop:"100px"}}>
                    
                    <Cards token={token}  movies={topRated} />
                </div> 
                </TabPanel>
              
                
             
                
             </div>}
                
        
        </header>
    )
}

export default Navbar
