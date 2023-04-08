import Login from '../components/login'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import BASE_URL from '../config'

const LoginContainer = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    if (userProfile !== null) sessionStorage.removeItem('userProfile')
    const [token, setToken] = useState({});
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        userType: "manufacturer",
        password: ""
    })
    useEffect(() => {
        setUser(user)
    }, [])
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({ ...user, [name]: value })
    }
    let result;
    
    const onLogin = async () => {
        await axios.post(`${BASE_URL}/user/signin/${user.userType}`,
            {
                username: user.username,
                password: user.password,
                userType: user.userType
            })
            .then(res => result = res.data.data)
        if (result.UserID === 'admin') {
            sessionStorage.setItem('userProfile', JSON.stringify(result))
            navigate("/users")
        }
        else {
            sessionStorage.setItem('userProfile', JSON.stringify(result))
            navigate("/products")
        }
    }

    return (
        <Login onChange={onChange} onLogin={onLogin} />
    )
}
export default LoginContainer;