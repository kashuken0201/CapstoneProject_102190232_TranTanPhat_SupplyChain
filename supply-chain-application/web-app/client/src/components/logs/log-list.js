import '../../styles/popup.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import convertUTCDateToLocalDate from '../../utils/convert-date';

import Log from './log'

const LogList = (props) => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const [product, setProduct] = useState(props.product)
    const [logs, setLogs] = useState([])
    const [status, setStatus] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = (e) => {
        setStatus(e.target.id)
        setIsOpen(!isOpen)
    }
    const setPopup = (e) => {
        return (<div>
            {
                isOpen && <Log
                    product={logs[status].Value}
                    close={togglePopup}
                    status={logs[status].Value.Status}
                />
            }
        </div>)
    }
    const onLog = () => {

    }
    var isLoaded = false
    useEffect(() => {
        if (!isLoaded) {
            axios.get(`http://192.168.1.10:8888/product/log/${product.ProductID}/${userProfile.UserType}/${userProfile.UserID}`)
                .then(res => setLogs(res.data.data))
            isLoaded = true
        }
    }, [isLoaded])
    return (
        <div className="popup-box">
            <div className="box-2">
                <span className="close-icon-2" onClick={props.close}>x</span>
                <h3 className='mb-5'>Transaction history of Product</h3>
                <div className='table-responsive'>
                <table className="table table-nowrap align-middle table-borderless">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">TxId</th>
                            <th scope="col" className="text-center">Timestamp</th>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(logs).map(key => (
                            <tr key={key}>
                                <td className="text-body">{logs[key].TxId}</td>
                                <td className="text-body">{convertUTCDateToLocalDate(new Date(logs[key].Timestamp)).toLocaleString()}</td>
                                <td className="text-body">{logs[key].Value.Status}</td>
                                <td className="text-body">
                                    <span onClick={togglePopup} id={key}>...</span>
                                    {setPopup()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default LogList