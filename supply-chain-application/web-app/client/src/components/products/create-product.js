import ManufacturerHeader from "../../containers/headers/manufacturer.header";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Product from "./product";
import axios from 'axios'
import BASE_URL from '../../config'

const CreateProduct = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const userType = userProfile.UserType.toLowerCase()
    const [product, setProduct] = useState({
        id: userProfile.UserID,
        name: '',
        price: '',
        desc: ''
    })
    const navigate = useNavigate()
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setProduct({ ...product, [name]: value })
    }
    let result
    const useSubmit = async () => {
        await axios.post(`${BASE_URL}/product`, { product })
            .then(res => console.log(res.data.data))
        navigate("/products")
    }
    return (
        <div>
            <ManufacturerHeader />
            <div className="container-fluid">
                <Product info={product} title={'Create a new product'} UserType={userType} action={'create'} onChange={onChange} useSubmit={useSubmit} />
            </div>
        </div>
    )
}

export default CreateProduct