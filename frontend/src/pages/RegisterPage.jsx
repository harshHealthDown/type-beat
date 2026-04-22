import { UserPlus, LogIn } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router";
import { setToken } from "../services/token";
import { useState } from "react";
import axios from 'axios';

const baseUrl = 'http://localhost:3001/'

const RegisterPage = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [cpassword,setCpassword] = useState('')
    const [name,setName] = useState('')
    const [loginUserName,setLoginUserName] = useState('')
    const [loginPassword,setLoginPassword] = useState('')
    const [user,setUser,id,setId] = useOutletContext()
    const navigate = useNavigate()
    const register = async (event) => {
        event.preventDefault()
        if (username && password && cpassword && name) {
            if (password!==cpassword) {
                alert('confirm password is not correct')
            } else {
                try {
                    const res = await axios.post(baseUrl+'api/users',{
                        username: username,
                        name: name,
                        password: password
                    })
                    setToken(res.data.token)
                    setUser(res.data.username)
                    setId(res.data.id)
                    setUsername('')
                    setName('')
                    setPassword('')
                    setCpassword('')
                    navigate('/ProfilePage/AccountPage',{ replace:true })
                } catch (error) {
                    console.error(error)
                }
            }
        } else {
            alert('invalid input')
        }
    }

    const login = async (event) => {
        event.preventDefault()
        if ( loginUserName && loginPassword ) {
            const res = await axios.post(baseUrl+'api/login',{
                username: loginUserName,
                password: loginPassword
            })
            const { username, token, id } = res.data
            setUser(username)
            setId(id)
            setToken(token)
            setLoginUserName('')
            setLoginPassword('')
            navigate('/ProfilePage/AccountPage',{ replace:true })
        } else {
            alert('invalid input')
        }
    } 
    return (
        <>
            <div className="registration-box">
                <form onSubmit={(event)=>register(event)}>
                    <div className="signupbox">
                        <div style={{fontSize:"1.1rem",color:'rgb(78,78,78)'}}><UserPlus style={{stroke:'rgb(78,78,78)'}} size={20}/> register</div>
                        <div>
                            <input className="registerInput" placeholder="enter username" value={username} onChange={({target}) => setUsername(target.value)}/>
                        </div>
                        <div>
                            <input className="registerInput" placeholder="enter name" value={name} onChange={({target}) => setName(target.value)}/>
                        </div>
                        <div>
                            <input type="password" className="registerInput" placeholder="enter password" value={password} onChange={({target}) => setPassword(target.value)}/>
                        </div>
                        <div>
                            <input type="password" className="registerInput" placeholder="confirm password" value={cpassword} onChange={({target}) => setCpassword(target.value)}/>
                        </div>
                        <div>
                            <button type="submit" className="registerInput registerbutton"><UserPlus style={{stroke:'rgb(78,78,78)'}} size={20}/> sign up</button>
                        </div>
                    </div>
                </form>
                <form onSubmit={(event) => login(event)}>
                    <div className="signinbox">
                        <div style={{fontSize:"1.1rem",color:'rgb(78,78,78)'}}><LogIn style={{stroke:'rgb(78,78,78)'}} size={20}/> log in</div>
                        <div>
                            <input className="registerInput" placeholder="enter username" value={loginUserName} onChange={({target}) => setLoginUserName(target.value)}/>
                        </div>
                        <div>
                            <input type="password" className="registerInput" placeholder="enter password" value={loginPassword} onChange={({target}) => setLoginPassword(target.value)}/>
                        </div>
                        <div>
                            <button className="registerInput registerbutton"><LogIn style={{stroke:'rgb(78,78,78)'}} size={20}/> log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterPage