import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import ReactPaginate from 'react-paginate';
import '../App.css';
import MovieDetails from './MovieDetails';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/store';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Cards=(props)=> {
  const user=useSelector(userSelector);
  const {token, movies}=props;
  const[pageNumber, setPageNumber]=useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [movie, setMovie] = useState();
  const cardsPerPage=10;
  const pagesVisited= pageNumber * cardsPerPage;
  const handleFavorite=(movie)=>{
    axios.post('http://localhost:5000/',{movie},{
      headers:{
        "Content-type":"application/json",
        "x-auth-token":window.localStorage.getItem('token')
      }
    }).then(res=>{
             if (res.data.msg) {
               console.log(res.data.msg);
             } else {
               console.log(res.data.msg);
             }
           })
   }
   user && console.log(user);
  const handleShowDetails=()=>{
    setShowDetails(!showDetails);
  }
  if (showDetails) {
    return <MovieDetails handleShow={handleShowDetails} movie={movie} />;
  }
  
  if (!showDetails) {
    const displayCard=movies.slice(pagesVisited, pagesVisited + cardsPerPage).map((movie) => {
      // 
      return (
      <div
        className="card col s12 m6 l4"
         style={{}}
      >
    <div style={{display:"flex", padding:"15px"}} className="card-title">
            <div style={{borderRadius:"50%", height:"30px", width:"30px", marginRight:"3%", backgroundColor:"#F44336"}}>
            <h4 style={{textAlign:"center", color:"white"}}>{movie.title.substring(0,1)}</h4>
            </div>
            <span style={{display:"block", width:"100%", fontSize:"0.875rem", fontFamily:` "Roboto", "Helvetica", "Arial", sans-serif`, fontWeight:400, lineHeight: 1.43, letterSpacing: `0.01071em` }}>{movie.title}
            <span style={{cursor:"pointer"}} className="activator"><i class="material-icons right">more_vert</i></span>
            <span style={{color:"#00008A", display:"block"}}>{movie.release_date}</span>
            </span>
           </div>

        <div className="card-image">
          <img src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="movie"
          onClick={() => {
          setMovie(movie);
          setShowDetails(true);
        }}
           />
           
          <span className="card-title">{movie.title}</span>
         {token  && <a onClick={()=>{
           handleFavorite(movie)
          }} className="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>}
        </div>

         <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{movie.title}<i class="material-icons right">close</i></span>
      <p>{movie.overview}</p>
    </div> 

        </div>
      )
    });
    const pageCount=Math.ceil(movies.length / cardsPerPage);
    const changePage=({selected})=>{
      setPageNumber(selected);
    }
    return (
      <div>
      
      {/* { movies.map((movie)=>{
        ;
        })} */}
        
        {displayCard}
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
         />
      </div>
    );
  }
}
export default Cards
