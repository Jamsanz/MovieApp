import React, { useState, useEffect } from 'react';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

import Cards from './Cards';
import axios from 'axios';
import Navbar from './Navbar';





const Home = (props) => {
    const [topRated, setTopRated]=useState([]);
    const [mostPopular, setMostPopular]=useState([]);
    const [nowPlaying, setNowPlaying]=useState([]);
    const [upcoming, setUpcoming]=useState([]);
    
    const [isSignedIn, setIsSignedIn]=useState(true);
    const [showFavorites, setShowFavorites]=useState(false);
    // const getMovieRequest= async ()=>{
    //   const url="https://wootlab-moviedb.herokuapp.com/api/movie/list/all";
    //   const response= await axios.get(url);
    //   console.log(response.data);
    //   setTopRated(response.data);
    // }

    
   
    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=56cfd5fc378e636200b9efde71338622&language=en-US&page=1").then((res)=>{
          setTopRated(res.data.results)
          
        });
        axios.get("https://api.themoviedb.org/3/movie/popular?api_key=56cfd5fc378e636200b9efde71338622&language=en-US&page=1").then((res)=>{
          setMostPopular(res.data.results)
        });
        axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=56cfd5fc378e636200b9efde71338622&language=en-US&page=1").then((res)=>{
          setNowPlaying(res.data.results)
        });
        axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=56cfd5fc378e636200b9efde71338622&language=en-US&page=1").then((res)=>{
          setUpcoming(res.data.results)
        });
        
       
    }, []);
    
  return (
    <div>
        {/* <SignedInNav isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} /> */}
        <Navbar
        topRated={topRated}
        mostPopular={mostPopular}
        nowPlaying={nowPlaying}
        upcoming={upcoming}
         Cards={Cards} />
        {/* <div 
        className="row" */}
        {/* // style={{marginLeft:"0px !important", marginRight:"0px !important"}} */}
        {/* > */}
        {/* <div className="container">
            <Cards setFavorites={setFavorites}  />
            </div> */}
            {/* <Favorite favorites={favorites} /> */}
           {/* </div>   */}
    </div>
  );
}

export default Home;