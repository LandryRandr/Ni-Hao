import {
  ArrowLeft,
  Check,
  Package,
  Ship,
  Truck,
  Copy,
} from "lucide-react";

function OrderDetail({ order, onBack }) {
  if (!order) return null;

  const product = order.product || {};

  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const characteristics = [
    ["Fournisseur", product.supplier],
    ["Catégorie", product.category],
    ["Port", product.port],
    ["Quantité", order.quantity],
    ["Couleur", order.color?.name],
    [
      "Prix unitaire",
      `$${Number(order.unitPrice || 0).toFixed(2)}`,
    ],
  ];

  const steps = [
    {
      label: "Payé",
      icon: Check,
      done: true,
    },
    {
      label: "Expédié",
      icon: Ship,
      done:
        order.status === "Expédié" ||
        order.status === "Arrivé Tamatave" ||
        order.status === "Dédouané" ||
        order.status === "Livraison",
    },
    {
      label: "Arrivé Tamatave",
      icon: Package,
      done:
        order.status === "Arrivé Tamatave" ||
        order.status === "Dédouané" ||
        order.status === "Livraison",
    },
    {
      label: "Dédouané",
      icon: Check,
      done:
        order.status === "Dédouané" ||
        order.status === "Livraison",
    },
    {
      label: "Livraison",
      icon: Truck,
      done: order.status === "Livraison",
    },
  ];

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
    
    <button
      onClick={onBack}
      aria-label="Retour"
      style={{
        position: "sticky",
        top: 12,
        left: 12,
        zIndex: 10,

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

        marginBottom: -38,
      }}
    >
      <ArrowLeft size={20} />
    </button>

      <div
        style={{
          padding: "16px 16px 36px",
        }}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >

        {/* Copie de numero de commande et IDProduct */}
        <div
          style={{
            marginLeft: 48,
          }}
        >
          {/* Command ID */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Commande #{order.id}
            </div>

            <button
              onClick={() =>
                navigator.clipboard.writeText(String(order.id))
              }
              aria-label="Copier le numéro de commande"
              style={{
                border: "none",
                background: "transparent",
                padding: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9a8f80",
                cursor: "pointer",
              }}
            >
              <Copy size={14} />
            </button>
          </div>

          {/* Product ID */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 2,
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
              <Copy size={12} />
            </button>
          </div>
        </div>
          
        </div>

        {/* ==================================================
            IMAGE
        ================================================== */}

        <div
          style={{
            width: "100%",
            height: 110,
            borderRadius: 18,
            background: "var(--paper-2)",
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          {images[0] ? (
            <img
              src={images[0]}
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
            MINIATURES
        ================================================== */}

        {images.length > 1 && (
          <div
            className="nihao-scroll"
            style={{
              height: "100%",
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              background: "var(--paper)",
              position: "relative",
            }}
          >
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                style={{
                  flexShrink: 0,
                  width: 58,
                  height: 58,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid var(--clay)",
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
              </div>
            ))}
          </div>
        )}

        {/* ==================================================
            PRODUCT NAME
        ================================================== */}

        <h1
          className="font-display"
          style={{
            margin: "0 0 7px",
            fontSize: 25,
            lineHeight: 1.15,
          }}
        >
          {product.name || order.product}
        </h1>

        {/* Description */}
        {product.description && (
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
        )}

        {/* ==================================================
            CHARACTERISTICS
        ================================================== */}

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
                {value ?? "—"}
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================
            DATES
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
              {order.orderDate}
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
              {order.groupingDate}
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
              {order.shippingDate}
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
              {order.arrivalDate}
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
            PRICE
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
              ${Number(order.subtotal || 0).toFixed(2)}
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
              ${Number(order.freight || 0).toFixed(2)}
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
              ${Number(order.customs || 0).toFixed(2)}
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
              ${Number(order.total || 0).toFixed(2)}
            </strong>

          </div>
          </div>
          <div>
              {/* Facture */}
              <button
                onClick={() => {
                  console.log("Téléchargement facture :", order.id);
                }}
                style={{
                  width: "100%",
                  minHeight: 42,
                  marginTop: 12,
                  marginBottom: 20,

                  border: "1px solid var(--clay)",
                  borderRadius: 11,
                  background: "white",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,

                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ink)",

                  cursor: "pointer",
                }}
              >
                Télécharger la facture PDF
              </button>

        </div>

        {/* ==================================================
            ORDER TRACKING
        ================================================== */}

        <div>
          <div
            className="font-display"
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Suivi de la commande
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast =
                index === steps.length - 1;

              return (
                <div
                  key={step.label}
                  style={{
                    display: "flex",
                    gap: 12,
                    minHeight: isLast ? 44 : 62,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 27,
                        height: 27,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: step.done
                          ? "var(--lacquer)"
                          : "var(--paper-2)",
                        border: step.done
                          ? "none"
                          : "1px solid var(--clay)",
                      }}
                    >
                      <Icon
                        size={14}
                        color={
                          step.done
                            ? "white"
                            : "#a89b8a"
                        }
                      />
                    </div>

                    {!isLast && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          background: step.done
                            ? "var(--lacquer)"
                            : "var(--clay)",
                          margin: "3px 0",
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      paddingTop: 4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: step.done
                          ? 650
                          : 500,
                        color: step.done
                          ? "var(--ink)"
                          : "#9a8f80",
                      }}
                    >
                      {step.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;