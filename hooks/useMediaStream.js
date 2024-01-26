//basically this hook wil ask for acess for your camera  mike like this.
import {useState, useEffect, useRef } from 'react'

//this will create a stream which will be accessed later on
const useMediaStream = () =>{
   const [state,setState] = useState(null)
   // to make useffect run or  render only 1st time we will use useRef
   const isStreamSet = useRef(false)


   useEffect(()=>{
        if(isStreamSet.current) return;
        //else
        isStreamSet.current = true; // .current because  useRef have property current which hold val of current element
     (async function initStream(){
        try{
        //getting audio and video acess
        const stream = await navigator.mediaDevices.getDisplayMedia({
            audio:true,
            video:true
        })
        console.log("setting your stream")
        setState(stream)  //setStream that we got audio and videos
        }
       catch(e){
        console.log("error in media navigator" , e)
       }
      
     })()
   },[])

   return {
  stream: state
}
}
export default useMediaStream