import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
//initilizing context api
const SocketContext = createContext(null);

//if we want to use socket for future use
export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}

export const SocketProvider = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  //making connection to socket
  useEffect(() => {
    const connection = io();
    console.log("socket connection", connection)
    setSocket(connection);
  }, []);
//to make connection to servers side , as we are using next.js api so we need to fetch api
//THIS IS ALSO DUE TO NEXT.JS SERVER IN FRONTEND
  socket?.on('connect_error', async (err) => {
    console.log("Error establishing socket", err)
    await fetch('/api/socket')
  })
//we will wrapp whole frontend with context api
  return (
    //here we are passsing value and information of socket which we  stored using help of usezState
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};