// []-> this because as we use it in next.js it become query
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
//now we  get stream from useMedia where we have acess to audio screen and camera
//now to catch that stream and display in player we have library called react player

import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/component/Player";
import { startTransition, useEffect } from "react";


const Room =()=>{
    const socket = useSocket();
    const {peer,myId}= usePeer()
    const {stream} = useMediaStream()

    //whenever i join a room and if someone join a room i should do something
    //and that something is to make call and get their  streams

    useEffect(()=>{
        if(!socket || !stream || !peer) return;

        const handleUserConnected = (newUser) =>{
           console.log(`user connected in room with user id ${newUser}`)
     
               //sending stream to the guy who joined
              const call = peer.call(newUser,stream)
           ///getting  their stream
              call.on('stream',(incomingStream)=>{
               console.log(`incoming stream from ${newUser}`);     

              })
            }


        socket.on('user connected', handleUserConnected)

        return () =>{
            socket.off('user connected',handleUserConnected)

        };
    },[peer,stream,socket])



//now getting stream of people who joined me
useEffect(()=>{
    if(!peer || !stream) return
    peer.on("call",(call)=>{
        //getting caller  id and renaming peer to callerId
        const {peer : callerId} = call;
        call.answer(stream);

        //waiting for their stream to whom I joined
        call.on("stream",(incomingStream)=>{
            console.log(`incoming stream from ${callerId}`);     
           })
    })
},[peer,stream])




 /*showing video or stream which we got access to */
    return(
         <div>
             <Player url ={stream} muted playing playerId={myId}/> 
         </div>
        
        
    )
}

export default Room;
