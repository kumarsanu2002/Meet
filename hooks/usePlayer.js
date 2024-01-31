import { useSocket } from "@/context/socket"
import { cloneDeep } from "lodash"
import { useState } from "react"

//here  we will deal with fuctionality like leaving room toggling etc
//i have passed myId in usePlayer hook in room.js
const usePlayer =(myId ,roomId)=>{
     const socket = useSocket()
    //basically player will contain the stream of me and guest who joined the room
    const [players,setPlayers] = useState([])
   //npm lodash library
  //when some one joins their screen willbe shown big and mine smll
   const playerCopy = cloneDeep(players)
   
   const playerHighlited = playerCopy[myId]
   delete playerCopy[myId]

   const nonHighitedPlayer=playerCopy

   //LEAVING ROOM

   //CONTROL PANNEL FROM INCON FROM LUCIDE LIBRARY
   const toggleAudio = () => {
    console.log("I toggled my audio")
    //it means that what ever there was my audio just mute it
    setPlayers((prev) => {
        const copy = cloneDeep(prev)
        //muting myself
        copy[myId].muted = !copy[myId].muted
        return {...copy}
    })
//as i am toggling myself so myId and room in wich i am toogling
    socket.emit('user-toggle-audio', myId, roomId)
}
//TOOGLING VIDEO
const toggleVideo = () => {
    console.log("I toggled my video")
    setPlayers((prev) => {
        const copy = cloneDeep(prev)
        copy[myId].playing = !copy[myId].playing
        return {...copy}
    })
     //'user-toggle-video' --> it is important as we will see this in api->socket.js  accoriding to which we will stops the stream of user
    socket.emit('user-toggle-video', myId, roomId)
}



    return {players,setPlayers,playerHighlited,nonHighitedPlayer}
}

export default usePlayer;