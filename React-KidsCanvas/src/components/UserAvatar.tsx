import React, { useContext } from "react";
import { useUserContext } from "../Context/userContext";

const UserAvatar = () => {
const { MyUser } = useUserContext();
  if (!MyUser?.name) return null;

  const firstLetter = MyUser.name[0].toUpperCase();

  return (
    <div style={styles.avatar}>
      {firstLetter}
    </div>
  );
};

const styles = {
  avatar: {
    backgroundColor: "#f50380", // או כל צבע אחר שתבחרי
    color: "#fff",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    position: "fixed" as "fixed",
    top: 20,
    right: 20,
    cursor: "pointer",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
    zIndex: 1000
  }
};

export default UserAvatar;
