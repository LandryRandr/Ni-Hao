import { useState } from "react";
import { Send } from "lucide-react";


function Chat() {
  const [messages, setMessages] = useState([
    {
      from: "team",
      text: "Bonjour ! Ni Hao à votre service. Une question sur un produit ou une commande ?",
    },
  ]);

  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;

    setMessages((messages) => [
      ...messages,
      {
        from: "me",
        text: input,
      },
    ]);

    setInput("");

    // Réponse temporaire de démonstration.
    setTimeout(() => {
      setMessages((messages) => [
        ...messages,
        {
          from: "team",
          text: "Merci pour votre message, notre équipe revient vers vous rapidement.",
        },
      ]);
    }, 700);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >

      {/* Messages */}
      <div
        className="nihao-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf:
                message.from === "me"
                  ? "flex-end"
                  : "flex-start",

              maxWidth: "78%",

              background:
                message.from === "me"
                  ? "var(--lacquer)"
                  : "#fff",

              color:
                message.from === "me"
                  ? "var(--paper)"
                  : "var(--ink)",

              border:
                message.from === "me"
                  ? "none"
                  : "1px solid var(--clay)",

              borderRadius: 14,
              padding: "9px 13px",
              fontSize: 13.5,
              lineHeight: 1.4,
            }}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Zone de saisie */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: 12,
          borderTop: "1px solid var(--clay)",
          flexShrink: 0,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send();
            }
          }}
          placeholder="Écrire un message..."
          style={{
            flex: 1,
            border: "1px solid var(--clay)",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 13.5,
            outline: "none",
            fontFamily: "var(--font-body)",
          }}
        />

        <button
          onClick={send}
          style={{
            width: 40,
            borderRadius: 10,
            border: "none",
            background: "var(--lacquer)",
            color: "var(--paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default Chat;