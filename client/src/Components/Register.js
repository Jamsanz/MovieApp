import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright'
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//registration component

export default function Register(props) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => console.log(res.referer));
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} action="/register" method="POST" noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="F_name"
            label="First Name"
            name="fName"
            
            autoFocus
            type="text"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="L_Name"
            label="Last Name"
            name="lName"
            type="text"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           onClick={register}
          >
            Register
          </Button>
          <Grid container>
        
            <Grid item>
              <NavLink to="/signIn" variant="body2">
                {"Have an account? Sign in"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


 // "start":"node app.js",
    // "server":"nodemon app.js",
    // "client":"npm start --prefix ../client",

    // const[resp,setResp]=useState({});
    // const[email, setEmail]=useState("");
    // const [password, setPasword]=useState("");
    // const hanndleChange=(e)=>{
        // const val=e.target.value;
        // console.log(e.target.name);
        // if (e.target.name=="email") {
        //     setEmail(
        //         ()=>{
        //         return [val]
        //     })
        // } else {
        //     setPasword(()=>{
        //         return [val]
        //     })
        // }
    // }
//    const handleSubmit=()=>{ 
//        const email=document.getElementById("exampleEmail").value;
//        const password=document.getElementById("examplePassword").value;
//        axios.post('http://localhost:5000/config',{
//         email,
//         password
//     });
// }

