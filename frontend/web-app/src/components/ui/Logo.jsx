import logo from "../../assets/pnv-logo.jpg";

export default function Logo({ size = 32 }) {
  return (
    <img
      src={logo}
      width={size}
      height={size}
      alt="PNV Logo"
      style={{ objectFit: "contain" }}
    />
  );
}
