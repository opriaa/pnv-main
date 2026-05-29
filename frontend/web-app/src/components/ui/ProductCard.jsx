import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, product.minOrderQty || 1);
    toast.success(`${product.name} added to cart`);
  };

  const effectivePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`}>
        <div className="product-card-img">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="product-card-placeholder">📦</div>
          )}
        </div>
        <div className="product-card-info">
          <h3>{product.name}</h3>
          {product.category && <span className="product-card-cat">{product.category}</span>}
          <div className="product-card-price">
            <span className="price">₹{effectivePrice}</span>
            {hasDiscount && <span className="price-original">₹{product.price}</span>}
            <span className="price-unit">/ {product.unit}</span>
          </div>
          <p className="product-card-moq">Min order: {product.minOrderQty} {product.unit}</p>
        </div>
      </Link>
      <button className="btn btn-primary btn-sm" onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
}
