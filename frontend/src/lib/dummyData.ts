import { User, Message } from "./types";

export const me: User = {
  id: "me",
  displayName: "You",
  wallet: "0xMe...",
};

export const contacts: User[] = [
  { id: "u1", displayName: "Alice", wallet: "0xAlice..." },
  { id: "u2", displayName: "BizCorp", wallet: "0xBizCorp..." },
];

export const messages: Message[] = [
  {
    id: "m1",
    chatId: "u1",
    senderId: "u1",
    receiverId: "me",
    ciphertext: "Hello! (mock ciphertext)",
    timestamp: new Date().toISOString(),
  },
];