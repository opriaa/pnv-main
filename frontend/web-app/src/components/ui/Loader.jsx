import { useState, useEffect } from "react";

export default function Loader({ slowLoad: slowLoadProp }) {
  const [internalSlow, setInternalSlow] = useState(false);

  // If the parent doesn't manage slowLoad, handle it internally
  useEffect(() => {
    if (slowLoadProp !== undefined) return;
    const timer = setTimeout(() => setInternalSlow(true), 2000);
    return () => clearTimeout(timer);
  }, [slowLoadProp]);

  const showMessage = slowLoadProp !== undefined ? slowLoadProp : internalSlow;

  return (
    <div className="loader-wrap" style={{ flexDirection: "column", gap: "1rem" }}>
      <div className="loader-spinner" />
      {showMessage && (
        <p className="slow-load-text" style={{
          color: "var(--brand-700)",
          fontSize: "0.9rem",
          fontWeight: 500,
          animation: "fadeInUp 0.4s ease",
        }}>
          Please wait a few seconds while we fetch the data...
        </p>
      )}
    </div>
  );
}
