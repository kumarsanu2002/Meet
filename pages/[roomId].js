// []-> this because as we use it in next.js it become query
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
//now we  get stream from useMedia where we have acess to audio screen and camera
//now to catch that stream and display in player we have library called react player
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/component/Player";
import { startTransition, useEffect } from "react";
import usePlayer from "@/hooks/usePlayer";

const Room =()=>{
    const socket = useSocket();
    const {peer,myId}= usePeer()
    const {stream} = useMediaStream()
    const {players,setPlayers} = usePlayer()
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
                
              setPlayers((prev)=>({
                ...prev,     //returining all prev objects
                [newUser]:{     //basically giving my id and we will give information like url,audio,video player this whole things.
                   url: incomingStream , 
                   muted:false,
                   playing: true
               }
            }))
              })
            }
        socket.on('user connected', handleUserConnected)

        return () =>{
            socket.off('user connected',handleUserConnected)

        };
    },[peer,stream,socket,setPlayers])
  


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
            setPlayers((prev)=>({
                ...prev,     //returining all prev objects
                [callerId]:{     //basically giving my id and we will give information like url,audio,video player this whole things.
                   url: incomingStream , 
                   muted:false,
                   playing:true
               }
            }))
           })
    })
},[peer,stream,setPlayers])










//get stream and set it to player hook which we created in hook
useEffect(()=>{
if(!stream || !myId ) return;
 console.log(`setting my stream ${myId}`)
 setPlayers((prev)=>({
     ...prev,     //returining all prev objects
     [myId]:{     //basically giving my id and we will give information like url,audio,video player this whole things.
        url: stream , 
        muted:false,
        playing:true
    }
 }))
},[myId,stream,setPlayers])





  

 /*showing video or stream which we got access to */
    return(
         <div>
             {Object.keys(players).map((playersId)=>{
                 const {url,muted,playing} = players[playersId]
             return  <Player key={playersId} url ={url} muted={muted} playing ={playing}/> 
            
             })}
         </div> 
    )
}

export default Room;





 

   

