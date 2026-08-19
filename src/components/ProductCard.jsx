import { ChevronRight, Bookmark } from "lucide-react";

function ProductCard({
  product,
  onClick,
  bookmarked,
  onToggleBookmark,
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 14px",
        background: "white",
        border: "1px solid var(--clay)",
        borderRadius: 7,
        cursor: "pointer",
        textAlign: "left",
        position: "relative",
      }}
    >
      {/* Image / icône produit */}
      <div
        style={{
          width: 175,
          height: 108,
          borderRadius: 12,
          background: "var(--paper-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span style={{ fontSize: 24 }}>📦</span>
        )}
      </div>

      {/* Informations */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 650,
            fontSize: 16,
            marginBottom: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            fontSize: 11,
            color: "#817566",
            marginBottom: 5,
          }}
        >
          <span>place : {product.port}</span>
          <span>MOQ {product.moq}</span>
        </div>

        <div
          className="font-mono"
          style={{
            fontSize: 13,
            fontWeight: 650,
            color: "var(--lacquer)",
          }}
        >
          ${Number(product.price).toFixed(2)}
        </div>
      </div>

      {/* Bookmark */}
      <button
        onClick={(event) => {
          event.stopPropagation();
          onToggleBookmark();
        }}
        aria-label={
          bookmarked
            ? "Remove bookmark"
            : "Bookmark product"
        }
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          border: "none",
          borderRadius: 8,
          background: bookmarked
            ? "var(--paper-2)"
            : "transparent",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: bookmarked
            ? "var(--gold)"
            : "#9a8f80",
          cursor: "pointer",
        }}
      >
        <Bookmark
          size={18}
          fill={bookmarked ? "currentColor" : "none"}
        />
      </button>
      
    </div>
  );
}

export default ProductCard;