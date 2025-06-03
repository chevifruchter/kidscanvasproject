import { user } from "../models/User";

const base_url = import.meta.env.VITE_BASE_URL_API;

export const Service = {
  login: async (userName: string, password: string) => {
    console.log("login service: ", userName, password);
    try {
      const response = await fetch(`${base_url}/api/Auth`, {
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
        if (data.Role === "admin") {
          // הפניה לאפליקציית Angular
          window.location.href = "https://kidscanvasproject-2.onrender.com";
          alert("התחברת בהצלחה!");
        } else {
          alert("פרטים שגויים");
        }
      }
    } catch (error) {
      console.error('error in the autothication:', error);
      throw error;
    }

    let found: user | undefined;
    const token = localStorage.getItem('token');
    console.log("token: ", token);

    try {
      const response = await fetch(`${base_url}/api/Users`, {
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
      console.log("foundUser ", found);

      return found;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
};


