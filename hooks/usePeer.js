//implementing  peerjs library
import { useEffect, useRef, useState } from "react";
// import peer from 'peerjs'

const usePeer=()=>{
    const [peer,setPeer] = useState(null)
    const[myId,setMyId] = useState('')
    const isPeerSet = useRef(false)
//we will use or import peerjs and all other in useeffect because if we import globally in will run  at server side which will create problem (as next.js try to render or extecute all library by itself that why it wil crash)
//so while importing in useeffect it will run in client side and it will not create problem
    useEffect(()=>{
        if(isPeerSet.current) return;
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
                   
                })
            })()
    },[]) //in order to know how many person is connected to that peer or to get their id you need to start peerjs server
return (
    peer,
    myId
)
}
export default usePeer