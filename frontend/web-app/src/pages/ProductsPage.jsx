import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories } from "../api/products";
import ProductCard from "../components/ui/ProductCard";
import Pagination from "../components/ui/Pagination";
import Skeleton from "../components/ui/Skeleton";

const SORT_OPTIONS = [
  { value: "", label: "Latest" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc", label: "Name: A → Z" },
  { value: "name_desc", label: "Name: Z → A" },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  // Fetch categories once on mount
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setSlowLoad(false);
    const timer = setTimeout(() => setSlowLoad(true), 2000);

    const params = { page, limit: 12 };
    if (sort) params.sort = sort;
    if (category) params.category = category;
    if (search) params.search = search;

    getProducts(params)
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => { setLoading(false); clearTimeout(timer); });

    return () => clearTimeout(timer);
  }, [page, sort, category, search]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    if (key !== "page") p.delete("page");
    setSearchParams(p);
  };

  return (
    <div className="container page-pad">
      <div className="products-page-header">
        <h1>Products</h1>
        <button className="btn btn-outline btn-sm filters-toggle" onClick={() => setFiltersOpen(!filtersOpen)}>
          {filtersOpen ? "Hide Filters" : "Filters"}
        </button>
      </div>

      <div className={`products-filters ${filtersOpen ? "open" : ""}`}>
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setParam("search", e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setParam("category", e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort</label>
          <select value={sort} onChange={(e) => setParam("sort", e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <>
          {slowLoad && (
            <div className="slow-load-msg">
              <div className="loader-spinner" />
              <p>Please wait a few seconds while we fetch the data...</p>
            </div>
          )}
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton height="180px" style={{ borderRadius: 8 }} />
                <Skeleton height="18px" style={{ marginTop: 12 }} />
                <Skeleton height="14px" width="60%" style={{ marginTop: 8 }} />
              </div>
            ))}
          </div>
        </>
      ) : data.products.length === 0 ? (
        <div className="empty-state">
          <p>No products found.</p>
        </div>
      ) : (
        <>
          <p className="results-count">{data.total} product{data.total !== 1 ? "s" : ""} found</p>
          <div className="products-grid">
            {data.products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={(p) => setParam("page", p)} />
        </>
      )}
    </div>
  );
}
