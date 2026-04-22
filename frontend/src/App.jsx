import {Routes,Route} from "react-router";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import RankPage from "./pages/RankPage";
import KeyboardPage from "./pages/KeyboardPage";
import InfoPage from "./pages/InfoPage";
import SettingPage from "./pages/SettingsPage";
import GamePage from "./pages/GamePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}>
                <Route path="/" element={<KeyboardPage/>}></Route>
                <Route path="ProfilePage" element={<ProfilePage/>}>
                    <Route path="AccountPage" element={<AccountPage/>}></Route>
                    <Route path="RegisterPage" element={<RegisterPage/>}></Route>
                </Route>
                <Route path="RankPage" element={<RankPage/>}></Route>
                <Route path="InfoPage" element={<InfoPage/>}></Route>
                <Route path="SettingPage" element={<SettingPage/>}></Route>
                <Route path="LoginPage" element={<RankPage/>}></Route>
                <Route path="GamePage" element={<GamePage/>}></Route>
            </Route>
        </Routes>
    )
}

export default App