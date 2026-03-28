import { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { login } from "../../../api";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { loginTodo } from "../../../helpers/todos";
import type { User } from "../../../context/AuthType";
import styles from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return alert("Invalid credentials");

    let user: User | null = null;
    let goToTodo = false;
    const userMatch = username.toLowerCase().match(/^user(\d+)$/);

    if (userMatch) {
      user = await loginTodo(username, password);
      goToTodo = true;
    } else {
      user = await login(username, password);
    }

    if (user) {
      authLogin(user);
      navigate(goToTodo ? "/todos" : "/sessions");
    } else {
      alert("Invalid credentials");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <Input
            label="username"
            id="username"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <Input
            label="password"
            id="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}