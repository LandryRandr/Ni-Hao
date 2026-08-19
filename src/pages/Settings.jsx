import Logo from "../components/Logo";

function Settings() {
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
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
          color: "#8a7f70",
        }}
      >
        <div>
          <Logo size={36} />

          <div
            style={{
              fontSize: 13.5,
              marginTop: 12,
            }}
          >
            Réglages — bientôt disponible
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;