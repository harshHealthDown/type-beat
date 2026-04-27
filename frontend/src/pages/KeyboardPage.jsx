import { useState } from 'react'
import axios from 'axios'
import { useOutletContext } from 'react-router'
import { token } from '../services/token'
import { index, words } from '../data/data'

const KeyboardPage = () => {
    const [text,setText] = useState("")
    const [error,setError] = useState(0)
    const [speed,setSpeed] = useState(0)
    const [raw, setRaw] = useState(0)
    const [accurary,setAccuracy] = useState(0)
    const [count,setCount] = useState(0)
    const [start, setStart] = useState(0)
    const [Blur,setBlur] = useState(true)
    const [timer,setTimer] = useState(120)
    const [timerState,setTimerState] = useState(false)
    const [user,setUser] = useOutletContext()
    const [range,setRange] = useState(0)
    
    if (timerState) {
        setTimeout(()=>{
            if (timer>0) {
                setTimer(timer-1)
            } else {
                setTimerState(false)
                clearTimeout()
            }
        },1000)
    }

    const submitSession = async ({user,speed,raw,accuracy}) => {
        if (user) {
            console.log(user,token,'k')
            try {
                await axios.post('/api/session',{
                    name:user,
                    speed:speed,
                    rawspeed:raw,
                    accuracy:accuracy,
                },{
                    headers: {
                        Authorization: token
                    }
                })
            } catch (error) {
                console.error(error,'1')
            }
        }
    }
    console.log(text)
    const typing = (e) => {
        if (Blur) {
            if (e.key=='Enter') {
                let para = []
                for (let i = 0; i<range; i++) {
                    let m = index[Math.floor(Math.random()*26)+1]
                    let j = Math.floor(Math.random()*(m[1]-m[0]))+m[0]+1
                    para.push(words[j])
                }
                setText(para.join(" "))
                setBlur(false)
                document.getElementById('tycont').classList.toggle('blur')
                document.getElementsByClassName('typing-container')[0].classList.toggle('cont')
                setCount(0)
                setError(0)
                setSpeed(0)
                setRaw(0)
                setAccuracy(0)
                setCount(0)
                setStart(0)
                setTimer(120)
                setTimerState(false)
            }
        } else {
            if (text.slice(count,count+1)==e.key) {
                if (count == 0) {
                    setTimerState(true)
                    setStart(e.timeStamp)
                    document.getElementById(`${count}`).classList.remove('text-cursor')
                    document.getElementById(`${count}`).classList.add('text-dim')
                    document.getElementById(`${count+1}`).classList.add('text-cursor')
                    setCount(count+1)
                }else if (count == text.length-1) {
                    setTimerState(false)
                    setSpeed(Math.round((text.length-error)/((e.timeStamp-start)/60000)))
                    setRaw(Math.round(text.length/((e.timeStamp-start)/60000)))
                    setAccuracy(Math.round((text.length-error)*10000/text.length)/100)
                    console.log(text.slice(count,count+1),count,document.getElementById(`${count}`))
                    document.getElementById('tycont').classList.toggle('blur')
                    document.getElementsByClassName('typing-container')[0].classList.toggle('cont')
                    document.getElementById(`${count}`).classList.remove('text-cursor')
                    document.getElementById(`${count}`).classList.add('text-dim')
                    setBlur(true)
                    submitSession({user,speed:Math.round((text.length-error)/((e.timeStamp-start)/60000)),raw:Math.round(text.length/((e.timeStamp-start)/60000)),accuracy:Math.round((text.length-error)*10000/text.length)/100})
                    setText("")
                } else {
                    document.getElementById(`${count}`).classList.remove('text-cursor')
                    document.getElementById(`${count}`).classList.add('text-dim')
                    document.getElementById(`${count+1}`).classList.add('text-cursor')
                    setCount(count+1)
                }
            }else{
                if (e.key=='CapsLock') {
                    return
                }else{
                    document.getElementById(`${count}`).classList.add('text-error')
                    setError(error+1)
                }
            }
        }
    }

    return (
        <div style={{justifyItems: "center",paddingTop:"6rem",flex:"1",outline: "none",outlineColor: "greenyellow"}} tabIndex={0} onKeyDown={typing}>
            <div style={{width:"fit-content",marginBottom:"2rem"}}>CountDown { `${Math.floor(timer/60)}:${timer%60 == 0 ? "00": timer%60}`}</div>
            <div className='typing-container cont'>
                <div style={{display:"flex",gap:"3.2rem",borderRadius:"1rem 1rem 0 0",backgroundColor:"rgb(30, 30, 30)",border:"solid 2px rgb(52, 52, 52)",borderBottom:"0px",padding:"1.4rem",fontSize:"0.8rem"}}>
                    <div>accuracy : {accurary}<kbd style={{color:"rgb(117, 117, 117)"}}> %</kbd></div>
                    <div>errors : {error}</div>
                    <div>speed : {speed}<kbd style={{color:"rgb(117, 117, 117)"}}> cpm</kbd></div>
                    <div>raw-speed : {raw}<kbd style={{color:"rgb(117, 117, 117)"}}> cpm</kbd></div>
                    <div>
                        <input id='wordsRange' value={range} onChange={(e) => setRange(e.target.value)} type="range" name="range" min="0" max="60"/>
                        <kbd style={{color:"rgb(117, 117, 117)"}}>{range}</kbd>
                    </div>
                </div>
                <div id="tycont" className='typing-zone blur'>{text.split("").map((c,i)=><span key={i} id={i}>{c}</span>)}
                </div>
            </div>
        </div>
    )
}

export default KeyboardPage