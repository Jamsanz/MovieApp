import React from 'react'
import ReactPlayer from 'react-player'

const MovieDetails = (props) => {
    console.log(props.match.params);
    return (
        <div>
            <ReactPlayer
            url={}
             />
        </div>
    )
}

export default MovieDetails
