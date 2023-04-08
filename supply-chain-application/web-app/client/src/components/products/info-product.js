import ManufacturerHeader from "../../containers/headers/manufacturer.header";
import ConsumerHeader from "../../containers/headers/consumer.header";
import AdminHeader from "../../containers/headers/admin.header";

import { useLocation } from "react-router-dom";
import { useState } from 'react';
import Product from "./product";

const InfoProduct = () => {
    const location = useLocation()
    const data = location.state
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const userType = userProfile.UserType.toLowerCase()
    const [product, setProduct] = useState(data)
    const onLoad = () => {
        return (
            <div className="container-fluid">
                <Product info={product} title={'Product Info'} action={'view'} UserType={userType} />
            </div>
        )
    }
    const setHeader = () => {
        if (userProfile.UserType === 'admin') return (<AdminHeader />)
        else if (userProfile.UserType === 'consumer') return (<ConsumerHeader />)
        else return (<ManufacturerHeader />)
    }
    return (
        <div>
            {setHeader()}
            {onLoad()}
        </div>
    )
}

export default InfoProduct