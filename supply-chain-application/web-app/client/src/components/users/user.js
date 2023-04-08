import { Link } from "react-router-dom"

const User = (props) => {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile'))
    const action = props.action
    const setAction = () => {
        if (userProfile.UserID === 'admin')
            if (action === 'create')
                return (
                    <div className="mt-5 row">
                        <div className="col-3"></div>
                        <div className="col-1">
                            <input className="btn btn-success" type='submit' value='Ok' onClick={() => { props.useSubmit() }} />
                        </div>
                        <div className="col-1">
                            <Link to={"/users"} className="btn btn-primary">Back</Link>
                        </div>
                        <div className="col-7"></div>
                    </div>
                )
            else return (
                <div className="mt-5">
                    <Link to={"/users"} className="btn btn-primary">Back</Link>
                </div>
            )
        else return (
            <div className="mt-5">
                <Link to={"/products"} className="btn btn-primary">Back</Link>
            </div>
        )
    }
    const setOrg = () => {
        if (userProfile.UserType === 'manufacturer')
            return (
                <div className="col-lg-8">
                    <input className="form-control mt-1" type="text" readOnly value="Manufacturer" />
                </div>
            )
        else return (
            <div className="col-lg-8">
                <input className="form-control mt-1" type="text" readOnly value="Consumer" />
            </div>
        )
    }
    const setReadOnly = () => {
        if (action === 'create')
            return (
                <form className="form-horizontal" role="form">
                    <div className="form-group mb-4 mt-5">
                        <label className="col-lg-3 control-label"><h6>Username:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" name='name' placeholder='Username' value={props.Name} onChange={(e) => { props.onChange(e) }} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Password:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" name='password' placeholder='Password' value={props.Password} onChange={(e) => { props.onChange(e) }} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Email:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" name='email' placeholder='Email' value={props.Email} onChange={(e) => { props.onChange(e) }} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Address:</h6></label>
                        <div className="col-lg-8">
                            <input className="form-control mt-1" type="text" name='address' placeholder='Address' value={props.Address} onChange={(e) => { props.onChange(e) }} />
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label className="col-lg-3 control-label"><h6>Organization:</h6></label>
                        {setOrg()}
                    </div>
                </form>
            )
        return (
            <form className="form-horizontal" role="form">
                <div className="form-group mb-4 mt-5">
                    <label className="col-lg-3 control-label"><h6>Username:</h6></label>
                    <div className="col-lg-8">
                        <input className="form-control mt-1" type="text" readOnly value={props.info.Name} />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className="col-lg-3 control-label"><h6>Email:</h6></label>
                    <div className="col-lg-8">
                        <input className="form-control mt-1" type="text" readOnly value={props.info.Email} />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className="col-lg-3 control-label"><h6>Address:</h6></label>
                    <div className="col-lg-8">
                        <input className="form-control mt-1" type="text" readOnly value={props.info.Address} />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label className="col-lg-3 control-label"><h6>Organization:</h6></label>
                    <div className="col-lg-8">
                        <input className="form-control mt-1" type="text" readOnly value={props.info.UserType.charAt(0).toUpperCase() + props.info.UserType.slice(1)} />
                    </div>
                </div>
            </form>
        )
    }
    return (
        <div className="row my-margin">
            <div className="col-3"></div>
            <div className="col-6">
                <h1>{props.title}</h1>
                {setReadOnly()}
                {setAction()}
            </div>
            <div className="col-3"></div>
        </div>
    )
}

export default User