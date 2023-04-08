import '../styles/login.css'

const Login = (props) => {
    return (
        <div className='vh-100 gradient-custom'>
            <div className="container-fluid py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login to Milkain</h2>
                                    <p className="text-white-50 mb-5">Please enter your login, password and Organization!</p>
                                    <div className="form-outline form-white mb-4">
                                        <input className="form-control form-control-lg" name='username' placeholder='Username' type='text' value={props.Name} onChange={(e) => { props.onChange(e) }} />
                                        <label className="form-label mt-3" htmlFor="typeName">Username</label>
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input className="form-control form-control-lg" name='password' placeholder='Password' type='password' value={props.Password} onChange={(e) => { props.onChange(e) }} />
                                        <label className="form-label mt-3" htmlFor="typePassword">Password</label>
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <select defaultValue="manufacturer" className="form-control form-control-lg" name="userType" value={props.UserType} onChange={(e) => { props.onChange(e) }}>
                                            <option value="manufacturer">Manufacturer</option>
                                            <option value="consumer">Consumer</option>
                                        </select>
                                        <label className="form-label mt-3" htmlFor="typeUser">Organization</label>
                                    </div>
                                    <input className="btn btn-outline-light btn-lg px-5" type='submit' value='Login' onClick={() => { props.onLogin() }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;