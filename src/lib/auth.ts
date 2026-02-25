export const getToken = () => {

    if (typeof window === "undefined") return null;
  
    return localStorage.getItem("token");
  
  };
  
  export const isAuthenticated = () => {
  
    const token = getToken();
  
    return !!token;
  
  };
  
  export const logout = () => {
  
    localStorage.removeItem("token");
  
    window.location.href = "/login";
  
  };