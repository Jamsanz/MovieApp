import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import MovieDetails from './MovieDetails';

function Favorites(props) {
    // const {setFavorites,movies}=props;
    // console.log(movies);
    const [movies, setMovies]=useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [movie, setMovie] = useState();
    const[pageNumber, setPageNumber]=useState(0);
    const cardsPerPage=10;
    const pagesVisited= pageNumber * cardsPerPage;
    const handleShowDetails=()=>{
      setShowDetails(!showDetails);
    }
    const handleClick=(movie, id)=>{
      
      axios.post('http://localhost:5000/del',{movie},{
      headers:{
        "Content-type":"application/json",
        "x-auth-token":window.localStorage.getItem('token')
      }
    }).then(res=>{
             if (res.data.msg) {
               console.log(res.data.msg);
                setMovies((prev)=>{
             return prev.filter((movie, index)=>{
            return movie.id !== id;
                })
                         })
             } else {
               console.log(res.data.msg);
             }
           })

      // setFavorites((prev)=>{
      //   return prev.filter((movie, index)=>{
      //     return movie.id !== id;
      //   })
      // })
      // console.log(movies[0].id);
    }
      const urll='http://localhost:5000/fav';
      useEffect(() => {
        axios.get(urll, {
          headers:{
            "x-auth-token": window.localStorage.getItem('token')
          }
        }).then((res)=>{
          setMovies(res.data);
          console.log(res.data);
        });
      }, []);

    if (showDetails) {
      return <MovieDetails handleShow={handleShowDetails} movie={movie} />;
    }
    
    if(!showDetails){
    
    const displayCard=movies.slice(pagesVisited, pagesVisited + cardsPerPage).map((movies) => {
   return (
            <div
        className="card col s12 m6 l4 "
         style={{}}
        
        
      >
    <div style={{display:"flex", padding:"15px"}} className="card-title">
            <div style={{borderRadius:"50%", height:"30px", width:"30px", marginRight:"3%", backgroundColor:"#F44336"}}><h4 style={{textAlign:"center", color:"white"}}>{movies.title.substring(0,1)}</h4></div>
            <span style={{display:"block", width:"100%", fontSize:"0.875rem", fontFamily:` "Roboto", "Helvetica", "Arial", sans-serif`, fontWeight:400, lineHeight: 1.43, letterSpacing: `0.01071em` }}>{movies.title}
            <span style={{cursor:"pointer"}} className="activator"><i class="material-icons right">more_vert</i></span>
            <span style={{color:"#00008A", display:"block"}}>{movies.release_date}</span>
            </span>
            
            
           </div>
            
        <div className="card-image">
          <img src={`http://image.tmdb.org/t/p/w185${movies.poster_path}`} alt="movies"
          onClick={() => {
          setMovie(movies);
          setShowDetails(true);
        }}
           />
           
          <span className="card-title">{movies.title}</span>
          <a onClick={()=>{
            handleClick(movies, movies.id);
          }} className="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
        </div>

         <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{movies.title}<i class="material-icons right">close</i></span>
      <p>{movies.overview}</p>
    </div>
     </div>
    )
}
);
const pageCount=Math.ceil(movies.length / cardsPerPage);
    const changePage=({selected})=>{
      setPageNumber(selected);
    }
    return (
      <div>
        {displayCard}
        <div style={{position:"relative" }}>
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
      </div>)
// return(
//     <div>

//     </div>
// )

}
}
export default Favorites


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import AddIcon from '@material-ui/icons/Add';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

// const Favorite=(props)=> {
//   const {favorites}=props;
//   console.log(favorites);
//   const classes = useStyles();
//   // const [expanded, setExpanded] = React.useState(false);

//   // const handleExpandClick = () => {
//   //   setExpanded(!expanded);
//   // };

//   return (
//     <div>
//     { favorites.map((movies)=>{
//       return (<div style={{margin:"10px", display:"inline-block"}}>
//         <Card className={classes.root}>
//       <CardHeader
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar}>
//             {movies.title.substring(0,1)}
//           </Avatar>
//         }
        
//         title={movies.title}
//         subheader={movies.releaseDate[0]}
//       />
//       <CardMedia
//         className={classes.media}
//         image={movies.backdropPath}
//         title="Paella dish"
//       />
//       <CardContent >
//         <Typography variant="body2" color="textSecondary" component="p">
//           {movies.overview}
//         </Typography>
//       </CardContent>
      
//     </Card>
//       </div>);
//       })}
//       {/*  */}
    
//     </div>
//   );
// }
// export default Favorite
