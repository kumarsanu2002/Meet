// []-> this because as we use it in next.js it become query
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
//now we  get stream from useMedia where we have acess to audio screen and camera
//now to catch that stream and display in player we have library called react player

import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/component/Player";


const Room =()=>{
    const socket = useSocket();
    const {peer,myId}= usePeer()
    const {stream} = useMediaStream()

 /*showing video or stream which we got access to */
    return(
         <div>
                <Player url ={stream} muted playing playerId={myId}/> 
         </div>
        
        
    )
}

export default Room;
