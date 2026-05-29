import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHomepage } from "../api/cms";
import { getProducts } from "../api/products";
import ProductCard from "../components/ui/ProductCard";
import Skeleton from "../components/ui/Skeleton";
import CategoryIcon from "../components/ui/CategoryIcon";

function BannerSection({ content }) {
  return (
    <section className="hero-banner">
      <div className="container">
        <h1>{content.heading}</h1>
        <p>{content.subheading}</p>
        <Link
          to={content.ctaLink || "/products"}
          className="btn btn-primary btn-lg"
        >
          {content.ctaText || "Browse Products"}
        </Link>
      </div>
    </section>
  );
}

function CategoriesSection({ content }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Shop by Category:</h2>
        <div className="categories-grid">
          {content.categories?.map((cat, i) => (
            <Link key={i} to={cat.link} className="category-card">
              <div className="category-icon">
                <CategoryIcon name={cat.name} size={36} />
              </div>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TextSection({ content }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <h2 className="section-title">{content.heading}</h2>
        <div className="features-grid">
          {content.items?.map((item, i) => (
            <div key={i} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ content }) {
  return (
    <section className="section cta-section">
      <div className="container" style={{ textAlign: "center" }}>
        <h2>{content.heading}</h2>
        <p>{content.description}</p>
        <Link
          to={content.ctaLink || "/auth"}
          className="btn btn-primary btn-lg"
        >
          {content.ctaText || "Get Started"}
        </Link>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts({ limit: 4 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {});
  }, []);

  if (!products.length) return null;
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

const sectionRenderers = {
  banner: BannerSection,
  categories: CategoriesSection,
  text: TextSection,
  cta: CTASection,
};

export default function HomePage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlowLoad(true), 2000);
    getHomepage()
      .then((res) => setSections(res.data))
      .catch(() => {})
      .finally(() => { setLoading(false); clearTimeout(timer); });
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: "2rem 0" }}>
        {slowLoad && (
          <div className="slow-load-msg">
            <div className="loader-spinner" />
            <p>Please wait a few seconds while we fetch the data...</p>
          </div>
        )}
        <Skeleton
          height="300px"
          style={{ borderRadius: 12, marginBottom: 24 }}
        />
        <Skeleton
          height="200px"
          style={{ borderRadius: 12, marginBottom: 24 }}
        />
        <Skeleton height="200px" style={{ borderRadius: 12 }} />
      </div>
    );
  }

  return (
    <div className="home-page">
      {sections.map((section) => {
        const Renderer = sectionRenderers[section.type];
        if (!Renderer) return null;
        return <Renderer key={section._id} content={section.content} />;
      })}
      <FeaturedProducts />
    </div>
  );
}
