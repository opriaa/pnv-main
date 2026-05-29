import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../api/products";
import { checkPincode } from "../api/pincode";
import { useCart } from "../context/CartContext";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState(null);

  useEffect(() => {
    setLoading(true);
    setSlowLoad(false);
    const timer = setTimeout(() => setSlowLoad(true), 2000);
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data);
        setQuantity(res.data.minOrderQty || 1);
      })
      .catch(() => toast.error("Product not found"))
      .finally(() => { setLoading(false); clearTimeout(timer); });
    return () => clearTimeout(timer);
  }, [slug]);

  const handlePincodeCheck = async () => {
    if (!pincode || pincode.length !== 6) {
      toast.error("Enter a valid 6-digit pincode");
      return;
    }
    try {
      const res = await checkPincode(pincode);
      setPincodeResult(res.data);
    } catch {
      setPincodeResult({ deliveryAvailable: false, message: "Unable to check pincode" });
    }
  };

  const handleAddToCart = () => {
    if (quantity < product.minOrderQty) {
      toast.error(`Minimum order quantity is ${product.minOrderQty}`);
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} available in stock`);
      return;
    }
    addItem(product, quantity);
    toast.success("Added to cart!");
  };

  if (loading) return <Loader slowLoad={slowLoad} />;
  if (!product) return <div className="container page-pad"><p>Product not found.</p></div>;

  const effectivePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="container page-pad">
      <div className="product-detail">
        <div className="product-detail-gallery">
          {product.images?.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="product-detail-placeholder">📦</div>
          )}
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          {product.category && <span className="tag">{product.category}</span>}
          <div className="product-detail-price">
            <span className="price-large">₹{effectivePrice}</span>
            {hasDiscount && <span className="price-original-large">₹{product.price}</span>}
            <span className="price-unit">/ {product.unit}</span>
          </div>
          {product.sku && <p className="text-muted">SKU: {product.sku}</p>}
          <p className="text-muted">Min order: {product.minOrderQty} {product.unit} | Stock: {product.stock}</p>

          {product.description && (
            <div className="product-detail-desc">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="product-detail-actions">
            <div className="qty-control">
              <button onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}>−</button>
              <input
                type="number"
                value={quantity}
                min={product.minOrderQty}
                max={product.stock}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              Add to Cart — ₹{effectivePrice * quantity}
            </button>
          </div>

          <div className="pincode-check">
            <h3>Check Delivery</h3>
            <div className="pincode-input-group">
              <input
                type="text"
                placeholder="Enter pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => { setPincode(e.target.value.replace(/\D/g, "")); setPincodeResult(null); }}
              />
              <button className="btn btn-outline" onClick={handlePincodeCheck}>Check</button>
            </div>
            {pincodeResult && (
              <p className={pincodeResult.deliveryAvailable ? "text-success" : "text-error"}>
                {pincodeResult.deliveryAvailable
                  ? `✓ Delivery available in ${pincodeResult.deliveryDays} days to ${pincodeResult.city}, ${pincodeResult.state}`
                  : pincodeResult.message || "Delivery not available"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky mobile add to cart */}
      <div className="sticky-add-to-cart">
        <span>₹{effectivePrice * quantity}</span>
        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
