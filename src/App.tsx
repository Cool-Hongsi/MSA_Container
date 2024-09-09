import React, { Suspense } from "react";
import Container from "./component/Container";
const ProductCount = React.lazy(() => import("product/ProductCount"));
const ProductName = React.lazy(() => import("product/ProductName"));
const Cart = React.lazy(() => import("cart/Cart"));

const App = () => {
  return (
    <>
      <Container />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductCount />
        <ProductName />
        <Cart />
      </Suspense>
    </>
  );
};

export default App;
