//using react library to display stream or the access we got like camera , mic and scrrem using react player librarry
import ReactPlayer from "react-player"
// Render a YouTube video player
/* <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' /> */
import cx from 'classnames'
import styles from '@/component/Player/index.module.css'



const Player =(props)=>{
       const {url,muted,playing,isActive} = props;

      return(
        //use this package npm i classname --> basically this library append many classed into single div.
        //The classNames function takes any number of arguments which can be a string or object. 
        <div className={cx(styles.playerContainer,{
          [styles.notActive]: !isActive, //all are from css file with some condition using classname library
          [styles.active]: isActive,
        })}>
            <ReactPlayer  url={url} muted={muted} playing={playing} isActive={true} width='100%' height='100%'/>
        </div>
      )
}
export default Player;