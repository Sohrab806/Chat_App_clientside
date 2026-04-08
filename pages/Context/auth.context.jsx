import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
   
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [receiverId,setReceiverId] = useState(null)
  const [receiverdata,setReceiver] = useState(null)

  const receiver=(data)=>{
    setReceiverId(data._id)
    
    axios.get(`http://localhost:3000/user/getuser/${data._id}`,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
    .then((res)=>setReceiver(res.data.user))
    .catch((err)=>console.log(err))

    console.log("id",data._id)
    console.log("receiverId",receiverId)
    console.log("receiverdata",receiverdata)
    navigate("/")
  }

  // 🔹 login helper
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser(payload);
    console.log(user)

    navigate("/");
  };

  // 🔹 logout helper
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/auth");
  };

  // 🔹 check token on load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(storedToken.split(".")[1]));

      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/auth");
      } else {
        setUser(payload);
        setToken(storedToken);
      }

    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/auth");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null; // or a full-screen spinner if you prefer
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser,
        isLoading,
        receiverId,
        receiver,receiverdata
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);