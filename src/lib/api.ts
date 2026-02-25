const API_BASE = "http://localhost:5000/api";

export const signupUser = async (data: any) => {

  const response = await fetch(`${API_BASE}/auth/signup`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)

  });

  return response.json();

};

export const loginUser = async (data: any) => {

  const response = await fetch(`${API_BASE}/auth/login`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(data)

  });

  return response.json();

};