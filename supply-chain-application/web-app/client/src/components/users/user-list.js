import AdminHeader from "../../containers/headers/admin.header";
import '../../styles/list.css'

import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'

import BASE_URL from '../../config'

const User = (props) => {
    const setOrganization = () => {
        if (props.index % 2 === 0)
            return (
                <span className="badge badge-soft-danger mb-0">{props.user.UserType}</span>
            )
        else return (
            <span className="badge badge-soft-success mb-0">{props.user.UserType}</span>
        )
    }
    return (
        <tr>
            <th scope="row" className="ps-4 text-center"></th>
            <td className="text-center text-body"><Link to={"/users/" + props.user.UserID} state={props.user}>{props.user.Name}</Link></td>
            <td className="text-center text-body">{props.user.Email}</td>
            <td className="text-center">{setOrganization()}</td>
            <td className="text-center">{props.user.Address}</td>
        </tr>
    )
}

const UserList = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const userType = userProfile.UserType.toLowerCase()
    const [users, setUsers] = useState([])
    var isLoaded = false
    useEffect(() => {
        if (!isLoaded) {
            axios.get(`${BASE_URL}/user/${userType}`)
                .then(res => setUsers(res.data.data))
            isLoaded = true
        }
    }, [isLoaded])
    const onLoad = () => {
        return Object.keys(users).map((key, index) => {
            return (
                <User
                    user={users[key]}
                    index={index}
                    key={key}
                />
            )
        })
    }
    return (
        <div>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="mt-3 mb-2 d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                            <div>
                                <Link to={"/user"} className="btn btn-success">Create New User</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4" ></th>
                                            <th scope="col" className="text-center">Name</th>
                                            <th scope="col" className="text-center">Email</th>
                                            <th scope="col" className="text-center">Organization</th>
                                            <th scope="col" className="text-center">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {onLoad()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList