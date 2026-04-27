import { useEffect, useState } from "react"
import axios from "axios"
import {ChevronLeft, ChevronRight, SportShoe} from 'lucide-react'

const Rank = ({id,name,speed,raw,accuracy,date}) => {
    let tdstyle = {}
    if (id%2==0) {
        tdstyle.backgroundColor = "rgba(0,0,0,0)"
    }else{
        tdstyle.backgroundColor = "rgba(71, 71, 71, 0.6)"
    }
    if (id==1) {
        return (
            <tr>
                <td style={{borderTopLeftRadius:"1rem",...tdstyle}}>{id}</td>
                <td style={tdstyle}>{name}</td>
                <td style={tdstyle} ><SportShoe/> {speed}</td>
                <td style={tdstyle} ><SportShoe/> {raw}</td>
                <td style={tdstyle} >{accuracy}%</td>
                <td style={{borderTopRightRadius:"1rem",...tdstyle}}>{date.slice(0,date.indexOf('T'))}</td>
            </tr>
        )
    }else if (id%11==0) {
        return (
            <tr>
                <td style={{borderBottomLeftRadius:"1rem",...tdstyle}}>{id}</td>
                <td style={tdstyle} >{name}</td>
                <td style={tdstyle} ><SportShoe/> {speed}</td>
                <td style={tdstyle} ><SportShoe/> {raw}</td>
                <td style={tdstyle} >{accuracy}%</td>
                <td style={{borderBottomRightRadius:"1rem",...tdstyle}}>{date.slice(0,date.indexOf('T'))}</td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td style={tdstyle} >{id}</td>
                <td style={tdstyle} >{name}</td>
                <td style={tdstyle} ><SportShoe/> {speed}</td>
                <td style={tdstyle} ><SportShoe/> {raw}</td>
                <td style={tdstyle} >{accuracy}%</td>
                <td style={tdstyle} >{date.slice(0,date.indexOf('T'))}</td>
            </tr>
        )
    }
    
}

const RankPage = () => {
    const [persons,setPersons] = useState([])
    const [page,setPage] = useState(0)
    useEffect(()=>{
        axios.get('/api/users').then(res => {
            setPersons(res.data)
        })
        console.log('get data')
    },[])
    console.log(persons,'he')
    let display = []
    for (let i = 0; i<persons.length; i++) {
        let topSpeed = 0;
        let index = -1;
        console.log(persons[i].sessions)
        for (let j = 0;j<persons[i].sessions.length; j++) {
            if (persons[i].sessions[j].speed > topSpeed) {
                topSpeed = persons[i].sessions[j].speed;
                index = j;
            }
        }
        if (index!==-1) {
            display.push(persons[i].sessions[index]);
        }
    }
    display = display.sort((a,b)=>{
        return  b.speed - a.speed
    })
    return (
        <>
            <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",flexDirection:"column"}}>
                <table className="rank-table" style={{flex:"1"}}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>speed</th>
                            <th>raw</th>
                            <th>accuracy</th>
                            <th>lastActiveAt</th>
                        </tr>
                    </thead>
                    <tbody>
                    {display.map((person,i)=><Rank key={i+1} id={i+1} name={person.name} speed={person.speed} raw={person.rawspeed} accuracy={person.accuracy} date={person.lastActiveAt}/>)}
                    </tbody>
                </table>
            </div>
            <div className="rank-page-nav">
                <div onClick={()=>{
                    console.log('bhhoootni ke')
                    if (page>0) {
                        setPage(page-11)
                    }
                }}>
                    <ChevronLeft size={32}/>   
                </div>
                <div onClick={()=>{
                    if (page+11<persons.length) {
                        setPage(page+11)
                    }
                }}>
                    <ChevronRight size={32}/>
                </div>
            </div>
        </>
    )
}

export default RankPage