import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import CreateProductModal from "../../components/CreateProductModal";
import ProductTable from "../../components/ProductTable/ProductTable";
import { PaginationContext } from "../../context/paginationContext/PaginationContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { UsersContext } from "../../context/userContext/UserContext";
import { ProductsContext } from "../../context/productContext/ProductContext";
import { getProducts } from "../../context/productContext/services";
import { getUsers } from "../../context/userContext/services";
import { setPagination } from "../../context/paginationContext/paginationAction";
import { notify } from "../../utils/showToast";

function Product() {
  const { dispatch, data } = useContext(PaginationContext);
  const { dispatch: dispatchProducts, products } = useContext(ProductsContext);
  const { dispatch: distributorDispatch, users } = useContext(UsersContext);

  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    if (user.organization === "manufacturer") {
      !users && getUsers(distributorDispatch, "distributor");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (user.organization === "supplier") {
      notify("error", "You are not allowed to access this page");
      navigate("/dashboard");
      return;
    }
    !products && getProducts(dispatchProducts);
    products &&
      dispatch(
        setPagination({
          ...data,
          data: products,
          start: 0,
          page: 1,
          perPage: 7,
          table: <ProductTable distributors={users} />,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, products]);

  return (
    <div className="d-flex flex-column ">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1 className="text-intro ">
          {" "}
          I'm {user.organization}, {user.username}
        </h1>
        <div>
          {(() => {
            if (user.organization === "manufacturer") {
              return (
                <div>
                  <button
                    className="btn btn-success"
                    onClick={() => setModalShow(true)}
                  >
                    + Add
                  </button>
                </div>
              );
            }
          })()}
        </div>
      </div>
      <div>{products && <Pagination />}</div>
      <CreateProductModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Product;
