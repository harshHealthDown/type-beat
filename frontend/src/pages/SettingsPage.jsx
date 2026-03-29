import { Settings2 } from "lucide-react"

const SettingPage = () => {
    return (
        <div style={{width:"1000px", margin:"0 auto"}}>
            <Settings2 style={{border:"solid 2px yellowgreen",borderRadius:"0.4rem"}}/>
            <h2>Customization Section</h2>
            <div>
                1. change color : rgba(<input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"1rem",borderRadius:"0.4rem"}}/>,<input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"1rem",borderRadius:"0.4rem"}}/>,<input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"1rem",borderRadius:"0.4rem"}}/>,<input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"1rem",borderRadius:"0.4rem"}}/>)
            </div>
            <div>
                2. change font family : <input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"6rem",borderRadius:"0.4rem"}}/>
            </div>
            <div>
                3. change Background style : <input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"6rem",borderRadius:"0.4rem"}}/>
            </div>
            <div>
                4. change font Spacing : <input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"6rem",borderRadius:"0.4rem"}}/>
            </div>
            <h2>Account Section</h2>
            <div>
                5. delete Account : <input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"10rem",borderRadius:"0.4rem"}} placeholder=" enter account name"/>
            </div>
            <div>
                6. Reset Data : <button style={{border:"none",padding:"0.2rem 1rem",borderRadius:"0.4rem",backgroundColor:"yellowgreen",color:"white",fontWeight:"600"}}>Reset</button>
            </div>
            <h2>KeyBoard Section</h2>
            <div>
                7. keyboard layout : <input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"6rem",borderRadius:"0.4rem"}} placeholder=" enter layout "/>
            </div>
            <div>
                8. increase text length : <input style={{backgroundColor:"#242424",border:"solid 1px yellowgreen",color:"white",width:"6rem",borderRadius:"0.4rem"}} placeholder=" no of words "/>
            </div>
            <div>
                9. Difficulty : <button style={{border:"none",padding:"0.2rem 1rem",borderRadius:"0.4rem",backgroundColor:"yellowgreen",color:"white",fontWeight:"600"}}>Moderate</button>
            </div>
        </div>
    )
}

export default SettingPage