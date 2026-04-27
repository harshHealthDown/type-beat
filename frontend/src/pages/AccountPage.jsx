import { useOutletContext } from 'react-router'
import { useEffect, useState } from "react"
import axios from "axios"
import {ChevronLeft, ChevronRight, SportShoe} from 'lucide-react'

const Rank = ({id,speed,raw,accuracy,date}) => {
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
                <td style={tdstyle} ><SportShoe/> {speed}</td>
                <td style={tdstyle} ><SportShoe/> {raw}</td>
                <td style={tdstyle} >{accuracy}%</td>
                <td style={tdstyle} >{date.slice(0,date.indexOf('T'))}</td>
            </tr>
        )
    }
}

const AccountPage = () => {
    const [user,setUser,id,setId] = useOutletContext()
    const [person,setPerson] = useState({})
    const [page,setPage] = useState(0)
    const date = new Date()
    useEffect(()=>{
        setTimeout(()=>{
            axios.get(`/api/users/${id}`).then(res => {
                setPerson(res.data)
            }
        ,1000)
        })
    },[])
    let sess = []
    console.log(Object.hasOwn(person,'sessions'))
    if (Object.hasOwn(person,'sessions')) {
        sess = [...person.sessions]
    }
    console.log(sess)
    return (
        <>  
            <div>
                <div>
                    Username:{user}
                </div>
                <div>
                    Date: {date.getDate()}|{date.getMonth()}|{date.getFullYear()}
                </div>
                <div>name:sniffy sniff</div>
                <div>no of typing session : 101</div>
                <div>time typing: 10:47:31</div>
            </div>
            <div>
                Graph
            </div>
            <div style={{maxWidth:"1000px",margin:"0 auto",display:"flex",flexDirection:"column"}}>
                <table className="rank-table" style={{flex:"1"}}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>speed</th>
                            <th>raw</th>
                            <th>accuracy</th>
                            <th>lastActiveAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sess.map((session,i)=><Rank key={i+1} id={i+1} speed={session.speed} raw={session.rawspeed} accuracy={session.accuracy} date={session.lastActiveAt}/>)}
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
                    if (page+11<person.length) {
                        setPage(page+11)
                    }
                }}>
                    <ChevronRight size={32}/>
                </div>
            </div>
        </>
    )
}

export default AccountPage