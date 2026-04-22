import { Outlet, useOutletContext } from "react-router";

const ProfilePage = () => {
    return (
        <div className="profile-container">
            <Outlet context={useOutletContext()}/>
        </div>
    )
}

export default ProfilePage