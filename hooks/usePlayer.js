import { useState } from "react"

//here  we will deal with fuctionality like leaving room toggling etc
const usePlayer =()=>{
    //basically player will contain the stream of me and guest who joined the room
   const [players,setPlayers] = useState([])

    return {players,setPlayers}
}

export default usePlayer;