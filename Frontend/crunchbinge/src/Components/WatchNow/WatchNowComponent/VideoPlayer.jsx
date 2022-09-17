import React from 'react'

function VideoPlayer(prop) {
    const url = "https://www.youtube.com/embed/" + prop.id;
    return (
        <div>
            <iframe width="100%" height="640vh" src={url} title={prop.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default VideoPlayer