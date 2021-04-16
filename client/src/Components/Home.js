import React, { useState, useEffect, createContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import SignedInNav from './SignedInNav';
import Cards from './Cards';
import axios from 'axios';
// import Favorite from './Favorites'


// export const movieContext = createContext();

const Home = (props) => {

//Creating the movie store (array)

    const [movies, setMovies]=useState([]);

    //creating the favorite movie store

    const [favorites, setFavorites]=useState([]);

  //Checking the Login status to set the Navigation 

    const [isSignedIn, setIsSignedIn]=useState(false);
   
// The api request

    const url="https://wootlab-moviedb.herokuapp.com/api/movie/list/all";
    useEffect(() => {
        axios.get(url).then((res)=>{
          setMovies(res.data)
        });
    }, []);

    //Creating context for favorite
    

  return (
    <div>
        <SignedInNav isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <div style={{marin:"10px"}}>
        {/* <movieContext.Provider value={favorites}> */}
            <Cards setFavorites={setFavorites} movies={movies} />
            {/* </movieContext.Provider> */}
            {/* <Favorite favorites={favorites} /> */}
           </div>  
    </div>
  );
}

export default Home;