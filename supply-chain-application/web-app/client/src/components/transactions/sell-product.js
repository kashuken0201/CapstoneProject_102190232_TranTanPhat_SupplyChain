import '../../styles/popup.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import BASE_URL from '../../config'

const SellProduct = (props) => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const [product, setProduct] = useState(props.product)
    const navigate = useNavigate()
    const useSubmit = async () => {
        await axios.post(`${BASE_URL}/transact/sell/${product.ProductID}`,
            {
                id: userProfile.UserID,
                role: userProfile.UserType
            })
            .then(res => console.log(res.data.data))
        props.close()
        navigate('/orders')
    }
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.close}>x</span>
                <h3>You want to sell this product</h3>
                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-2'>
                        <input type='submit' className='btn btn-success mt-4' value='Yes' onClick={useSubmit} />
                    </div>
                    <div className='col-2'>
                        <input type='button' className='btn btn-danger mt-4' value='No' onClick={props.close} />
                    </div>
                    <div className='col-4'></div>
                </div>
            </div>
        </div>
    )
}

export default SellProduct