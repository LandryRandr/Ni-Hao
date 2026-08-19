import {
  Home as HomeIcon,
  Store,
  MessageCircle,
  Package,
  Settings as SettingsIcon,
} from "lucide-react";

const TABS = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "market", label: "Tsena", icon: Store },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "purchase", label: "Purchase", icon: Package },
  { id: "settings", label: "Réglages", icon: SettingsIcon },
];

function TabBar({ active, onChange }) {
  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        display: "flex",
        borderTop: "1px solid var(--clay)",
        background: "var(--paper)",
        padding: "8px 4px calc(8px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {TABS.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;

        return (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => onChange(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "4px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isActive ? "var(--lacquer)" : "#9a8f80",
            }}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.4 : 1.8}
            />

            <span
              style={{
                fontSize: 10.5,
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TabBar;