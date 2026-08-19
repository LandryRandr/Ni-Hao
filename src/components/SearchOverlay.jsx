import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Search, X } from "lucide-react";

function SearchOverlay({
    products,
    onClose,
    onSearch,
    onSelectProduct,
  }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Automatically focus the search field when the overlay opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = normalizedQuery
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.category.toLowerCase().includes(normalizedQuery)
        )
        .slice(0, 8)
    : products.slice(0, 8);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Search header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          borderBottom: "1px solid var(--clay)",
          flexShrink: 0,
        }}
      >
        {/* Back */}
        <button
          onClick={onClose}
          aria-label="Close search"
          style={{
            border: "none",
            background: "none",
            padding: 4,
            display: "flex",
            alignItems: "center",
            color: "var(--ink)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Expanded search field */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 38,
            padding: "0 10px",
            borderRadius: 19,
            background: "#fff",
            border: "1px solid var(--clay)",
          }}
        >
          <Search size={16} color="#9a8f80" />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                onSearch(query.trim());
                }
            }}
            placeholder="Search products..."
            autoComplete="off"
            style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--ink)",
                fontSize: 13.5,
                fontFamily: "var(--font-body)",
            }}
            />

          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              style={{
                border: "none",
                background: "none",
                padding: 2,
                display: "flex",
                color: "#9a8f80",
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div
        className="nihao-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px 24px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--jade)",
            letterSpacing: 0.5,
            marginBottom: 10,
          }}
        >
          {normalizedQuery ? "PRODUCTS" : "SUGGESTIONS"}
        </div>

        {suggestions.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 4px",
              border: "none",
              borderBottom: "1px solid var(--paper-2)",
              background: "transparent",
              textAlign: "left",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            <Search
              size={15}
              color="#9a8f80"
              style={{ flexShrink: 0 }}
            />

            <div
              style={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {product.name}
              </div>

              <div
                style={{
                  fontSize: 11.5,
                  color: "#9a8f80",
                  marginTop: 2,
                }}
              >
                {product.category}
              </div>
            </div>
          </button>
        ))}

        {suggestions.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "45px 20px",
              color: "#9a8f80",
              fontSize: 13,
            }}
          >
            No product found
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;