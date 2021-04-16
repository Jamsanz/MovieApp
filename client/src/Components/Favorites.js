import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import AddIcon from '@material-ui/icons/Add';
// import {movieContext} from './Home';



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

const Favorite=(props)=> {
  const {favorites}=props;
  console.log(favorites);
  const classes = useStyles();

  // const favorite = useContext(movieContext);

  return (
    <div>
    { favorites.map((movie)=>{
      return (<div style={{margin:"10px", display:"inline-block"}}>
        <Card className={classes.root}>
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
      
    </Card>
      </div>);
      })}
      {/*  */}
    
    </div>
  );
}
export default Favorite
