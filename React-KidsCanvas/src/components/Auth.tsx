import "../styles/Login.css";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
    return (
        <div className="auth-wrapper" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <Login />
        <Register />
      </div>
  );
}
