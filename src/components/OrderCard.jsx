import { ChevronRight, Package } from "lucide-react";

function OrderCard({ order, onClick }) {
  return (
    <button
      onClick={onClick}
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
      }}
    >
      {/* Icône */}
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: 12,
          background: "var(--paper-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Package size={22} color="var(--lacquer)" />
      </div>

      {/* Informations commande */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 650,
            marginBottom: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {order.product}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            fontSize: 11,
            color: "#817566",
          }}
        >
          <span>Date de commande : 23/09/2026</span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            fontSize: 11,
            color: "#817566",
          }}
        >
          <span>#{order.id}</span>
          <span>•</span>
          <span>{order.quantity} unité(s)</span>
        </div>

        <div
          className="font-mono"
          style={{
            marginTop: 5,
            fontSize: 12,
            fontWeight: 650,
            color: "var(--lacquer)",
          }}
        >
          ${Number(order.total).toFixed(2)}
        </div>
      </div>

      {/* Statut */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 650,
            padding: "4px 7px",
            borderRadius: 20,
            background:
              order.status === "Livré"
                ? "#dcebe3"
                : "#f5e5c4",
            color:
              order.status === "Livré"
                ? "var(--jade)"
                : "#8a6827",
            whiteSpace: "nowrap",
          }}
        >
          {order.status}
        </span>

      </div>
    </button>
  );
}

export default OrderCard;