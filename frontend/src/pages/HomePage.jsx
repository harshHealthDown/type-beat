import {Settings, Bell, Keyboard, CircleUserRound, Info, Crown, Gamepad2} from 'lucide-react'
import { Link, Outlet } from 'react-router'
import { useState } from 'react'

const HomePage = () => {
    const [user,setUser] = useState(null)
    const [id, setId] = useState(null)
    let path = user ? "ProfilePage/AccountPage" : "ProfilePage/RegisterPage"
    console.log(id)
    return(
        <div style={{outline:"none",display:"flex",flexDirection:"column",height:"100vh"}} >
            <nav className="nav">
                <div>
                    <div style={{fontFamily:"Lexend Deca",fontSize:"1.6rem",alignItems:"center"}}>type.Beat
                    <div className='hori-cursor'></div></div>
                </div>
                <div className='menu-nav'>
                    <div style={{display:"flex",gap:"1rem"}}>
                        <Link to="/">
                            <div style={{padding:"0.5rem"}}><Keyboard color='grey' size={24}/></div>
                        </Link>
                        <Link to="/RankPage">
                            <div style={{padding:"0.5rem"}}><Crown color='grey' size={24}/></div>
                        </Link>
                        <Link to="/GamePage">
                            <div style={{padding:"0.5rem"}}><Gamepad2 color='grey' size={24}/></div>
                        </Link>
                        <Link to="/InfoPage">
                            <div style={{padding:"0.5rem"}}><Info color='grey' size={24}/></div>
                        </Link>
                        <Link to="/SettingPage">
                            <div style={{padding:"0.5rem"}}><Settings color='grey' size={24}/></div>
                        </Link>
                    </div>
                    <div style={{display:"flex",gap:"1rem",padding:"0.5rem"}}>
                        <div style={{padding:"0.5rem"}}><Bell color='grey' size={24}/></div>
                        <Link to={path}>
                            <div style={{padding:"0.5rem"}}><CircleUserRound color='grey' size={24}/></div>
                        </Link>
                    </div>
                </div>
            </nav>
            <main className='main'>
                <Outlet context={[user,setUser,id,setId]}/>
            </main>
        </div>
    )
}

export default HomePage