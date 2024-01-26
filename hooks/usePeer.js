//implementing  peerjs library
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
// import peer from 'peerjs'

const usePeer=()=>{
    //socket connection
    const socket = useSocket()
    const roomId = useRouter().query.roomId
    const [peer,setPeer] = useState(null)
    const[myId,setMyId] = useState('')
    const isPeerSet = useRef(false)
//we will use or import peerjs and all other in useeffect because if we import globally in will run  at server side which will create problem (as next.js try to render or extecute all library by itself that why it wil crash)
//so while importing in useeffect it will run in client side and it will not create problem
    useEffect(()=>{
        //dont do anything
        if(isPeerSet.current || !roomId || !socket) return;
         isPeerSet.current = true;
            // ()() inforke funtion
            let myPeer; 
            (async function initPeer(){
                 myPeer = new(await import('peerjs')).default()
                //as we now get our peer , so store it
                setPeer(myPeer)
            //getting id from peer
            //code from peerjs website
                myPeer.on('open',(id)=>{
                    // console.log("hi there")
                    console.log(`your peer id is ${id}`)
                    setMyId(id)

                     //i joined the room
                     //and sending streams of infromation so that we can play this in react player
                    //id -> is basically id that a person joined
                     socket?.emit('join-room',roomId,id)
                   
                })
            })()
            //basically useffect will run when some one join using roomind and sokcet
    },[roomId,socket]) //in order to know how many person is connected to that peer or to get their id you need to start peerjs server.
return {
    peer,
    myId
}
}
export default usePeer