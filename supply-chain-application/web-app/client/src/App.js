import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginContainer from './containers/login'

import CreateUser from './components/users/create-user'
import UserList from './components/users/user-list'
import InfoUser from './components/users/info-user';

import BlockList from './components/chaincodes/block-list';

import InfoProduct from './components/products/info-product';
import CreateProduct from './components/products/create-product'
import UpdateProduct from './components/products/update-product'
import ProductList from './components/products/product-list'

import OrderProduct from './components/transactions/order-product'
import SellProduct from './components/transactions/sell-product';
import DeliverProduct from './components/transactions/deliver-product';
import OrderList from './components/transactions/order-list'
import LogList from './components/logs/log-list';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginContainer />} />

          <Route path="/user/" element={<CreateUser />} />
          <Route path="/users/:userId" element={<InfoUser />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/blocks" element={<BlockList />} />

          <Route path="/product/" element={<CreateProduct />} />
          <Route path="/update/:productId" element={<UpdateProduct />} />
          <Route path="/sell" element={<SellProduct />} />

          <Route path="/order" element={<OrderProduct />} />
          <Route path="/deliver" element={<DeliverProduct />} />

          <Route path="/orders" element={<OrderList />} />
          <Route path="/info" element={<InfoUser />} />
          <Route path="/products/:productId" element={<InfoProduct />} />
          <Route path="/products" element={<ProductList />} />

          <Route path="/log/:productId" element={<LogList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
