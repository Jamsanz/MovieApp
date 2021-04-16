import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';

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
  const {movies}=props;
  console.log(movies);
  const classes = useStyles();
  const [card, setCard]=useState(movies.slice(0,6));
  const[pageNumber, setPageNumber]=useState(0);
  const cardsPerPage=10;
  const pagesVisited= pageNumber * cardsPerPage;
  // style={{, display:"inline-block", height:"400px", width:"300px", background:`url(${movie.posterPath})`, backgroundSize:"cover" }
  const displayCard=movies.slice(pagesVisited, pagesVisited + cardsPerPage).map((movie) => {
    return (
    <div className="card" style={{boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%)", height:"400px", width:"300px",display:"inline-block"}} >
          <NavLink to={`/movie/`}><img className="img" src={movie.posterPath}  alt="movie"/></NavLink>

              <h1 style={{color:"white"}} className="heading">{movie.title}</h1>
              {/* <AddIcon
              onClick={()=>{
        props.setFavorites((prev)=>{
         return [...prev, movie]
        });}}
               /> */}
              
        {/* <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {movie.title.substring(0,1)}
          </Avatar>
        }
        
        title={movie.title}
        subheader={movie.releaseDate[0]}
      />
      <CardMedia
        className={classes.media}
        image={movie.backdropPath}
        title="Paella dish"
      />
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions 
      }} disableSpacing>
        <IconButton aria-label="add to favorites">
       <label>Add to Favorites</label> &nbsp;
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      
    </Card>
     */}
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
export default Cards
