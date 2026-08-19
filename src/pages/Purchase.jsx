import { useState } from "react";

import OrderCard from "../components/OrderCard";
import OrderDetail from "../components/OrderDetail";

function Purchase({ orders }) {
  const [selected, setSelected] = useState(null);

  // Affichage du détail
  if (selected) {
    return (
      <OrderDetail
        order={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >

      <div
        className="nihao-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onClick={() => setSelected(order)}
          />
        ))}

        {orders.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              color: "#9a8f80",
            }}
          >
            Aucune commande pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchase;