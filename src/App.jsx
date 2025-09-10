import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
import { CartContext } from "./store/shoppingCartContext.jsx";
import StateContextProvider from "./store/shoppingCartContext.jsx";

function App() {
  return (
    <StateContextProvider>
      <Header />

      {/* componeent composition is done below  and all data wraped is passed through children prop */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
      {/* componeent composition is above below  and all data wraped is passed through children prop */}
    </StateContextProvider>
  );
}

export default App;
