import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

const CartContext = createContext({
  items: [],
  ItemToCart: () => {},
  updateItem: () => {},
});
export { CartContext };

function cartReducerFunction(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const id = action.payload;
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === id);
      updatedItems.push({
        id: id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEMS") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function StateContextProvider({ children }) {
  const [cartReducerstate, cartReducerDispatch] = useReducer(
    cartReducerFunction,
    {
      items: [],
    }
  );
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  // this is where the first state is being handeled

  function handleAddItemToCart(id) {
    cartReducerDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }
  // this is where the first state is being handeled is ended

  // this is where the 2nd state is being handeled
  function handleUpdateCartItemQuantity(productId, amount) {
    cartReducerDispatch({
      type: "UPDATE_ITEMS",
      payload: {
        productId,
        amount,
      },
    });
  }

  // this is where the 2nd state is being handeled

  const CartVal = {
    items: cartReducerstate.items,
    ItemToCart: handleAddItemToCart,
    updateItem: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={CartVal}>{children}</CartContext.Provider>
  );
}
