import { Link } from "react-router-dom"
import convertUTCDateToLocalDate from "../../utils/convert-date";
const Product = (props) => {
    const action = props.action
    const setReadOnly = () => {
        if (action === 'create')
            return (
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="form-group mb-4 mt-5">
                            <label className="col-lg-3 control-label"><h6>Name:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="name" value={props.Name} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className="col-lg-3 control-label"><h6>Price:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="price" value={props.Price} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className="col-lg-3 control-label"><h6>Manufacturer:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="manuName" value={props.ManufacturerName} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className="col-lg-3 control-label"><h6>Description:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="desc" value={props.Description} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="mt-5 row">
                            <div className="col-3"></div>
                            <div className="col-1">
                                <input className="btn btn-success" type='submit' value='Ok' onClick={() => { props.useSubmit() }} />
                            </div>
                            <div className="col-1">
                                <Link to={"/products"} className="btn btn-primary">Back</Link>
                            </div>
                            <div className="col-7"></div>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            )
        else if (action === 'update')
            return (
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="form-group mb-4 mt-5">
                            <label className="col-lg-3 control-label"><h6>Name:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="Name" value={props.info.Name} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className="col-lg-3 control-label"><h6>Price:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="Price" value={props.info.Price} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <label className="col-lg-3 control-label"><h6>Description:</h6></label>
                            <div className="col-lg-8">
                                <input className="form-control mt-1" type="text" name="Desc" value={props.info.Description} onChange={(e) => { props.onChange(e) }} />
                            </div>
                        </div>
                        <div className="mt-5 row">
                            <div className="col-3"></div>
                            <div className="col-1">
                                <input className="btn btn-success" type='submit' value='Ok' onClick={() => { props.useSubmit() }} />
                            </div>
                            <div className="col-1">
                                <Link to={"/products"} className="btn btn-primary">Back</Link>
                            </div>
                            <div className="col-7"></div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            )
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-4">
                    <div className="form-group mb-4 mt-5">
                        <label className="col-lg-3 control-label"><h6>Name:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={props.info.Name} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Manufacturer Name:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={props.info.ManufacturerName} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Description:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={props.info.Description} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Price:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={props.info.Price} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Status:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={props.info.Status} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group mb-4 mt-5">
                        <label className="col-lg-3 control-label"><h6>Manufactured Date:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={convertUTCDateToLocalDate(new Date(props.info.Date.ManufacturedDate)).toLocaleString()} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Ordered Date:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={convertUTCDateToLocalDate(new Date(props.info.Date.OrderedDate)).toLocaleString()} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Sold Date:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={convertUTCDateToLocalDate(new Date(props.info.Date.SoldDate)).toLocaleString()} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Delivered Date:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={convertUTCDateToLocalDate(new Date(props.info.Date.DeliveredDate)).toLocaleString()} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Consumer Name:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" readOnly value={props.info.ConsumerID} />
                        </div>
                    </div>

                </div>
                <div className="col-1"></div>
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-1">
                        <Link to={"/products"} className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-5"></div>

                </div>
            </div>
        )
    }
    return (
        <div className="row my-margin">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8"><h1>{props.title}</h1></div>
                <div className="col-2"></div>
            </div>
            {setReadOnly()}
        </div>
    )
}

export default Product