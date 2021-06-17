import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const MovieDetails = (props) => {
    const {movie, handleShow}=props;
    const [moviePath, setMoviePath]=useState("")
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=56cfd5fc378e636200b9efde71338622&language=en-US`).then((res)=>{
          setMoviePath(res.data.results[0].key)
        
        });
    }, [])
    return (
        <div style={{boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%)"}}>
        <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", marginTop:"70px"}}>
        <div className="card large horizontal">
            <div className="card-image">
            <iframe className="z-depth-3"  src={"https://youtube.com/embed/" + moviePath} height="400px" width="600px" allow="fullscreen"></iframe>
            </div>
            <div className="card-stacked">
                <div className="card-content">
                <p>{movie.overview}</p>
                </div>
                <div className="card-action">
                <Button
            style={{alignSelf:"flex-end"}}
            fullWidth
            variant="contained"
            color="danger"
            onClick={()=>{
                handleShow()
            }}
             >Back</Button></div>
                </div>
            </div>
        </div>
      
        </div>
    )
}

export default MovieDetails
