export type User={
    id: string;
    displayName: string;
    wallet: string;
    avatarUrl?: string
}

export type Message={
    id:string;
    chatId:string;
    senderId: string;
    receiverId: string;
    ciphertext: string;
    timestamp: string;
    status?: "sent" | "delivered" | "read";
};