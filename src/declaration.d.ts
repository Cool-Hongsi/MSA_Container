///<reference types="react" />
declare module "product/ProductCount" {
  const ProductCount: React.ComponentType;
  export default ProductCount;
}
declare module "product/ProductName" {
  const ProductName: React.ComponentType;
  export default ProductName;
}
declare module "cart/Cart" {
  const Cart: React.ComponentType;
  export default Cart;
}

// To recognize file path when importing
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.ttf";
declare module "*.otf";
declare module "*.svg";
declare module "*.module.css";
