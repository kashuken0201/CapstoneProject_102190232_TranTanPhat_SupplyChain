import ManufacturerHeader from "../../containers/headers/manufacturer.header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';

import Product from "./product";
import axios from 'axios'

import BASE_URL from '../../config'

const UpdateProduct = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const location = useLocation()
    const navigate = useNavigate();
    const data = location.state
    const userType = userProfile.UserType.toLowerCase()

    const [product, setProduct] = useState(data)
    console.log(product)
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setProduct({ ...product, [name]: value })
    }
    const useSubmit = async () => {
        const data = {
            id: userProfile.UserID,
            name: product.Name,
            price: product.Price,
            desc: product.Description
        }
        await axios.post(`${BASE_URL}/product/${product.ProductID}`, { product: data })
            .then(res => console.log(res.data.data))
        navigate("/products")
    }
    return (
        <div>
            <ManufacturerHeader />
            <div className="container-fluid">
                <Product info={product} title={'Update Product'} action={'update'} UserType={userType} onChange={onChange} useSubmit={useSubmit} />
            </div>
        </div>
    )
}

export default UpdateProduct