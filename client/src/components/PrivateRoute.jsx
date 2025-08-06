import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
//   const isAuthenticated = !!localStorage.getItem("token");
  let isAuthenticated = true; //(for now during creation @comradekaushik 6 august 2025);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  
  return isAuthenticated ? children : null;
}

export default PrivateRoute;