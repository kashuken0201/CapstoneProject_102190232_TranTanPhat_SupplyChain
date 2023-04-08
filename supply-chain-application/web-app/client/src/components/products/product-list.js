import ManufacturerHeader from "../../containers/headers/manufacturer.header";
import ConsumerHeader from "../../containers/headers/consumer.header";
import AdminHeader from "../../containers/headers/admin.header";

import '../../styles/list.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'
import OrderProduct from "../transactions/order-product";
import LogList from "../logs/log-list";
import convertUTCDateToLocalDate from "../../utils/convert-date";

import BASE_URL from '../../config'

const Product = (props) => {
    const [isOpenOrder, setIsOpenOrder] = useState(false);
    const [isOpenLog, setIsOpenLog] = useState(false);
    const togglePopupOrder = () => {
        setIsOpenOrder(!isOpenOrder)
    }
    const togglePopupLog = () => {
        setIsOpenLog(!isOpenLog)
    }
    const setPopupOrder = () => {
        return (<div>
            {
                isOpenOrder && <OrderProduct
                    product={props.product}
                    close={togglePopupOrder}
                />
            }
        </div>)
    }
    const setPopupLog = () => {
        return (<div>
            {
                isOpenLog && <LogList
                    product={props.product}
                    close={togglePopupLog}
                />
            }
        </div>)
    }
    const setLog = () => {
        return (
            <div className="col-3">
                <img src={"/icons/icons8-spiral-bound-booklet-24.png"} onClick={togglePopupLog} />
                {setPopupLog()}
            </div>
        )
    }
    const setAction = () => {
        if (props.UserID === 'admin')
            return (
                <div className="row justify-content-center">
                    {setLog()}
                </div>
            )
        else if (props.UserType === 'consumer')
            return (
                <div className="row justify-content-center">
                    <div className="col-3">
                        {props.product.Status === 'Available' &&
                            <img src="/icons/icons8-full-shopping-basket-24.png" onClick={togglePopupOrder} />
                        }
                        {setPopupOrder()}
                    </div>
                    {setLog()}
                </div>
            )
        else return (
            <div className="row justify-content-center">
                <div className="col-3">
                    {
                        props.product.Status === 'Available' &&
                        <Link to={"/update/" + props.product.ProductID} state={props.product}><img src={"/icons/icons8-edit-24.png"} /></Link>
                    }
                </div>
                {setLog()}
            </div>
        )
    }
    const setManufacturer = () => {
        if (props.index % 2 === 0)
            return (
                <span className="badge badge-soft-danger mb-0">{props.product.ManufacturerName}</span>
            )
        return (
            <span className="badge badge-soft-success mb-0">{props.product.ManufacturerName}</span>
        )
    }
    const setStatus = () => {
        const status = props.product.Status
        if (status === 'Available')
            return (
                <div className="border border-success bg-success rounded">
                    <span>{status}</span>
                </div>
            )
        else if (status === 'Ordered')
            return (
                <div className="border border-warning bg-warning rounded">
                    <span>{status}</span>
                </div>
            )
        else if (status === 'Sold')
            return (
                <div className="border border-primary bg-primary rounded">
                    <span>{status}</span>
                </div>
            )
        return (
            <div className="border border-secondary bg-secondary rounded">
                <span>{status}</span>
            </div>
        )
    }
    return (
        <tr>
            <th scope="row" className="ps-4 text-center"></th>
            <td className="text-center text-body" ><Link to={"/products/" + props.product.ProductID} state={props.product}>{props.product.Name}</Link></td>
            <td className="text-center">{setManufacturer()}</td>
            <td className="text-center">{convertUTCDateToLocalDate(new Date(props.product.Date.ManufacturedDate)).toLocaleString()}</td>
            <td className="text-center">{props.product.Price}</td>
            <td className="text-center">{setStatus()}</td>
            <td className="text-center">
                {setAction()}
            </td>
        </tr>
    )
};

const ProductList = () => {

    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const userId = userProfile.UserID
    const userType = userProfile.UserType.toLowerCase()
    const [products, setProducts] = useState([])
    var isLoaded = false
    useEffect(() => {
        if (!isLoaded) {
            axios.get(`${BASE_URL}/product/${userType}/${userId}`)
                .then(res => setProducts(res.data.data))
            isLoaded = true
        }
    }, [isLoaded])
    const onLoad = () => {
        return Object.keys(products).map((key, index) => {
            return (
                <Product
                    product={products[key]}
                    key={key}
                    index={index}
                    UserType={userType}
                    UserID={userId}
                />
            )
        })
    }
    const setHeader = () => {
        if (userId === 'admin')
            return (<AdminHeader />)
        else if (userType === 'consumer')
            return (<ConsumerHeader />)
        else return (<ManufacturerHeader />)
    }
    const setAction = () => {
        if (userType === 'manufacturer' && userId !== 'admin')
            return (
                <div className="row align-items-center">
                    <div className="col">
                        <div className="d-flex flex-wrap mt-3 justify-content-end gap-2 mb-2">
                            <div>
                                <Link to={"/product/"} className="btn btn-success">Create</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        else return (<div className="row mt-3 mb-2"></div>)
    }
    return (
        <div>
            {setHeader()}
            <div className="container-fluid">
                {setAction()}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table-responsive">
                            <table className="table project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col" className="ps-4" ></th>
                                        <th scope="col" className="text-center">Name</th>
                                        <th scope="col" className="text-center">Manufacturer</th>
                                        <th scope="col" className="text-center">Manufacturer Date</th>
                                        <th scope="col" className="text-center">Price</th>
                                        <th scope="col" className="text-center">Status</th>
                                        <th scope="col" className="text-center">Action</th>
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
    )
}

export default ProductList