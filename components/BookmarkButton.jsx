"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleClick = async () => {
        if (!userId) {
            toast.error("You need to sign in to bookmark a property");
            return;
        }

        try {
            const res = await fetch(`/api/bookmarks`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: property._id,
                }),
            });

            if (res.status === 200) {
                const data = await res.json();
                toast.success(data.message);
                setIsBookmarked(data.isBookmarked);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleClick}
        >
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    );
};

export default BookmarkButton;
