import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import SignedInNav from './SignedInNav';
import Cards from './Cards';
import axios from 'axios';
// import Favorite from './Favorites'




const Home = (props) => {
    const [movies, setMovies]=useState([]);
    const [favorites, setFavorites]=useState([]);
        // console.log(movies);
    const [isSignedIn, setIsSignedIn]=useState(true);
    // const getMovieRequest= async ()=>{
    //   const url="https://wootlab-moviedb.herokuapp.com/api/movie/list/all";
    //   const response= await axios.get(url);
    //   console.log(response.data);
    //   setMovies(response.data);
    // }

    
    const url="https://wootlab-moviedb.herokuapp.com/api/movie/list/all";
    useEffect(() => {
        axios.get(url).then((res)=>{
          setMovies(res.data)
        });
        
        // getMovieRequest();
        // return () => {
        //     cleanup
        // }
    }, []);
  return (
    <div>
        <SignedInNav isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <div style={{marin:"10px"}}>
            <Cards setFavorites={setFavorites} movies={movies} />
            
            {/* <Favorite favorites={favorites} /> */}
           </div>  
    </div>
  );
}

export default Home;