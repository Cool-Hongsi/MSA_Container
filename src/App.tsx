import React, { Suspense } from "react";
import Container from "./component/Container";
const Cart = React.lazy(() => import("cart/Cart"));
// import("cart/Cart")
// cart => 호스트앱 (Container) ModuleFederationPlugin에서 정의한 별칭
// Cart => 리모트앱 (Cart) ModuleFederationPlugin에서 expose한 키 값 (./Cart)
const ProductCount = React.lazy(() => import("product/ProductCount"));
const ProductName = React.lazy(() => import("product/ProductName"));

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
