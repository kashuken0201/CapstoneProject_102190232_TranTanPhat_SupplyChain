import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import ProductReducer from "./productReducer";

const INITIAL_STATE = {
  products: undefined,
};

export const ProductsContext = createContext(INITIAL_STATE);

export const ProductsContextProvider = (props) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);

  return (
    <ProductsContext.Provider
      value={{
        dispatch,
        products: state.products,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

ProductsContextProvider.propTypes = {
  children: PropTypes.any,
};
