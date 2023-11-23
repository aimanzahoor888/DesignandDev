// src/SellNow.js
import React, { useState, useEffect } from 'react';

const SellNow = () => {
    const [postText, setPostText] = useState('');
    const [postedTexts, setPostedTexts] = useState([]);

    const handlePost = () => {
        if (postText.trim() !== '') {
            setPostedTexts([...postedTexts, postText]);
            setPostText('');
        }
    };

    return (
        <div>
            <h2>Sell Now Page</h2>
            <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write something..."
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={handlePost}>Sell Item</button>

            <div>
                <h2>Posted Texts:</h2>
                <ul>
                    {postedTexts.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SellNow;
