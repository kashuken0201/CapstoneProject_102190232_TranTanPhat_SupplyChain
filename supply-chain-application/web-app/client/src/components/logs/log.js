import '../../styles/popup.css'
import { useState } from 'react';
import convertUTCDateToLocalDate from "../../utils/convert-date";

const Log = (props) => {
    const [product, setProduct] = useState(props.product)

    const setStatus = () => {
        const status = props.status
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
        <div className="popup-box">
            <div className="box-log">
                <span className="close-icon-log" onClick={props.close}>x</span>
                <div className='row'>
                    <div className='col-9 '>
                        <h3>Product History Details</h3>
                    </div>
                    <div className='col-3'>
                        {setStatus()}
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6'>
                        <div className='row'>
                            Product Name: {product.Name}
                        </div>
                        <div className='row'>
                            Price: {product.Price}
                        </div>
                        <div className='row'>
                            Description: {product.Description}
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className='row'>
                            Created by: {product.Date.ManufacturedDate ? product.ManufacturerName : ''}
                        </div>
                        <div className='row'>
                            Ordered by: {product.Date.OrderedDate ? product.ConsumerID : ''}
                        </div>
                        <div className='row'>
                            Sold by: {product.Date.SoldDate ? product.ManufacturerName : ''}
                        </div>
                        <div className='row'>
                            Delivered by: {product.Date.DeliveredDate ? product.ManufacturerName : ''}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='row'>
                            Manufactured Date: {convertUTCDateToLocalDate(new Date(product.Date.ManufacturedDate)).toLocaleString()}
                        </div>
                        <div className='row'>
                            Ordered Date: {convertUTCDateToLocalDate(new Date(product.Date.OrderedDate)).toLocaleString()}
                        </div>
                        <div className='row'>
                            Sold Date: {convertUTCDateToLocalDate(new Date(product.Date.SoldDate)).toLocaleString()}
                        </div>
                        <div className='row'>
                            Delivered Date: {convertUTCDateToLocalDate(new Date(product.Date.DeliveredDate)).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Log