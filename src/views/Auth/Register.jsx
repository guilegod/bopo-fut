import { useState } from "react";
import styles from "./Register.module.css";

export default function Register({ onRegisterSuccess, onGoLogin }) {
  const [name, setName] = useState("Saauce");
  const [email, setEmail] = useState("saauce@bopo.com");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("player");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Preencha nome, email e senha.");
      return;
    }

    try {
      setLoading(true);
      await onRegisterSuccess({ name, email, password, role });
    } catch (err) {
      setError(err?.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.logo}>Criar conta</div>
          <div className={styles.subtitle}>Você pode ser player ou owner</div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Senha</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <div className={styles.field}>
            <label>Tipo de conta</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="player">Player</option>
              <option value="owner">Owner (Dono/Organizador)</option>
            </select>
          </div>

          {error ? <div className={styles.error}>{error}</div> : null}

          <button className={styles.primary} type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>

          <button
            className={styles.link}
            type="button"
            onClick={onGoLogin}
            disabled={loading}
          >
            Já tenho conta → Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
