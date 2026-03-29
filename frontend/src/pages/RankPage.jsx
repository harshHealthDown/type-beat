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
                <td style={{borderTopRightRadius:"1rem",...tdstyle}}>{date}</td>
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
                <td style={{borderBottomRightRadius:"1rem",...tdstyle}}>{date}</td>
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
                <td style={tdstyle} >{date}</td>
            </tr>
        )
    }
    
}

const RankPage = () => {
    const [persons,setPersons] = useState([])
    const [page,setPage] = useState(0)
    useEffect(()=>{
        axios.get('http://localhost:3001/persons').then(res => {
            console.log(res.data)
            setPersons(res.data)
        })
        console.log('get data')
    },[])
    const display = []
    for (let i = page; i<page+11; i=i+1) {
        if (i<persons.length-1) {
            display.push(persons[i])
        }else{
            display.push({id:"",name:"",speed:"",rawspeed:"",accuracy:"",lastupdated:""})
        }
    }
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
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {persons.slice(page,page+11).map(person=><Rank key={person.id} id={person.id} name={person.name} speed={person.speed} raw={person.rawspeed} accuracy={person.accuracy} date={person.lastupdated}/>)}
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