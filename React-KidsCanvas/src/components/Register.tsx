import React, { use, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/userContext';
import { Service as RegisterService } from '../services/RegisterService';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phone ) {
      setError('נא למלא את כל השדות');
      return;
    }
    RegisterService.register(name, phone, email, password);
    // if (foundUser) {
    //   alert("המשתמש כבר קיים");
    //   return;
    // }
    // כאן תוכל לבדוק אם המשתמש כבר קיים אם תרצה

    const newUser = { name, phone, email, password };
    // addUser(newUser); // הוספת המשתמש להקשר
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

          <label className="label">תפקיד <span className="required">*</span></label>
          {/* <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">בחר תפקיד</option>
            <option value="תלמיד">תלמיד</option>
            <option value="מורה">מורה</option>
            <option value="הורה">הורה</option>
          </select> */}

          {error && <p className="error">{error}</p>}

          <button type="submit" className="button">הירשם</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
// const [showModal, setShowModal] = useState(false);
//   const users = useUserContext();
//   const MyUser = useUserContext();
//   const [regName, setRegName] = useState("");
//   const [regEmail, setRegEmail] = useState("");
//   const [regPhone, setRegPhone] = useState("");
//   const [regPassword, setRegPassword] = useState("");
//   const [regConfirmPassword, setRegConfirmPassword] = useState("");

//   const handleRegister = async () => {

//   };

//   let found = false;

//   if (Array.isArray(users))
//     users.map(u => {
//       if (u === MyUser) {
//         found = true;
//         // setShowModal(true);
//       }
//     });

//   if (!found) {
//     //כאן צריך לרשום את המשתמש החדש, לעשות קריאת שרת של POST ולרשום אותו
//     //  if (regPassword !== regConfirmPassword) {
//     //     alert("הסיסמאות לא תואמות");
//     //     return;
//     // }

//     // try {
//     //     const response = await fetch("https://localhost:7001/Users", {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //         },
//     //         body: JSON.stringify({
//     //             id: 0,
//     //             name: regName,
//     //             phone: regPhone,
//     //             email: regEmail,
//     //             password: regPassword,
//     //             role: 0,
//     //             created: new Date().toISOString(),
//     //             uptated: new Date().toISOString(),
//     //         }),
//     //     });

//     //     if (response.ok) {
//     //         alert("נרשמת בהצלחה!");
//     //         // התחברות אוטומטית עם הפרטים שרשם
//     //         await handleLogin();
//     //     } else if (response.status === 401) {
//     //         alert("אין הרשאה - נסה להתחבר או לבדוק את ההרשאות שלך");
//     //     } else {
//     //         const errorText = await response.text();
//     //         console.error("שגיאה:", errorText);
//     //         alert("שגיאה בהרשמה");
//     //     }
//     // } catch (error) {
//     //     console.error("שגיאת רשת:", error);
//     //     alert("אירעה שגיאת רשת");
//     // }
//   }


//   return (
//     //         {/* הרשמה */}
//     <form>
//       <div className="auth-box">
//         <h2 className="title">הרשמה</h2>

//         <label className="label">שם <span className="required">*</span></label>
//         <input
//           type="text"
//           className="input"
//           required
//           value={regName}
//           onChange={(e) => setRegName(e.target.value)}
//         />

//         <label className="label">כתובת אימייל <span className="required">*</span></label>
//         <input
//           type="email"
//           className="input"
//           required
//           value={regEmail}
//           onChange={(e) => setRegEmail(e.target.value)}
//         />

//         <label className="label">טלפון <span className="required">*</span></label>
//         <input
//           type="tel"
//           className="input"
//           required
//           value={regPhone}
//           onChange={(e) => setRegPhone(e.target.value)}
//         />

//         <label className="label">סיסמה <span className="required">*</span></label>
//         <input
//           type="password"
//           className="input"
//           required
//           value={regPassword}
//         />

//         <label className="label">אימות סיסמה <span className="required">*</span></label>
//         <input
//           type="password"
//           className="input"
//           required
//           value={regConfirmPassword}
//           onChange={(e) => setRegConfirmPassword(e.target.value)}
//         />

//         <button type="submit" onClick={handleRegister} className="button">הרשמה</button>
//       </div>
//     </form>
//   );
// };
// export default Register;








