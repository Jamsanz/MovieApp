import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Favorite from './Components/Favorites';
import Home from './Components/Home';
// import Login from './Components/Login'
import Register from './Components/Register'
import SignIn from './Components/SignInSide';
import MovieDetails from './Components/MovieDetails'



function App() {
  
  return (
    <div className="App">
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/movie" component={MovieDetails} />
      <Route path="/Register" component={Register} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Favorites" component={Favorite} />
      </Router>
    </div>
  );
}

export default App;
