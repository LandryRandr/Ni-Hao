import { ChevronLeft, Search } from "lucide-react";
import Logo from "./Logo";

function Header({ tabLabel, onBack, onSearch }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        borderBottom: "1px solid var(--clay)",
        background: "var(--paper)",
        position: "sticky",
        top: 0,
        zIndex: 5,
        flexShrink: 0,
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Back"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--ink)",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <Logo size={30} />

      <span
        className="font-display"
        style={{
          fontSize: 17,
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        NiHaoma 你好吗
      </span>

      {/* Compact global search */}
      <button
        onClick={onSearch}
        aria-label="Search"
        style={{
          marginLeft: "auto",
          width: "50%",
          minWidth: 80,
          maxWidth: 130,
          height: 34,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 9px",
          border: "1px solid var(--clay)",
          borderRadius: 17,
          background: "var(--paper-2)",
          color: "#9a8f80",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Search size={15} />

        <span
          style={{
            fontSize: 11,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Search
        </span>
      </button>
    </div>
  );
}

export default Header;