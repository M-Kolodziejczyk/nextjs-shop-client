import { createContext, useState } from "react";

const CartContext = createContext();

export default CartContext;

export function CartContextProvider(props) {
  const [state, setState] = useState({
    cart: [],
    loading: false,
    successMessage: {},
    errorMessage: {},
    orderInformation: {},
  });

  const addProduct = (product) => {
    const index = state.cart.findIndex((item) => item._id === product._id);

    if (index === -1) {
      setState((prevState) =>
        setState((prevState) => ({
          ...prevState,
          cart: [...prevState.cart, product],
          successMessage: {
            [product._id]: "Product was successfully added to your Cart.",
          },
          errorMessage: {},
        }))
      );
    } else {
      setState((prevState) => ({
        ...prevState,
        successMessage: {},
        errorMessage: {
          [product._id]: "You already added this product in your Cart.",
        },
      }));
    }
  };

  const deleteProduct = (product) => {
    setState((prevState) => ({
      ...prevState,
      cart: prevState.cart.filter((item) => item._id !== product._id),
    }));
  };

  const clearCart = () => {
    setState((prevState) => ({
      ...prevState,
      cart: [],
    }));
  };

  const createOrderInformation = (orderInfo) => {
    setState((prevState) => ({
      ...prevState,
      orderInformation: {
        name: orderInfo.name,
        address: orderInfo.address,
        city: orderInfo.city,
      },
    }));
  };

  const clearCartAndOrderInfo = () => {
    setState((prevState) => ({
      ...prevState,
      cart: [],
      orderInformation: {},
    }));
  };

  const clearMessage = () => {
    setState((prevState) => ({
      ...prevState,
      successMessage: {},
      errorMessage: {},
    }));
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addProduct,
        deleteProduct,
        clearCart,
        clearMessage,
        createOrderInformation,
        clearCartAndOrderInfo,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
