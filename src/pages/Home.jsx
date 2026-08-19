import Logo from "../components/Logo";

function Home() {
  const steps = [
    {
      n: "01",
      t: "Parcourez Tsena",
      d: "Recherchez un produit déjà négocié auprès de nos fournisseurs chinois vérifiés.",
    },
    {
      n: "02",
      t: "Commandez",
      d: "Choisissez la quantité : le prix jusqu'au port de Tamatave, dédouanement inclus, se calcule automatiquement.",
    },
    {
      n: "03",
      t: "Suivez & payez",
      d: "Réglez votre commande et suivez le trajet en temps réel dans l'onglet Purchase.",
    },
  ];

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
          padding: "20px 16px 32px",
        }}
      >
        {/* Présentation */}
        <div
          style={{
            background: "var(--lacquer)",
            borderRadius: 18,
            padding: "22px 18px",
            color: "var(--paper)",
            marginBottom: 22,
          }}
        >
          <Logo size={80} />

          <div
            className="font-display"
            style={{
              fontSize: 24,
              marginTop: 8,
              lineHeight: 1.25,
            }}
          >
            你好吗
          </div>

          <div
            className="font-display"
            style={{
              fontSize: 24,
              marginTop: 8,
              lineHeight: 1.25,
            }}
          >
            Bienvenue sur Ni Hao ma 
          </div>

          <p
            style={{
              fontSize: 13.5,
              marginTop: 8,
              opacity: 0.92,
              lineHeight: 1.5,
            }}
          >
            Le pont direct entre les fournisseurs de Chine et votre
            commerce à Madagascar. Produits négociés, prix transparents
            jusqu'à Tamatave.
          </p>
        </div>

        {/* Comment ça marche */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--jade)",
            letterSpacing: 0.4,
            marginBottom: 12,
          }}
        >
          COMMENT ÇA MARCHE
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                gap: 14,
              }}
            >
              <div
                className="font-mono"
                style={{
                  color: "var(--gold)",
                  fontSize: 13,
                  fontWeight: 600,
                  paddingTop: 2,
                }}
              >
                {s.n}
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14.5,
                  }}
                >
                  {s.t}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "#5c5348",
                    marginTop: 2,
                    lineHeight: 1.45,
                  }}
                >
                  {s.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;