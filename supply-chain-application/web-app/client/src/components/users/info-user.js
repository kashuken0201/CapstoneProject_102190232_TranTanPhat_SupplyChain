import ConsumerHeader from "../../containers/headers/consumer.header";
import ManufacturerHeader from "../../containers/headers/manufacturer.header"
import AdminHeader from "../../containers/headers/admin.header";

import '../../styles/info.css'
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import User from "./user";

const InfoUser = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const location = useLocation()
    var info = userProfile
    if (userProfile.UserID === 'admin') {
        info = location.state
    }
    const [user, setUser] = useState(info)

    const onLoad = () => {
        return (
            <User info={user} title={'User Info'} action={'view'} />
        )
    }
    const setHeader = () => {
        if (userProfile.UserID === 'admin') return (<AdminHeader />)
        else if (userProfile.UserType === 'consumer') return (<ConsumerHeader />)
        else return (<ManufacturerHeader />)
    }
    return (
        <div>
            {setHeader()}
            <div className="container-fluid">
                {onLoad()}
            </div>
        </div>
    )
}

export default InfoUser