import { Link } from "react-router-dom";

const ConsumerHeader = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-4">
                    <div className="navbar-brand text-center">Milkain</div>
                </div>
                <div className="col-7">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/info" className="nav-link">
                                    Information
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/products" className="nav-link">
                                    Products
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/orders" className="nav-link">
                                    Orders
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default ConsumerHeader