import { useState } from 'react'

const KeyboardPage = () => {
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate consectetur rem laudantium? Laudantium reiciendis vero impedit sunt quos suscipit cum ut. Consequatur fugiat saepe sint ea incidunt ab beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate consectetur rem laudantium? Laudantium reiciendis vero impedit sunt quos suscipit cum ut. Consequatur fugiat saepe sint ea incidunt ab beatae."
    const [error,setError] = useState(0)
    const [speed,setSpeed] = useState(0)
    const [accurary,setAccuracy] = useState(0)
    const [count,setCount] = useState(0)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const typing = (e) => {
        console.log(e.key)
        if (text.slice(count,count+1)==e.key) {
            if (count == 0) {
                document.getElementById('tycont').classList.toggle('blur')
                console.log(e)
                setStart(e.timeStamp)
            }
            if (count == text.length-1) {
                setEnd(e.timeStamp)
                setSpeed(Math.round(text.length/((end-start)/60000)))
                setAccuracy(Math.round((text.length-error)*10000/text.length)/100)
            }
            document.getElementById(`${count}`).classList.remove('text-cursor')
            document.getElementById(`${count}`).classList.add('text-dim')
            document.getElementById(`${count+1}`).classList.add('text-cursor')
            setCount(count+1)
        }else{
            if (e.key=='CapsLock') {
                return
            }else{
                document.getElementById(`${count}`).classList.add('text-error')
                setError(error+1)
            }
        }
    }
    return (
        <div style={{justifyItems: "center",marginTop:"6rem",flex:"1"}}>
            <div style={{width:"fit-content",marginBottom:"2rem"}}>CountDown 0:00</div>
            <div className='typing-container' tabIndex={0} onKeyDown={typing}>
                <div style={{display:"flex",gap:"1rem",borderRadius:"1rem 1rem 0 0",backgroundColor:"rgb(30, 30, 30)",border:"solid 2px rgb(52, 52, 52)",borderBottom:"0px",padding:"1.4rem",fontSize:"0.8rem"}}>
                    <div>accuracy : {accurary}</div>
                    <div>errors : {error}</div>
                    <div>speed : {speed} cpm</div>
                </div>
                <div id="tycont" className='typing-zone blur'>{text.split("").map((c,i)=><span key={i} id={i}>{c}</span>)}
                </div>
            </div>
        </div>
    )
}

export default KeyboardPage