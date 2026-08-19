import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Minus,
  Plus,
  Package,
  Truck,
  ChevronDown,
  Copy,
} from "lucide-react";

function ProductDetail({
  product,
  quantity,
  setQuantity,
  onBack,
}) {
  /* -------------------------------------------------------
     IMAGES
     ------------------------------------------------------- */

  const images = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  const [selectedImage, setSelectedImage] = useState(
    images[0] || null
  );

  /* -------------------------------------------------------
     BOOKMARK
     Temporary local state.
     Later this can come from Supabase/user profile.
     ------------------------------------------------------- */

  const [bookmarked, setBookmarked] = useState(false);

  /* -------------------------------------------------------
     COLOR
     Temporary product colors.
     Later: product.colors from Supabase.
     ------------------------------------------------------- */

  const colors = product?.colors?.length
    ? product.colors
    : [
        {
          name: "Noir",
          value: "#1f1f1f",
        },
        {
          name: "Blanc",
          value: "#f5f5f5",
        },
      ];

  const [selectedColor, setSelectedColor] = useState(
    colors[0] || null
  );

  /* -------------------------------------------------------
     PAYMENT
     Temporary payment methods.
     Later: payment methods/configuration from backend.
     ------------------------------------------------------- */

  const paymentMethods = [
    {
      id: "mvola",
      name: "Mvola",
      logo: "/images/mvola.jfif",
    },
    {
      id: "airtel",
      name: "Airtel Money",
      logo: "/images/airtel-money.png",
    },
    {
      id: "orange",
      name: "Orange Money",
      logo: "/images/orange-money.png",
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethods[0].id
  );

  /* -------------------------------------------------------
     KEEP IMAGE IN SYNC IF PRODUCT CHANGES
     ------------------------------------------------------- */

  useEffect(() => {
    setSelectedImage(images[0] || null);
  }, [product]);

  /* -------------------------------------------------------
     CALCULATIONS
     ------------------------------------------------------- */

  const subtotal = product
    ? Number(product.price) * quantity
    : 0;

  const freight = product
    ? Number(product.freight) * quantity
    : 0;

  const customs = product
    ? Number(product.customs) * quantity
    : 0;

  const total = subtotal + freight + customs;

  /* -------------------------------------------------------
     TEMPORARY DATES
     Later these will come from the logistics/order system.
     ------------------------------------------------------- */

  const estimatedDates = useMemo(() => {
    const today = new Date();

    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const formatDate = (date) =>
      new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);

    return {
      order: formatDate(today),
      grouping: formatDate(addDays(today, 7)),
      shipping: formatDate(addDays(today, 14)),
      arrival: formatDate(addDays(today, 45)),
    };
  }, []);

  /* -------------------------------------------------------
     PRODUCT CHARACTERISTICS
     
     This structure is intentionally easy to replace later
     with product attributes coming from Supabase.
     ------------------------------------------------------- */

  const characteristics = [
    ["Fournisseur", product?.supplier],
    ["Catégorie", product?.category],
    ["Port", product?.port],
    ["MOQ", product?.moq],
    [
      "Prix unitaire",
      `$${Number(product?.price || 0).toFixed(2)}`,
    ],
  ];

  if (!product) return null;

  return (
    <div
      className="nihao-scroll"
      style={{
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden",
        background: "var(--paper)",
      }}
    >
      <div
        style={{
          padding: "16px 16px 36px",
        }}
      >
        {/* ==================================================
            IMAGE
        ================================================== */}

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 220,
            borderRadius: 18,
            background: "var(--paper-2)",
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <button
            onClick={onBack}
            aria-label="Retour"
            style={{
              position: "fixed",
              top: 65,
              left: 12,
              zIndex: 20,

              width: 38,
              height: 38,
              borderRadius: 12,

              border: "1px solid rgba(36,31,26,0.12)",
              background: "rgba(251,241,228,0.92)",
              backdropFilter: "blur(5px)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={() => setBookmarked(!bookmarked)}
            aria-label={
              bookmarked
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
            style={{
              position: "fixed",
              top: 65,
              right: 12,
              zIndex: 20,

              width: 38,
              height: 38,
              borderRadius: 12,

              border: bookmarked
                ? "1px solid var(--gold)"
                : "1px solid rgba(36,31,26,0.12)",

              background: bookmarked
                ? "var(--gold)"
                : "rgba(251,241,228,0.92)",

              backdropFilter: "blur(5px)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: bookmarked
                ? "white"
                : "#9a8f80",

              cursor: "pointer",

              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Bookmark
              size={20}
              fill={bookmarked ? "currentColor" : "none"}
            />
          </button>

          {selectedImage ? (
            <img
              src={selectedImage}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 64 }}>📦</span>
            </div>
          )}
        </div>

        {/* ==================================================
            THUMBNAILS
        ================================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
            minWidth: 0,
          }}
        >
          {/* Images */}
          <div
            className="nihao-scroll"
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 2,
            }}
          >
            {images.map((image, index) => {
              const isSelected = image === selectedImage;

              return (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  style={{
                    flexShrink: 0,
                    width: 58,
                    height: 58,
                    padding: 0,
                    borderRadius: 10,
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "var(--paper-2)",
                    border: isSelected
                      ? "2px solid var(--lacquer)"
                      : "1px solid var(--clay)",
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            PRODUCT NAME
        ================================================== */}
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  }}
>
  <span
    className="font-mono"
    style={{
      fontSize: 11,
      color: "#9a8f80",
    }}
  >
    Produit #{product.id}
  </span>

  <button
    onClick={() =>
      navigator.clipboard.writeText(String(product.id))
    }
    aria-label="Copier l'identifiant du produit"
    style={{
      border: "none",
      background: "transparent",
      padding: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9a8f80",
      cursor: "pointer",
    }}
  >
    <Copy size={13} />
  </button>
</div>

        <h1
          className="font-display"
          style={{
            margin: "0 0 7px",
            fontSize: 25,
            lineHeight: 1.15,
          }}
        >
          {product.name}
        </h1>

        {/* Description */}
        <p
          style={{
            margin: "0 0 20px",
            color: "#817566",
            fontSize: 13,
            lineHeight: 1.55,
          }}
        >
          {product.description}
        </p>

        {/* ==================================================
            CHARACTERISTICS
        ================================================== */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 650,
            marginBottom: 11,
          }}
        >
          Caractéristiques du produit
        </div>

        <div
          style={{
            marginBottom: 22,
            borderTop: "1px solid var(--clay)",
            borderBottom: "1px solid var(--clay)",
          }}
        >
          {characteristics.map(([label, value], index) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "42% 58%",
                minHeight: 40,
                borderBottom:
                  index === characteristics.length - 1
                    ? "none"
                    : "1px solid var(--clay)",
                fontSize: 12.5,
              }}
            >
              <div
                style={{
                  padding: "10px 10px 10px 0",
                  color: "#817566",
                }}
              >
                {label}
              </div>

              <div
                style={{
                  padding: "10px 0",
                  fontWeight: 600,
                  wordBreak: "break-word",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 13,
            fontWeight: 650,
            marginBottom: 11,
          }}
        >
          Commandez aujourdh'jui
        </div>

        {/* ==================================================
            ESTIMATED DATES
        ================================================== */}

        <div
          style={{
            borderTop: "1px solid var(--clay)",
            borderBottom: "1px solid var(--clay)",
            padding: "15px 0",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
              marginBottom: 9,
            }}
          >
            <span style={{ color: "#817566" }}>
              Date de commande :
            </span>

            <span className="font-mono">
              {estimatedDates.order}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
              marginBottom: 9,
            }}
          >
            <span style={{ color: "#817566" }}>
              Prochaine regroupement :
            </span>

            <span className="font-mono">
              {estimatedDates.grouping}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
              marginBottom: 9,
            }}
          >
            <span style={{ color: "#817566" }}>
              Date d'expédition estimée :
            </span>

            <span className="font-mono">
              {estimatedDates.shipping}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
            }}
          >
            <span style={{ color: "#817566" }}>
              Date d'arrivée à Tamatave :
            </span>

            <span className="font-mono">
              {estimatedDates.arrival}
            </span>
          </div>

          <p
            style={{
              margin: "12px 0 0",
              fontSize: 10.5,
              lineHeight: 1.45,
              color: "#9a8f80",
            }}
          >
            Les informations en date ci-dessus sont des
            estimations et peuvent changer selon les
            démarches à l'expédition et au dédouanement.
          </p>
        </div>


        {/* ==================================================
            QUANTITY + COLOR
        ================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 18,
            marginBottom: 22,
          }}
        >
          {/* Quantity */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 650,
                marginBottom: 9,
              }}
            >
              Quantité
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              <button
                onClick={() =>
                  setQuantity(
                    Math.max(product.moq, quantity - 1)
                  )
                }
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  border: "1px solid var(--clay)",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Minus size={16} />
              </button>

              <input
                type="number"
                min={product.moq}
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value);

                  if (value >= product.moq) {
                    setQuantity(value);
                  }
                }}
                onBlur={() => {
                  if (!quantity || quantity < product.moq) {
                    setQuantity(product.moq);
                  }
                }}
                className="font-mono"
                style={{
                  width: 50,
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 650,
                  color: "var(--ink)",
                }}
              />

              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  border: "1px solid var(--clay)",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Color */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 650,
                  marginBottom: 9,
                }}
              >
                Sélectionner la couleur :
              </div>

              {/* Dropdown + color preview */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                }}
              >
                {/* Dropdown */}
                <div
                  style={{
                    position: "relative",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <select
                    value={selectedColor?.name || ""}
                    onChange={(event) => {
                      const color = colors.find(
                        (item) => item.name === event.target.value
                      );

                      setSelectedColor(color);
                    }}
                    style={{
                      width: "100%",
                      height: 36,
                      appearance: "none",
                      border: "1px solid var(--clay)",
                      borderRadius: 9,
                      background: "white",
                      padding: "0 30px 0 10px",
                      fontSize: 12,
                      outline: "none",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {colors.map((color) => (
                      <option
                        key={color.name}
                        value={color.name}
                      >
                        {color.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    style={{
                      position: "absolute",
                      right: 9,
                      top: 10,
                      pointerEvents: "none",
                      color: "#817566",
                    }}
                  />
                </div>

                {/* Color preview */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: selectedColor?.value || "transparent",
                    border: "1px solid var(--clay)",
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          </div>

        {/* ==================================================
            PRICE CALCULATION
        ================================================== */}

        <div
          style={{
            background: "var(--paper-2)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 9,
              fontSize: 13,
            }}
          >
            <span>Sous-total</span>

            <span className="font-mono">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 9,
              fontSize: 13,
            }}
          >
            <span>Fret estimé</span>

            <span className="font-mono">
              ${freight.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 13,
              fontSize: 13,
            }}
          >
            <span>Dédouanement estimé</span>

            <span className="font-mono">
              ${customs.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--clay)",
              paddingTop: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>
              Total jusqu'à Tamatave
            </strong>

            <strong
              className="font-mono"
              style={{
                color: "var(--lacquer)",
                fontSize: 17,
              }}
            >
              ${total.toFixed(2)}
            </strong>
          </div>
        </div>

        {/* ==================================================
            PAYMENT
        ================================================== */}

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 650,
              marginBottom: 11,
            }}
          >
            Sélectionner la méthode de paiement :
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {paymentMethods.map((method) => {
              const selected =
                paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  onClick={() =>
                    setPaymentMethod(method.id)
                  }
                  style={{
                    minHeight: 68,
                    borderRadius: 12,
                    border: selected
                      ? "2px solid var(--lacquer)"
                      : "1px solid var(--clay)",
                    background: "white",
                    cursor: "pointer",
                    padding: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 7,
                      background: "var(--paper-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: selected ? 650 : 500,
                      color: "var(--ink)",
                      textAlign: "center",
                    }}
                  >
                    {method.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            DELIVERY
        ================================================== */}

        <div
          style={{
            display: "flex",
            gap: 10,
            padding: 12,
            border: "1px solid var(--clay)",
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <Truck
            size={20}
            color="var(--jade)"
            style={{ flexShrink: 0 }}
          />

          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 650,
                marginBottom: 3,
              }}
            >
              Livraison finale
            </div>

            <div
              style={{
                fontSize: 11,
                color: "#817566",
                lineHeight: 1.45,
              }}
            >
              La livraison vers Tana ou les provinces est
              communiquée séparément.
            </div>
          </div>
        </div>

        {/* ==================================================
            ORDER
        ================================================== */}

        <button
          className="btn-primary"
          style={{
            width: "100%",
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Package size={18} />
          Commander
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;