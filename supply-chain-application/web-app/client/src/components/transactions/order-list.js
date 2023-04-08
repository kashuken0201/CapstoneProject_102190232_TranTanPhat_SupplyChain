import ManufacturerHeader from "../../containers/headers/manufacturer.header";
import ConsumerHeader from "../../containers/headers/consumer.header";
import DeliverProduct from "./deliver-product"
import SellProduct from "./sell-product"

import '../../styles/list.css'
import { useState, useEffect } from 'react';
import axios from 'axios'

import BASE_URL from '../../config'

const Product = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    const setPopup = () => {
        if (props.UserType === 'consumer')
            return (<div>
                {
                    isOpen && <DeliverProduct
                        product={props.product}
                        close={togglePopup}
                    />
                }
            </div>)
        return (<div>
            {
                isOpen && <SellProduct
                    product={props.product}
                    close={togglePopup}
                />
            }
        </div>)
    }
    const setAction = () => {
        if (props.UserType === 'consumer')
            return (
                <div className="row justify-content-center">
                    <div className="col">
                        {
                            props.product.Status === 'Sold' &&
                            <img src="/icons/icons8-shipped-24.png" onClick={togglePopup} />
                        }
                        {
                            props.product.Status === 'Ordered' &&
                            <img src="/icons/icons8-remove-24.png" onClick={togglePopup} />
                        }
                        {/* <Link to={"/consumer/order/" + props.product.ProductID}><img src={"/icons/icons8-full-shopping-basket-24.png"} /></Link> */}
                    </div>
                    {setPopup()}
                </div>
            )
        else return (
            <div className="row justify-content-center">
                <div className="col">
                    {
                        props.product.Status === 'Ordered' &&
                        <img src="/icons/icons8-sell-24.png" onClick={togglePopup} />
                    }

                </div>
                {setPopup()}
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
            <td className="text-center text-body">{props.product.Name}</td>
            <td className="text-center">{setManufacturer()}</td>
            <td className="text-center">{props.product.Date.ManufacturedDate || ""}</td>
            <td className="text-center">{props.product.Price}</td>
            <td className="text-center">{setStatus()}</td>
            <td className="text-center">
                {setAction()}
            </td>
        </tr>
    )
};

const OrderList = () => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const userId = userProfile.UserID
    const userType = userProfile.UserType.toLowerCase()
    const [orders, setOrders] = useState([])
    var isLoaded = false
    useEffect(() => {
        if (!isLoaded) {
            axios.get(`${BASE_URL}/transact/${userType}/${userId}`)
                .then(res => setOrders(res.data.data))
            isLoaded = true
        }
    }, [isLoaded])
    
    const onLoad = () => {
        return Object.keys(orders).map((key, index) => {
            return (
                <Product
                    product={orders[key]}
                    key={key}
                    index={index}
                    UserType={userType}
                />
            )
        })
    }
    
    const setHeader = () => {
        if (userType === 'consumer')
            return (<ConsumerHeader />)
        return (<ManufacturerHeader />)
    }

    return (
        <div>
            {setHeader()}
            <div className="container-fluid">
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

export default OrderList