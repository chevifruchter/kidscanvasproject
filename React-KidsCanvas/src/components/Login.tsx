import React, {  useState } from 'react';
import { useUserContext } from '../Context/userContext';
import { Service as LoginService } from '../services/LoginService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { setMyUser } = useUserContext();
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    console.log("name: ", loginName," password:", loginPassword);
    e.preventDefault();
    const foundUser = await LoginService.login(loginName, loginPassword);
    if (foundUser) {
      alert("התחברות בוצעה בהצלחה");
      setMyUser(foundUser);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        sessionStorage.setItem('user', JSON.stringify(foundUser));
      }
       navigate("/");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="title">התחברות</h2>
          <label className="label">
            שם משתמש  <span className="required">*</span>
          </label>
          <input
            type="text"
            className="input"
            required
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}/>
          <label className="label">
            סיסמה <span className="required">*</span>
          </label>
          <div className="relative">
            <input
              type={'password'}
              className="input"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}/>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}/>
            <label>זכור אותי</label>
          </div>
          <button type="submit" className="button" >
            התחברות
          </button>
        </div>
      </div>
    </form>
  );
};
export default Login;








 