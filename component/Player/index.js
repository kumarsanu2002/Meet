//using react library to display stream or the access we got like camera , mic and scrrem using react player librarry
import ReactPlayer from "react-player"
// Render a YouTube video player
/* <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' /> */

const Player =(props)=>{
       const {playerId,url,muted,playing} = props

      return(
        <div>
            <ReactPlayer key={playerId} url={url} muted={muted} playing={playing} />
        </div>
      )
}
export default Player;