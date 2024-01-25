
import {v4 as uuidv4} from 'uuid'
import { useRouter } from 'next/router'
import styles from  '@/styles/home.module.css'
import { useState } from 'react'


export default function Home() {

  const router =  useRouter()
  //storing input value of join room id
  const[roomId , setRoomId] = useState('')
   //handle click for join
  const jointRoom=()=>{
    if(roomId){
       router.push(`${roomId}`)
   }
    else{
       alert('Please provide a valid room id') 
    }
  }

  //create a room
  const createAndJoin =() =>{
    const roomId  = uuidv4() //basically uuidv4 will create random id
    router.push(`/${roomId}`)
  }
  


  return (
     <div className={styles.homeContainer}>
          <h1>Google Meet</h1>
          <div className={styles.enterRoom}>
            <input type="text" placeholder='Enter ID' value={roomId} onChange={(e)=>setRoomId(e?.target?.value)}/>
            <button onClick={jointRoom}>Join Room</button>
          </div>
          <span className={styles.separatorText}>------------OR----------------</span> 
          <br />
          <button onClick={createAndJoin}>Creat A New Room</button>
     </div>
  )
}


