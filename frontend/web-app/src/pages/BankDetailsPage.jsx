import { useEffect, useState } from "react";
import api from "../api/client";
import Loader from "../components/ui/Loader";

export default function BankDetailsPage() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/cms/bank-details")
      .then((res) => setDetails(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  // Bank details endpoint requires admin token, so for public view
  // we'll show a static page or fallback
  return (
    <div className="container page-pad">
      <h1>Bank Details</h1>
      <p>For payment via bank transfer, please use the following details:</p>
      {details && details.bankName ? (
        <div className="bank-details-card">
          <table className="detail-table">
            <tbody>
              <tr><td>Bank Name</td><td>{details.bankName}</td></tr>
              <tr><td>Account Name</td><td>{details.accountName}</td></tr>
              <tr><td>Account Number</td><td>{details.accountNumber}</td></tr>
              <tr><td>IFSC Code</td><td>{details.ifscCode}</td></tr>
              {details.branch && <tr><td>Branch</td><td>{details.branch}</td></tr>}
              {details.upiId && <tr><td>UPI ID</td><td>{details.upiId}</td></tr>}
            </tbody>
          </table>
          {details.notes && <p className="text-muted" style={{ marginTop: "1rem" }}>{details.notes}</p>}
        </div>
      ) : (
        <p>Bank details will be shared after placing your order. Contact us for more information.</p>
      )}
    </div>
  );
}
