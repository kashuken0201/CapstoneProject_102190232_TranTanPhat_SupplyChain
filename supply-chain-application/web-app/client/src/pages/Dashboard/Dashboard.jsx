import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Package from "../../assets/images/package.png";
import Supply from "../../assets/images/supply.png";
import Deliver from "../../assets/images/deliver.png";
import Manufacture from "../../assets/images/manufacture.png";
import Sell from "../../assets/images/sell.png";
import SupplyUser from "../../assets/images/SupplyUser.png";
import ManufactureUser from "../../assets/images/ManufactureUser.png";
import DeliverUser from "../../assets/images/DeliverUser.png";
import SellUser from "../../assets/images/SellUser.png";
import { DashboardContext } from "../../context/dashboardContext/DashboardContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getDashboard } from "../../context/dashboardContext/services";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const { dispatch: dispatchDashboard, data } = useContext(DashboardContext);
  const { pathname } = useLocation();

  useEffect(() => {
    !data && getDashboard(dispatchDashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, data]);

  return (
    <div className="d-flex flex-column">
      <h1 className="text-intro mt-4"> Hello, {user.username}</h1>
      <div className="d-flex gap-3 flex-nowrap justify-content-between flex-grow-1">
        <div className="box flex-fill text-center p-3">
          <h4>Product</h4>
          <div className="box-item d-flex p-4 align-items-center justify-content-between">
            <div className="flex-fill">
              <img className="" src={Package} alt="" />
            </div>
            <div className="bold p-4 flex-fill">
              <p>Total quantity: {data?.total} units</p>
              <p>Total price: $ {data?.total_price}</p>
            </div>
          </div>
          <div className="d-flex gap-3 mt-3">
            <div className="box-item w-50 p-3">
              <h5>Supplying</h5>
              <div className="d-flex w-50 mx-auto mt-5 mb-1">
                <p className="flex-fill">{data?.raw}</p>
                <div className="flex-fill">
                  <img src={Supply} alt="" />
                </div>
              </div>
            </div>
            <div className="box-item w-50 p-3">
              <h5>Manufacturing</h5>
              <div className="d-flex w-50 mx-auto mt-5 mb-1">
                <p className="flex-fill">{data?.manufacturing_product}</p>
                <div className="flex-fill">
                  <img src={Manufacture} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 mt-3">
            <div className="box-item w-50 p-3">
              <h5>Delivering</h5>
              <div className="d-flex w-50 mx-auto mt-5 mb-1">
                <p className="flex-fill">{data?.delivering_product}</p>
                <div className="flex-fill">
                  <img src={Deliver} alt="" />
                </div>
              </div>
            </div>
            <div className="box-item w-50 p-3">
              <h5>Selling</h5>
              <div className="d-flex w-50 mx-auto mt-5 mb-1">
                <p className="flex-fill">{data?.sold_product}</p>
                <div className="flex-fill">
                  <img src={Sell} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box w-30 text-center p-3" style={{ width: "35%" }}>
          <h4>User</h4>
          <div className="box-item d-flex p-3 mb-2 align-items-center">
            <div className="d-flex flex-column flex-fill">
              <div>
                <img src={SupplyUser} alt="" />
              </div>
              <p>Supplier</p>
            </div>
            <div className="d-flex w-70 flex-fill mb-1">
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border">
                  {data?.supplier_active_user}
                </div>
                <p>Active</p>
              </div>
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border orange">
                  {data?.supplier_deactive_user}
                </div>
                <p>Deactive</p>
              </div>
            </div>
          </div>
          <div className="box-item d-flex p-3 mb-2 align-items-center">
            <div className="d-flex flex-column flex-fill">
              <div>
                <img src={ManufactureUser} alt="" />
              </div>
              <p>Manufacturer</p>
            </div>
            <div className="d-flex w-70 flex-fill mb-1">
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border">
                  {data?.manufacturer_active_user}
                </div>
                <p>Active</p>
              </div>
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border orange">
                  {data?.manufacturer_deactive_user}
                </div>
                <p>Deactive</p>
              </div>
            </div>
          </div>
          <div className="box-item d-flex p-3 mb-2 align-items-center">
            <div className="d-flex flex-column flex-fill">
              <div>
                <img src={DeliverUser} alt="" />
              </div>
              <p>Distributor</p>
            </div>
            <div className="d-flex w-70 flex-fill mb-1">
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border">
                  {data?.distributor_active_user}
                </div>
                <p>Active</p>
              </div>
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border orange">
                  {data?.distributor_deactive_user}
                </div>
                <p>Deactive</p>
              </div>
            </div>
          </div>
          <div className="box-item d-flex p-3 mb-2 align-items-center">
            <div className="d-flex flex-column flex-fill">
              <div>
                <img src={SellUser} alt="" />
              </div>
              <p>Retailer</p>
            </div>
            <div className="d-flex w-70 flex-fill">
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border">
                  {data?.retailer_active_user}
                </div>
                <p>Active</p>
              </div>
              <div className="d-flex flex-column w-50 justify-content-center align-items-center">
                <div className="circle-border orange">
                  {data?.retailer_deactive_user}
                </div>
                <p>Deactive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
