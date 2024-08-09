import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Account = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData._id === id) {
      setUser(userData);
    } else {
      // Handle case where user data is not available or id doesn't match
      setUser(null);
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      {/* Add more user-specific details here */}
    </div>
  );
};

export default Account;
