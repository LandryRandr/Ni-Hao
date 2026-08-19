import { useState } from "react";

import Home from "./pages/Home";
import Market from "./pages/Market";
import Chat from "./pages/Chat";
import Purchase from "./pages/Purchase";
import Settings from "./pages/Settings";

import Header from "./components/Header";
import TabBar from "./components/TabBar";
import SearchOverlay from "./components/SearchOverlay";

import products from "./data/products";
import orders from "./data/orders";

function App() {
  const [tab, setTab] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function renderPage() {
    switch (tab) {
      case "home":
        return <Home />;

        case "market":
          return (
            <Market
              products={products}
              searchQuery={searchQuery}
            />
          );

      case "chat":
        return <Chat />;

      case "purchase":
        return <Purchase orders={orders} />;

      case "settings":
        return <Settings />;

      default:
        return <Home />;
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--paper)",
        color: "var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Global Header */}
      {!isSearchOpen && (
        <Header
          onSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* Current page */}
      <main
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {renderPage()}

        {/* Global Search */}
        {isSearchOpen && (
          <SearchOverlay
            products={products}
            onClose={() => setIsSearchOpen(false)}
            onSearch={(query) => {
              setSearchQuery(query);
              setIsSearchOpen(false);
              setTab("market");
            }}
            onSelectProduct={(product) => {
              console.log("Selected product:", product);
            }}
          />
        )}
      </main>

      {/* Global navigation — NEVER moves */}
      <TabBar
        active={tab}
        onChange={(newTab) => {
          setIsSearchOpen(false);
          setTab(newTab);
        }}
      />
    </div>
  );
}

export default App;