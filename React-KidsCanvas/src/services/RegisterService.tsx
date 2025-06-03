
const base_url = import.meta.env.VITE_BASE_URL_API;

export const Service = {

  checkUser: async (userName: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${base_url}/api/Auth/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log("data: ", data);
        return data.exists; // מחזיר רק את השדה 'exist' מהתשובה
        
      } else {
        console.error("Failed to check user:", res.statusText);
        return false; // במקרה של שגיאה, מחזיר false
      }
    } catch (error) {
      console.error("Error in checkUser:", error); 
      return false// במקרה של שגיאה, מחזיר false
    }
  },

    register: async (userName: string, phone: string, email: string, password: string) => {
      const userExists = await Service.checkUser(userName, password);
      console.log("userExists",userExists);
      if (userExists) {
        alert("המשתמש קיים במערכת");
      }
      else {
            console.log("register service: ", userName, password);

            try {
                const response = await fetch('https://localhost:7001/api/Auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userName,
                        phone,
                        email,
                        password
                    })
                });

                console.log("response: ", response);

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    alert("נרשמת בהצלחה!");
                } else {
                    alert("שגיאה בהרשמה");
                }
            } catch (error) {
                console.error('error in the autothication:', error);
                throw error;
            }
            }
          }
}