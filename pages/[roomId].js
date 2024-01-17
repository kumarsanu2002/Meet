// []-> this because as we use it in next.js it become query
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";

const Room =()=>{
    const socket = useSocket();
     const {peer,myId}
    = usePeer()
    console.log(myId)
}

export default Room;