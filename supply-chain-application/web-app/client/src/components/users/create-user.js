import AdminHeader from "../../containers/headers/admin.header";
import '../../styles/info.css'
import User from "./user";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import BASE_URL from '../../config'

const CreateUser = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const [user, setUser] = useState({
        id: '1',
        name: "",
        email: "",
        userType: userProfile.UserType.toLowerCase(),
        address: "",
        password: ""
    })
    const navigate = useNavigate();
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const useSubmit = async () => {
        user.userType = user.userType.toLowerCase()
        await axios.post(`${BASE_URL}/user/signup/${userProfile.UserType.toLowerCase()}`, { user })
            .then(res => console.log(res.data.data))
        navigate("/users")
    }
    return (
        <div>
            <AdminHeader />
            <div className="container-fluid">
                <User info={user} title={'Create a new user'} action={'create'} onChange={onChange} useSubmit={useSubmit} />
            </div>
        </div>
    )
}

export default CreateUser