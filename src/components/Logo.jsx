import catLogo from "./images/catLogo.jpg";

function Logo({ size = 44 }) {
  return (
    <img
      src={catLogo}
      alt="Ni Hao"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        borderRadius: 8,
      }}
    />
  );
}

export default Logo;