"use client";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch("/api/messages");
                if (res.status === 200) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error("Error fetching messages: ", error);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, []);

    return <div>Messages</div>;
};

export default Messages;
