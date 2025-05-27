import { use } from "react";
import { user } from "../models/User";
import { useUserContext } from "../Context/userContext";


export const Service = {

  login: async (userName: string, password: string) => {
    console.log("login service: ", userName, password);
    try {
      const response = await fetch('https://localhost:7001/api/Auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          password
        })
      });
      console.log("response: ", response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert("התחברת בהצלחה!");
      } else {
        alert("פרטים שגויים");
      }
    } catch (error) {
      console.error('error in the autothication:', error);
      throw error;
    }

    let found: user | undefined;
    const token = localStorage.getItem('token');
    console.log("token: ", token);

    try {
      const response = await fetch('https://localhost:7001/api/Users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response", response);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      alert("login successful");
      console.log("userData: ", userData);
      if (Array.isArray(userData)) {
        found = userData.find((u: any) => u.name === userName && u.password === password);
      }
      console.log("foundUser ",found);

      return found;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
};





// import React, { useEffect } from 'react';
// import { useUserContext} from '../Context/userContext'; // Adjust the import path as needed

// const Service: React.FC = () => {
//     const { setUsers } = useUserContext();

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('https://localhost:7001/api/Users'); // Adjust the endpoint as needed
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch users');
//                 }
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, [setUsers]);

//      return <div></div>;
// };

// export default Service;