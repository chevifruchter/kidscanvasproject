import React, { useState } from 'react';
import { Service as RegisterService } from '../services/RegisterService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      setError('נא למלא את כל השדות');
      return;
    }
    RegisterService.register(name, phone, email, password);
    const newUser = { name, phone, email, password };
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="title">הרשמה</h2>
          <label className="label">שם מלא <span className="required">*</span></label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="label">אימייל <span className="required">*</span></label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="label">סיסמה <span className="required">*</span></label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="label">טלפון <span className="required">*</span></label>
          <input
            type="tel"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}

          <button type="submit" className="button">הירשם</button>
        </div>
      </div>
    </form>
  );
};

export default Register;

