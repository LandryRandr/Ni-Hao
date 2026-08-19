import { useEffect, useState } from "react";
import { Bookmark, X } from "lucide-react";

import Logo from "../components/Logo";
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";

function Market({ products, searchQuery }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    setQuery(searchQuery || "");
  }, [searchQuery]);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookmarkOnly, setBookmarkOnly] = useState(false);
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
  
  function toggleBookmark(productId) {
    setBookmarkedProducts((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }
  
      return [...current, productId];
    });
  }

  // Si un produit est sélectionné,
  // afficher sa fiche détaillée.
  if (selected) {
    return (
      <ProductDetail
        product={selected}
        quantity={quantity}
        setQuantity={setQuantity}
        onBack={() => {
          setSelected(null);
          setQuantity(1);
        }}
      />
    );
  }

  // Recherche
  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesBookmark =
      !bookmarkOnly ||
      bookmarkedProducts.includes(product.id);

    return matchesSearch && matchesBookmark;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px 6px",
  }}
>
{/* Search result */}
<div
  style={{
    flex: 1,
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    background: "#fff",
    border: "1px solid var(--clay)",
    borderRadius: 12,
    padding: "10px 12px",
  }}
>
  <span
    style={{
      fontSize: 13,
      color: "var(--ink)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  >
    result for : {query}
  </span>

  <button
    onClick={() => setQuery("")}
    aria-label="Clear search"
    style={{
      border: "none",
      background: "transparent",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9a8f80",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    <X size={17} />
  </button>
</div>

{/* Bookmark filter */}
<button
  onClick={() => setBookmarkOnly((value) => !value)}
  aria-label="Show bookmarked products"
  style={{
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid var(--clay)",
    background: bookmarkOnly ? "var(--gold)" : "#fff",
    color: bookmarkOnly ? "var(--paper)" : "#9a8f80",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  }}
>
  <Bookmark
    size={18}
    fill={bookmarkOnly ? "currentColor" : "none"}
  />
</button>
</div>

      <div
        className="nihao-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 24px",
        }}
      >
          
        

        {/* Produits */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              bookmarked={bookmarkedProducts.includes(product.id)}
              onToggleBookmark={() => toggleBookmark(product.id)}
              onClick={() => {
                setSelected(product);
                setQuantity(product.moq);
              }}
            />
          ))}

          {/* Aucun résultat */}
          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#9a8f80",
              }}
            >
              <Logo size={30} />

              <div
                style={{
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                Vous avez enregistré aucun produit. 
                Enlever le fitre Enregistrement pour afficher tous les produits disponible
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Market;