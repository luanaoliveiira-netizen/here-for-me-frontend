import { useState } from "react";

export default function Login() {
  const [nickname, setNickname] = useState("");

  function handleEnter() {
    if (!nickname.trim()) return;

    localStorage.setItem("nickname", nickname);
    window.location.reload();
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Here for Me</h1>

      <p>Escolha um nome para este espaço.</p>

      <input
        type="text"
        placeholder="Seu nick"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      />

      <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
        Este é um espaço local e privado.
        Nada é enviado para fora do seu aparelho.
        Se você trocar de dispositivo, este conteúdo não poderá ser recuperado.
      </p>

      <button
        onClick={handleEnter}
        style={{ marginTop: "1.5rem", padding: "0.75rem", width: "100%" }}
      >
        Entrar
      </button>
    </div>
  );
}
