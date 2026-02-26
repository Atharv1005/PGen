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

// Create chat
export const createChat = async (userId1: string, userId2: string) => {

  const res = await fetch("http://localhost:5000/api/chat/create", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ userId1, userId2 })

  });

  return res.json();

};


// Get messages
export const getMessages = async (chatId: string) => {

  const res = await fetch(
    `http://localhost:5000/api/chat/${chatId}/messages`
  );

  return res.json();

};


// Send message
export const sendMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {

  const res = await fetch(
    `http://localhost:5000/api/chat/${chatId}/message`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        senderId,
        content
      })
    }
  );

  return res.json();

};