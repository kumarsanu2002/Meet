import { cloneDeep } from "lodash"
import { useState } from "react"

//here  we will deal with fuctionality like leaving room toggling etc
//i have passed myId in usePlayer hook in room.js
const usePlayer =(myId)=>{
    //basically player will contain the stream of me and guest who joined the room
    const [players,setPlayers] = useState([])
   //npm lodash library
  //when some one joins their screen willbe shown big and mine smll
   const playerCopy = cloneDeep(players)
   
   const playerHighlited = playerCopy[myId]
   delete playerCopy[myId]

   const nonHighitedPlayer=playerCopy

    return {players,setPlayers,playerHighlited,nonHighitedPlayer}
}

export default usePlayer;