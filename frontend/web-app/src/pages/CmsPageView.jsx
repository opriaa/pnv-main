import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getCmsPage } from "../api/cms";
import Loader from "../components/ui/Loader";

// Map known routes to CMS slugs
const SLUG_MAP = {
  "/about-us": "about-us",
  "/contact": "contact-us",
  "/privacy-policy": "privacy-policy",
  "/terms": "terms-and-conditions",
  "/refund-policy": "refund-policy",
  "/shipping-policy": "shipping-policy",
};

export default function CmsPageView() {
  const { slug: paramSlug } = useParams();
  const location = useLocation();
  const slug = SLUG_MAP[location.pathname] || paramSlug || location.pathname.slice(1);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCmsPage(slug)
      .then((res) => setPage(res.data))
      .catch(() => setError("Page not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <div className="container page-pad"><h1>404</h1><p>{error}</p></div>;

  return (
    <div className="container page-pad cms-page">
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
