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
import axios from 'axios';

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

export default function Register(props) {

  const[email, setEmail]=useState("");
  const[fName, setFName]=useState("");
  const[lName, setLName]=useState("");
  const[password, setPassword]=useState("");
  const classes = useStyles();
  const [msgShow, setMsgShow] =useState(false);
  const [msg, setMsg] =useState();
  // const fName = document.getElementById("F_Name").value;
  //     const lName= document.getElementById("L_Name").value;
  //     const fullname=fName+" "+lName;
  // const[name, setName]
  // const handleClick=()=>{
  //   axios.post('/config',{
  //     fullname:"Muhammad Sani",
  //     email: "Jamiludeeen@gmail.com",
  //     password: "Muhammad"

  //   }).then((res)=>{
  //     console.log(res)
  //   });
  // }

      const register=(e)=>{
         e.preventDefault();
        axios.post("http://localhost:5000/register",{
          email,
          password,
          fName,
          lName
        })
        .then(res=>{if(res.data.user){
          window.localStorage.setItem('token', res.data.token);
          console.log(window.localStorage.getItem('token'));
          window.alert("Registration Successful");
            window.location.href="/signin";
        }else{
          setMsgShow(true);
          setMsg(res.data.msg);
        }})
        .catch(err=>console.log(err));
      }

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
        <Typography className="red-text darken-text-3" component="h4" variant="h6">
          {msgShow && msg}
        </Typography>
        {/*   */}
        <form className={classes.form} onSubmit={register}  >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="F_name"
            label="First Name"
            name="fName"
            onChange={(e)=>{setFName(e.target.value)}}
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
            onChange={(e)=>{setLName(e.target.value)}}
            name="lName"
            type="text"
           
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            label="Email Address"
            name="email"
            type="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={register}
            className={classes.submit}
            
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

